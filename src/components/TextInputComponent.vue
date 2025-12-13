<script setup lang="ts">
defineProps({
  placeholderProps: String,
  typeProps: { type: String, default: 'text' },
  prependIconProps: String,
  appendIconProps: String,
})

</script>

<template>
  <v-text-field
    :placeholder="placeholderProps"
    :type="typeProps"
    :prepend-inner-icon="prependIconProps"
    :append-inner-icon="appendIconProps"
    variant="outlined"
    class="rounded-lg"
  />
</template>

<style scoped></style>
