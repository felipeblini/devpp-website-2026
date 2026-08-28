<script setup lang="ts">
defineProps<{
  comando: string
  titulo: string
  descricao?: string
}>()
</script>

<template>
  <div class="max-w-2xl">
    <p class="pixel text-[0.62rem] tracking-wide text-primary">
      <span class="text-fg-dim">$</span> {{ comando }}
    </p>
    <h2 class="mt-3 text-3xl sm:text-4xl">
      {{ titulo }}
    </h2>
    <p v-if="descricao" class="mt-4 text-fg-muted">
      {{ descricao }}
    </p>
  </div>
</template>
