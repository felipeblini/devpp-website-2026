<script setup lang="ts">
withDefaults(
  defineProps<{
    href?: string
    to?: string
    variante?: 'primaria' | 'linha'
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { variante: 'primaria', type: 'button' },
)

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 font-mono text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60'
const estilos = {
  primaria: 'border border-primary bg-primary text-primary-fg hover:bg-primary-deep hover:border-primary-deep',
  linha: 'border border-line text-fg hover:border-primary hover:text-primary',
}
</script>

<template>
  <a v-if="href" :href="href" :class="[base, estilos[variante]]">
    <slot />
  </a>
  <NuxtLink v-else-if="to" :to="to" :class="[base, estilos[variante]]">
    <slot />
  </NuxtLink>
  <button v-else :type="type" :disabled="disabled" :class="[base, estilos[variante]]">
    <slot />
  </button>
</template>
