<script setup lang="ts">
import { proximoMeetup, proximoNumero, partesDaData, call4papersAberto } from '#shared/meetups'
import type { LinhaStatus } from '~/components/TerminalStatus.vue'

const data = proximoMeetup ? partesDaData(proximoMeetup.data) : null

const status: LinhaStatus[] = [
  { rotulo: 'comunidade', valor: 'ATIVA', tom: 'primary' },
  { rotulo: 'próximo meetup', valor: `#${proximoNumero}`, tom: 'accent' },
  { rotulo: 'data', valor: data?.curta ?? null, carregando: 'a definir', tom: 'accent' },
  {
    rotulo: 'call4Papers',
    valor: call4papersAberto(proximoMeetup) ? 'ABERTO' : 'FECHADO',
    tom: call4papersAberto(proximoMeetup) ? 'primary' : 'muted',
  },
]
</script>

<template>
  <section class="relative overflow-hidden border-b border-line-soft">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full opacity-[0.13] blur-3xl"
      style="background: radial-gradient(closest-side, var(--primary), transparent)"
    />

    <div class="mx-auto grid max-w-6xl gap-12 px-5 pt-16 pb-20 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:pb-28">
      <div class="min-w-0 lg:col-span-7">

        <h1 class="text-[2rem] leading-[1.08] sm:text-5xl sm:leading-[1.06] lg:text-[3.2rem]">
          A comunidade dev de<br class="hidden sm:inline">{{ ' ' }}<span class="text-primary glow">Presidente Prudente<br class="hidden sm:inline"> e região</span>
        </h1>

        <p class="mt-6 max-w-xl text-lg text-fg-muted">
          O DEV-PP junta quem escreve código na região pra trocar conhecimento, palestrar
          e fazer networking de verdade — em meetups organizados pela própria comunidade.
        </p>

        <div class="mt-9 flex flex-wrap gap-3">
          <AppButton href="#sobre" variante="linha">
            o que é o DEV-PP →
          </AppButton>
          <AppButton href="#palestrar">
            <UiIcone nome="codigo" />
            quero palestrar
          </AppButton>
        </div>

        <p class="mt-5 font-mono text-xs text-fg-dim">
          gratuito · sem fins lucrativos · organizado pela própria comunidade desde 2017
        </p>
      </div>

      <div class="min-w-0 lg:col-span-5 lg:pt-8">
        <TerminalStatus comando="devpp --status" :linhas="status" />

        <p class="mt-3 font-mono text-[0.7rem] text-fg-dim">
          // meetups, palestras da comunidade e vagas da região.
        </p>
      </div>
    </div>
  </section>
</template>
