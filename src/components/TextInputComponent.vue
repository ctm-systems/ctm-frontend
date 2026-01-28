<script setup lang="ts">
import { vMaska } from 'maska/vue'

defineProps({
  placeholderProps: String,
  typeProps: { type: String, default: 'text' },
  prependIconProps: String,
  appendIconProps: String,
  maskProps: String,
})

</script>

<template>
  <v-text-field
    :placeholder="placeholderProps"
    :type="typeProps"
    :prepend-inner-icon="prependIconProps"
    :append-inner-icon="appendIconProps"
    v-maska="maskProps"
    variant="outlined"
    class="rounded-lg"
  />
</template>

<style scoped></style>
