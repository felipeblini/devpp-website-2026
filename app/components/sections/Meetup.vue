<script setup lang="ts">
import { proximoMeetup as m, partesDaData, meetupsAnteriores, call4papersAberto } from '#shared/meetups'
import type { LinhaStatus } from '~/components/TerminalStatus.vue'

const data = m ? partesDaData(m.data) : null

/** A lista mostra o encontro atual primeiro, depois os anteriores. */
const lista = m ? [m, ...meetupsAnteriores] : meetupsAnteriores

const detalhes: LinhaStatus[] = m && data
  ? [
      {
        rotulo: 'quando',
        valor: m.horarioCurto ? `${data.curta} · ${m.horarioCurto}` : data.curta,
        tom: 'accent',
      },
      {
        rotulo: 'onde',
        valor: m.local ? `${m.local}, ${m.cidade}` : null,
        carregando: 'a definir',
        tom: 'muted',
      },
      { rotulo: 'entrada', valor: 'GRATUITA', tom: 'primary' },
      {
        rotulo: 'call4Papers',
        valor: call4papersAberto(m) ? 'ABERTO' : 'FECHADO',
        tom: call4papersAberto(m) ? 'primary' : 'muted',
      },
      { rotulo: 'inscrições', valor: 'ABERTAS', tom: 'primary' },
    ]
  : []
</script>

<template>
  <section
    v-if="m || meetupsAnteriores.length"
    id="meetups"
    class="border-b border-line-soft bg-bg-deep"
  >
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <UiSectionHead
        v-if="m"
        comando="devpp --next"
        :titulo="m.titulo"
      />

      <!-- ---------- com encontro marcado ---------- -->
      <div v-if="m && data" class="mt-12">
        <TerminalStatus
          titulo="dev@pp — zsh — ~"
          caminho="~"
          comando="devpp meetups --next"
          :linhas="detalhes"
        />

        <div class="mt-8">
          <AppButton :to="`/meetup/${m.slug}#inscricao`" class="w-full">
            <UiIcone nome="commit" />
            garantir minha vaga
          </AppButton>
          <p class="mt-3 text-center font-mono text-[0.68rem] text-fg-dim">
            entrada livre — se inscreva e garanta sua vaga
          </p>

          <p class="mt-6 text-center font-mono text-xs">
            <UiPrompt />{{ ' ' }}<NuxtLink
              :to="`/meetup/${m.slug}`"
              class="underline underline-offset-4 transition-colors hover:text-primary"
            >cat detalhes.json</NuxtLink>{{ ' ' }}<UiIcone
              nome="seta-direita"
              class="inline-block text-fg-dim"
            />
          </p>
        </div>
      </div>

      <CarrosselMeetups
        v-if="lista.length"
        :class="m && 'mt-20'"
        :meetups="lista"
        :atual="m?.slug"
      />
    </div>
  </section>
</template>
