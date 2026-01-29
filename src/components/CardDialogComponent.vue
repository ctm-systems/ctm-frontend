<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type: 'success' | 'error'
  title: string
}

const props = defineProps<Props>()

const isError = computed(() => props.type === 'error')
const cardColor = computed(() => (isError.value ? '#FFE5E5' : '#E5F5E5'))
const titleColor = computed(() => (isError.value ? '#FF1A1A' : '#00A400'))
</script>

<template>
  <v-card :style="{ backgroundColor: cardColor }" class="rounded-lg" variant="flat">
    <v-card-title :style="{ color: titleColor }" class="text-h6 font-weight-bold">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>
