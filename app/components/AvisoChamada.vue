<script setup lang="ts">
import type { Meetup } from '#shared/meetups'
import { vagasDePalestraAbertas } from '#shared/meetups'

const props = defineProps<{ meetup: Meetup; link?: string }>()

const restantes = computed(() => vagasDePalestraAbertas(props.meetup))
const confirmadas = computed(() => props.meetup.palestrantes.length)

/**
 * Sem `vagasDePalestra` definido, o aviso só aparece quando não há ninguém —
 * é o comportamento antigo. Com o total definido, ele acompanha as vagas.
 */
const mostrar = computed(() =>
  restantes.value === null ? confirmadas.value === 0 : restantes.value > 0,
)

const titulo = computed(() => {
  if (restantes.value === null) return 'Palestras em confirmação'
  const n = restantes.value
  const vaga = n === 1 ? 'vaga aberta' : 'vagas abertas'
  return confirmadas.value === 0
    ? `Palestras em confirmação — ${n} ${vaga}`
    : `Ainda dá tempo: ${n} ${vaga}`
})
</script>

<template>
  <div v-if="mostrar" class="border border-dashed border-line p-6">
    <p class="font-mono text-sm font-bold text-accent">{{ titulo }}</p>
    <p class="mt-2 text-sm text-fg-muted">
      <template v-if="confirmadas === 0">
        A grade sai daqui a pouco — a chamada de palestras ainda está aberta.
      </template>
      <template v-else>
        A grade já começou a fechar, mas ainda cabe você nela.
      </template>
      <NuxtLink
        :to="link ?? '#palestrar'"
        class="text-primary underline underline-offset-4"
      >propor uma palestra</NuxtLink>.
    </p>
  </div>
</template>
