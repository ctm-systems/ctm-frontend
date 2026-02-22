# Sistema de Gerenciamento de Serviços - CT Mineral

![GitHub pull requests](https://img.shields.io/github/issues-pr/ctm-systems/ctm-backend)
![GitHub issues](https://img.shields.io/github/issues/ctm-systems/ctm-backend)
![GitHub stars](https://img.shields.io/github/stars/ctm-systems/ctm-backend)
![GitHub forks](https://img.shields.io/github/forks/ctm-systems/ctm-backend)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-42b883?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vuetify](https://img.shields.io/badge/Vuetify-3.11-1867c0?logo=vuetify&logoColor=white)](https://vuetifyjs.com/)
[![Pinia](https://img.shields.io/badge/Pinia-3.0-f7df1e?logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![Axios](https://img.shields.io/badge/Axios-1.13-5a29e4?logo=axios&logoColor=white)](https://axios-http.com/)

## Sumário

- [Descrição](#descrição)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Arquitetura e organização](#arquitetura-e-organização)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e execução](#instalação-e-execução)
- [Scripts disponíveis](#scripts-disponíveis)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Funcionalidades](#funcionalidades)
- [Integração com API](#integração-com-api)
- [Build para produção](#build-para-produção)
- [Deploy](#deploy)
- [Boas práticas adotadas](#boas-práticas-adotadas)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Autores](#autores)

## Descrição

O projeto implementa um painel operacional que permite:

- cadastrar clientes e associar técnicos;
- cadastrar amostras, associando tipo e processos;
- gerar e acompanhar orçamentos por cliente;
- processar planilhas e disponibilizar download por amostra;
- administrar usuários e processos (áreas restritas a diretor).

## Tecnologias utilizadas

- **Linguagem:** TypeScript
- **Framework:** Vue 3
- **Build Tool:** Vite
- **Bibliotecas:** Vuetify 3, Vue Router 4, Pinia, Axios, Maska, jsPDF e jsPDF-AutoTable

## Arquitetura e organização

Arquitetura orientada a domínio com separação clara de responsabilidades:

- **Views (`src/views`)**: telas e fluxos de negócio.
- **Components (`src/components`)**: componentes reutilizáveis de UI.
- **Stores (`src/stores`)**: estado global e ações de domínio.
- **Services (`src/services`)**: integração com API REST e utilitários (PDF).
- **Types (`src/types`)**: tipagem das entidades de negócio.
- **Router (`src/router`)**: rotas, layout por contexto e guardas de autenticação/autorização.
- **Config (`src/config`)**: leitura de variáveis de ambiente.

## Estrutura de pastas

```text
.
├── public/                     # Arquivos estáticos públicos
├── src/
│   ├── assets/                 # CSS base e assets visuais
│   ├── components/             # Componentes reutilizáveis
│   ├── config/                 # Configurações de ambiente
│   ├── layouts/                # Layout de autenticação e layout principal
│   ├── router/                 # Definição de rotas e guards
│   ├── services/               # Camada de acesso HTTP e geração de PDF
│   ├── stores/                 # Stores Pinia por domínio
│   ├── types/                  # Interfaces e enums TypeScript
│   ├── views/                  # Páginas da aplicação
│   ├── App.vue                 # Componente raiz
│   └── main.ts                 # Bootstrap do app (Vue, Pinia, Router, Vuetify)
├── .env.example                # Exemplo de variáveis de ambiente
├── eslint.config.ts            # Configuração ESLint Flat Config
├── tsconfig*.json              # Configurações TypeScript
├── vite.config.ts              # Configuração Vite (alias @ e plugins)
└── package.json                # Scripts e dependências
```

## Pré-requisitos

- **Node.js**: `^20.19.0` ou `>=22.12.0`
- **npm**: versão compatível com o Node instalado

## Instalação e execução

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

### Preview local de build

```bash
npm run build
npm run preview
```

## Scripts disponíveis

- `npm run dev`: inicia o servidor de desenvolvimento (Vite).
- `npm run build`: executa type-check (`vue-tsc --build`) e build de produção.
- `npm run build-only`: gera build de produção via Vite.
- `npm run preview`: serve localmente a build gerada.
- `npm run type-check`: valida tipos TypeScript/Vue.
- `npm run lint:oxlint`: lint com Oxlint e correções automáticas.
- `npm run lint:eslint`: lint com ESLint e correções automáticas.
- `npm run lint`: executa `lint:oxlint` e `lint:eslint`.
- `npm run format`: formata `src/` com Prettier.

## Variáveis de ambiente

Arquivo de referência: `.env.example`

```dotenv
VITE_URL_SERVER=
VITE_SUPABASE_URL=
```

### Descrição

- `VITE_URL_SERVER`: URL base da API backend.
- `VITE_SUPABASE_URL`: URL base para acesso a arquivos (ex.: imagens de amostras).

Crie um `.env` na raiz do projeto com os valores do ambiente.

## Funcionalidades

- Login com conta institucional (SUAP) e callback OAuth-like.
- Proteção de rotas para usuários autenticados.
- Restrição de telas administrativas para perfil `diretor`.
- Listagem, cadastro e remoção de clientes.
- Associação de técnicos a clientes.
- Cadastro de amostras com upload de foto.
- Associação de processos às amostras.
- Geração de orçamento com associação de amostras.
- Atualização de status de orçamento (`PENDENTE`, `APROVADO`, `RECUSADO`).
- Geração de PDF de orçamento com resumo financeiro.
- Tratamento/upload de planilhas e download por amostra.
- CRUD administrativo de técnicos e processos.

## Integração com API

A integração é feita por `axios` em `src/services/api.ts`:

- `baseURL`: `VITE_URL_SERVER`
- `withCredentials: true`

### Principais recursos consumidos

- **Auth/SUAP**: `/auth/url`, `/auth/callback`, `/data`, `/logout`
- **Clientes**: `/clientes`, `/clientes/:id`, `/clientes/:id/adicionar-tecnico`
- **Amostras**: `/amostras`, `/amostras/:id`, `/amostras/:id/adicionar-processo`
- **Orçamentos**: `/orcamentos`, `/orcamentos/:id`, `/orcamentos/:id/adicionar-amostra`
- **Planilhas**: `/planilhas`, `/planilhas/:id/download`
- **Processos**: `/processos`
- **Técnicos**: `/tecnicos`
- **Tipos de amostra**: `/tipos-amostras`

## Build para produção

```bash
npm run build
```

Saída padrão em `dist/`.

## Deploy

O artefato gerado (`dist/`) pode ser publicado em qualquer serviço de hospedagem estática compatível com SPA, com fallback de rotas configurado no servidor.

## Boas práticas adotadas

- Tipagem forte com TypeScript para entidades e contratos de serviço.
- Separação em camadas (`views`, `components`, `stores`, `services`, `types`).
- Alias `@` para imports absolutos e maior legibilidade.
- Guardas de rota para autenticação e autorização por perfil.
- Reaproveitamento de componentes de formulário e feedback visual.
- Padronização de qualidade com ESLint, Oxlint e Prettier.

## Contribuição

1. Faça um fork do projeto;
2. Crie uma branch (`git checkout -b minha-feature`);
3. Commit suas mudanças (`git commit -m 'Adiciona minha feature'`);
4. Envie para o repositório (`git push origin minha-feature`);
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a **MIT License**.

Consulte o arquivo [LICENSE](LICENSE) para os detalhes completos.

## Autores
[<img loading="lazy" src="https://avatars.githubusercontent.com/u/137799663?s=48&v=4" width=115>](https://github.com/Barr0ca) [<img loading="lazy" src="https://avatars.githubusercontent.com/u/138258644?v=4" width=115>](https://github.com/jardsonalan) [<img loading="lazy" src="https://avatars.githubusercontent.com/u/162215028?v=4" width=115>](https://github.com/uluscaz-ifrn) [<img loading="lazy" src="https://avatars.githubusercontent.com/u/204107954?v=4" width=115>](https://github.com/roberio-junior)
