<script setup lang="ts">
import type { Meetup } from '#shared/meetups'
import { proximoMeetup, partesDaData } from '#shared/meetups'

// Vive na página do encontro; sem prop, cai no próximo encontro confirmado.
const props = defineProps<{ meetup?: Meetup | null }>()

const m = computed(() => props.meetup ?? proximoMeetup)
const data = computed(() => (m.value ? partesDaData(m.value.data) : null))
</script>

<!-- Só existe quando há encontro marcado: inscrição sem data não significa nada. -->
<template>
  <section
    v-if="m && data"
    id="inscricao"
    class="relative overflow-hidden border-b border-line-soft bg-bg-deep"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -right-40 -bottom-40 h-[30rem] w-[30rem] rounded-full opacity-[0.12] blur-3xl"
      style="background: radial-gradient(closest-side, var(--primary), transparent)"
    />

    <div class="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
      <div class="min-w-0 lg:col-span-6 lg:pt-4">
        <p class="pixel text-[0.62rem] text-primary">$ devpp inscrever</p>
        <h2 class="mt-4 text-[2rem] leading-[1.08] sm:text-4xl lg:text-[2.7rem]">
          Dia {{ Number(data.dia) }}<template v-if="m.horarioCurto">, às {{ m.horarioCurto }}</template>,<br>
          <span class="text-primary glow">
            <template v-if="m.local">no {{ m.local }}.</template>
            <template v-else><UiCarregando texto="local a definir" />.</template>
          </span>
        </h2>
        <p class="mt-6 max-w-md text-lg text-fg-muted">
          Deixa nome e e-mail. É só isso — e a gente te manda a grade e os avisos
          antes de todo mundo. Entrar é de graça, e sempre vai ser.
        </p>

        <ul class="mt-8 space-y-2.5 font-mono text-sm text-fg-muted">
          <li><span class="text-primary">✓</span> entrada gratuita</li>
          <li><span class="text-primary">✓</span> sem cadastro e sem senha</li>
          <li><span class="text-primary">✓</span> seu e-mail não vai pra lugar nenhum</li>
        </ul>
      </div>

      <div class="min-w-0 lg:col-span-6">
        <FormVaga :meetup="m.slug" :numero="m.numero" />
      </div>
    </div>
  </section>
</template>
