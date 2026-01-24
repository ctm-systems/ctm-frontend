import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import type { Client } from '@/types/Client'
import { StatusOrcamento, type Orcamento } from '@/types/Orçamento'

/**
 * Gera um PDF do orçamento com as informações do cliente
 * @param orcamento - Dados do orçamento
 * @param client - Dados do cliente
 * @param tecnicoResponsavel - Nome(s) do(s) técnico(s) responsável(is)
 * @param amostrasCliente - Array de amostras do cliente (opcional)
 */
export const gerarOrcamentoPDF = async (
  orcamento: Orcamento,
  client: Client,
  tecnicoResponsavel: string,
  amostrasCliente?: any[]
) => {
  if (!client || !orcamento) {
    console.error('Dados insuficientes para gerar o PDF')
    return
  }

  const doc = new jsPDF()

  try {
    // Configurações de cores
    const primaryColor: [number, number, number] = [41, 128, 185] // Azul
    const grayColor: [number, number, number] = [149, 165, 166]

    // CABEÇALHO
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, 210, 35, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text('ORÇAMENTO', 105, 15, { align: 'center' })

    // CORREÇÃO AQUI: Garantir que o ID existe antes do toString
    const idFormatado = orcamento.id ? orcamento.id.toString().padStart(6, '0') : '000000'
    const numExibicao = orcamento.identificacao || idFormatado

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Nº ${numExibicao}`, 105, 25, { align: 'center' })

    // Reset cor do texto
    doc.setTextColor(0, 0, 0)

    // INFORMAÇÕES DO CLIENTE
    let yPos = 45

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('DADOS DO CLIENTE', 20, yPos)

    // Linha separadora
    doc.setDrawColor(...grayColor)
    doc.setLineWidth(0.5)
    doc.line(20, yPos + 2, 190, yPos + 2)

    yPos += 10
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)

    const clientData: Array<[string, any]> = [
      ['Nome:', client.nome],
      ['CPF/CNPJ:', client.cpf || client.cnpj],
      ['Telefone:', client.telefone],
      ['E-mail:', client.email],
      ['Endereço:', client.endereco],
      ['CEP:', client.cep],
      ['Técnico:', tecnicoResponsavel],
    ]

    clientData.forEach(([label, value]) => {
      // console.log(`Gerando linha PDF - Label: ${label}, Value:`, value);
      // Garantimos que 'label' e 'value' sejam strings e nunca undefined/null
      const safeLabel = String(label || '')
      const safeValue = String(value || 'N/A')

      doc.setFont('helvetica', 'bold')
      doc.text(safeLabel, 20, yPos)

      doc.setFont('helvetica', 'normal')
      doc.text(safeValue, 55, yPos)

      yPos += 6
    })

    // INFORMAÇÕES DO ORÇAMENTO
    yPos += 8
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('INFORMAÇÕES DO ORÇAMENTO', 20, yPos)

    doc.setDrawColor(...grayColor)
    doc.line(20, yPos + 2, 190, yPos + 2)

    yPos += 10
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)

    // Mapear status para texto legível
    const statusTexto = {
      [StatusOrcamento.PENDENTE]: 'Pendente',
      [StatusOrcamento.APROVADO]: 'Aprovado',
      [StatusOrcamento.RECUSADO]: 'Recusado',
    }

    const orcamentoData: Array<[string, string]> = [
      [
        'Data de criação:',
        orcamento.createdAt ? new Date(orcamento.createdAt).toLocaleDateString('pt-BR') : 'N/A',
      ],
      ['Status:', statusTexto[orcamento.status] || 'Não definido'], // Fallback se o status for inválido
      ['Validade:', '30 dias'],
    ]

    orcamentoData.forEach(([label, value]) => {
      // GARANTIA TOTAL: Converte para String e remove nulos
      const sLabel = String(label || '')
      const sValue = String(value || '')

      doc.setFont('helvetica', 'bold')
      doc.text(sLabel, 20, yPos)

      doc.setFont('helvetica', 'normal')
      doc.text(sValue, 55, yPos)

      yPos += 6
    })

    // TABELA DE AMOSTRAS
    yPos += 8
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('AMOSTRAS PARA ANÁLISE', 20, yPos)

    doc.setDrawColor(...grayColor)
    doc.line(20, yPos + 2, 190, yPos + 2)

    yPos += 7

    // TABELA DE AMOSTRAS - Proteção na data e valores
    // Tenta usar as amostras do orçamento primeiro, senão usa as amostras do cliente passadas como parâmetro
    const amostrasDoOrcamento = orcamento.amostras || amostrasCliente || []

    console.log('Amostras para o PDF:', amostrasDoOrcamento) // Debug

    const tableData = amostrasDoOrcamento.map((amostra, index) => [
      String(index + 1),
      String(amostra.nome || 'N/A'),
      String(amostra.tipoAmostra?.nome || 'N/A'),
      amostra.dataRecebimento
        ? new Date(amostra.dataRecebimento).toLocaleDateString('pt-BR')
        : 'N/A',
      'A definir',
    ])

    autoTable(doc, {
      startY: yPos,
      head: [['#', 'Nome da Amostra', 'Tipo', 'Data Recebimento', 'Observações']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    })

    // OBSERVAÇÕES
    const finalY = (doc as any).lastAutoTable.finalY + 10

    doc.setFontSize(9)
    doc.setFont('helvetica', 'italic')
    doc.setTextColor(...grayColor)
    doc.text('Este orçamento tem validade de 30 dias a partir da data de emissão.', 20, finalY)
    doc.text('Valores e prazos sujeitos a alteração mediante análise técnica.', 20, finalY + 5)

    // VALOR TOTAL DO ORÇAMENTO
    let valorTotalY = finalY + 20

    // Calcular o valor total baseado nos processos das amostras
    let valorTotal = 0
    const processosDetalhados: Array<{nome: string, preco: number, quantidade: number}> = []

    amostrasDoOrcamento.forEach((amostra) => {
      if (amostra.processos && Array.isArray(amostra.processos)) {
        amostra.processos.forEach((processo) => {
          const preco = parseFloat(processo.preco) || 0
          valorTotal += preco

          // Agregar processos iguais
          const processoExistente = processosDetalhados.find(p => p.nome === processo.nome)
          if (processoExistente) {
            processoExistente.quantidade += 1
          } else {
            processosDetalhados.push({
              nome: processo.nome,
              preco: preco,
              quantidade: 1
            })
          }
        })
      }
    })

    // Verificar se há espaço na página para a seção de valores
    if (valorTotalY > 240) {
      doc.addPage()
      valorTotalY = 30
    }

    // SEÇÃO DE VALORES
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('RESUMO FINANCEIRO', 20, valorTotalY)

    doc.setDrawColor(...grayColor)
    doc.line(20, valorTotalY + 2, 190, valorTotalY + 2)

    valorTotalY += 8

    // Tabela de processos e preços
    if (processosDetalhados.length > 0) {
      const processosTableData = processosDetalhados.map((processo) => [
        processo.nome,
        String(processo.quantidade),
        `R$ ${processo.preco.toFixed(2).replace('.', ',')}`,
        `R$ ${(processo.preco * processo.quantidade).toFixed(2).replace('.', ',')}`
      ])

      autoTable(doc, {
        startY: valorTotalY,
        head: [['Serviço', 'Qtd', 'Valor Unit.', 'Valor Total']],
        body: processosTableData,
        theme: 'grid',
        headStyles: {
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold',
        },
        styles: {
          fontSize: 9,
          cellPadding: 3,
          halign: 'left'
        },
        columnStyles: {
          1: { halign: 'center' }, // Quantidade centralizada
          2: { halign: 'right' },  // Valor unitário à direita
          3: { halign: 'right' }   // Valor total à direita
        }
      })

      valorTotalY = (doc as any).lastAutoTable.finalY + 10
    } else {
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(0, 0, 0)
      doc.text('Nenhum serviço/processo definido para as amostras.', 20, valorTotalY)
      valorTotalY += 15
    }

    // VALOR TOTAL DESTACADO
    valorTotalY += 5
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)

    const valorTotalFormatado = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`
    doc.text('VALOR TOTAL DO ORÇAMENTO:', 20, valorTotalY)
    doc.text(valorTotalFormatado, 120, valorTotalY)

    // Linha destacando o valor total
    doc.setDrawColor(...primaryColor)
    doc.setLineWidth(1)
    doc.line(20, valorTotalY + 2, 190, valorTotalY + 2)

    // RODAPÉ
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...grayColor)
    const footerText =
      'CT Mineral - www.ctmineral.com.br - contato@ctmineral.com.br'
    doc.text(footerText, 105, doc.internal.pageSize.height - 15, { align: 'center' })

    // SALVAR PDF - Proteção no nome do arquivo
    const idArquivo = orcamento.identificacao || orcamento.id || 'sem_id'
    const nomeClienteLimpo = (client.nome || 'cliente').replace(/\s+/g, '_')
    const nomeArquivo = `orcamento_${idArquivo}_${nomeClienteLimpo}.pdf`

    doc.save(nomeArquivo)
  } catch (err) {
    console.error('Erro crítico ao gerar PDF:', err)
  }
}
