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
        <p class="font-mono text-[0.72rem] text-fg-muted">
          <UiPrompt />{{ ' ' }}devpp inscrever
        </p>
        <h2 class="mt-4 text-[2rem] leading-[1.08] sm:text-4xl">
          Garanta a sua <span class="text-primary glow">vaga</span>
        </h2>

        <dl class="mt-8 space-y-5">
          <div class="flex items-start gap-3">
            <svg class="mt-0.5 size-5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="1" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            <div>
              <dt class="sr-only">dia</dt>
              <dd class="font-mono text-lg font-bold">
                {{ data.diaSemana }}, {{ data.curta }}
              </dd>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <svg class="mt-0.5 size-5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3.5 2" />
            </svg>
            <div>
              <dt class="sr-only">hora</dt>
              <dd class="font-mono text-lg font-bold">
                <span v-if="m.horario">{{ m.horario }}</span>
                <UiCarregando v-else texto="a definir" />
              </dd>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <svg class="mt-0.5 size-5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <div class="min-w-0">
              <dt class="sr-only">local</dt>
              <dd class="font-mono text-lg font-bold">
                <a
                  v-if="m.local && m.localSite"
                  :href="m.localSite"
                  target="_blank"
                  rel="noopener"
                  class="underline underline-offset-4 transition-colors hover:text-primary"
                >{{ m.local }} ↗</a>
                <span v-else-if="m.local">{{ m.local }}</span>
                <UiCarregando v-else texto="a definir" />
              </dd>
              <dd class="font-mono text-sm text-fg-muted">{{ m.cidade }}</dd>
              <dd v-if="m.mapa" class="mt-1">
                <a
                  :href="m.mapa"
                  target="_blank"
                  rel="noopener"
                  class="font-mono text-sm text-primary underline underline-offset-4"
                >ver localização no mapa ↗</a>
              </dd>
            </div>
          </div>
        </dl>

        <p class="mt-8 max-w-md text-fg-muted">
          A entrada é livre — a inscrição serve pra gente saber quantos esperar,
          reservar a sua vaga e te colocar no sorteio de brindes do fim do encontro.
          Nome e e-mail, e só.
        </p>
      </div>

      <div class="min-w-0 lg:col-span-6">
        <FormVaga :meetup="m.slug" :numero="m.numero" />
      </div>
    </div>
  </section>
</template>
