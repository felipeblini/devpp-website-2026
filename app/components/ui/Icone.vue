<script setup lang="ts">
/**
 * Ícones (lucide) desenhados inline — sem biblioteca, sem requisição extra.
 * Herdam a cor e o tamanho da fonte de quem os usa.
 */
defineProps<{
  nome: 'codigo' | 'merge' | 'microfone' | 'commit' | 'pull-request' | 'seta-esquerda'
}>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="size-[1.15em] shrink-0"
    aria-hidden="true"
  >
    <template v-if="nome === 'codigo'">
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </template>

    <template v-else-if="nome === 'merge'">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M6 21V9a9 9 0 0 0 9 9" />
    </template>

    <template v-else-if="nome === 'microfone'">
      <rect x="9" y="2" width="6" height="13" rx="3" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <path d="M12 19v3" />
    </template>

    <template v-else-if="nome === 'commit'">
      <circle cx="12" cy="12" r="3" />
      <path d="M3 12h6" />
      <path d="M15 12h6" />
    </template>

    <template v-else-if="nome === 'seta-esquerda'">
      <path d="M21 12H4" />
      <path d="m10 19-7-7 7-7" />
    </template>

    <template v-else-if="nome === 'pull-request'">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <path d="M6 9v12" />
    </template>
  </svg>
</template>
