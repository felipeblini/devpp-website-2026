<script setup lang="ts">
defineProps<{
  comando: string
  titulo?: string
  descricao?: string
}>()
</script>

<template>
  <div class="max-w-2xl">
    <p class="font-mono text-[0.72rem] tracking-wide text-fg-muted">
      <UiPrompt />{{ ' ' }}{{ comando }}
    </p>
    <h2 class="mt-3 text-3xl sm:text-4xl">
      <slot name="titulo">{{ titulo }}</slot>
    </h2>
    <p v-if="descricao || $slots.descricao" class="mt-4 text-fg-muted">
      <slot name="descricao">{{ descricao }}</slot>
    </p>
  </div>
</template>
