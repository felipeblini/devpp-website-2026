<script setup lang="ts">
import { proximoMeetup } from '#shared/meetup'

const linhas = [
  { chave: 'comunidade', valor: 'ONLINE', tom: 'primary' },
  { chave: 'fundada em', valor: '2019', tom: 'muted' },
  { chave: 'hiato', valor: '2021 → 2026', tom: 'muted' },
  { chave: 'próximo encontro', valor: '24/09/2026', tom: 'accent' },
  { chave: 'inscrição', valor: 'ABERTA', tom: 'primary' },
] as const

const tons: Record<string, string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  muted: 'text-fg-muted',
}
</script>

<template>
  <section class="relative overflow-hidden border-b border-line-soft">
    <!-- brilho de fósforo atrás do herói -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full opacity-[0.13] blur-3xl"
      style="background: radial-gradient(closest-side, var(--primary), transparent)"
    />

    <div class="mx-auto grid max-w-6xl gap-12 px-5 pt-16 pb-20 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:pb-28">
      <div class="min-w-0 lg:col-span-7">
        <p class="pixel inline-flex items-center gap-2 border border-line px-3 py-1.5 text-[0.6rem] text-accent">
          <span class="inline-block size-1.5 bg-accent" />
          {{ proximoMeetup.numero }} da retomada · {{ proximoMeetup.dataExtenso }}
        </p>

        <h1 class="mt-6 text-[2rem] leading-[1.08] sm:text-5xl sm:leading-[1.06] lg:text-[3.2rem]">
          A comunidade dev de<br class="hidden sm:inline">
          Presidente Prudente<br class="hidden sm:inline">
          <span class="text-primary glow">voltou a rodar.</span>
        </h1>

        <p class="mt-6 max-w-xl text-lg text-fg-muted">
          O DEV-PP é o encontro presencial de quem escreve código na região —
          palestra, papo técnico e networking de verdade. Ficamos cinco anos parados.
          O primeiro meetup da volta é <strong class="font-semibold text-fg">24 de setembro</strong>.
        </p>

        <div class="mt-9 flex flex-wrap gap-3">
          <AppButton href="#inscricao">
            garantir minha vaga →
          </AppButton>
          <AppButton href="#palestrar" variante="linha">
            quero palestrar
          </AppButton>
        </div>

        <p class="mt-5 font-mono text-xs text-fg-dim">
          gratuito · sem fins lucrativos · organizado pela própria comunidade desde 2019
        </p>
      </div>

      <div class="min-w-0 lg:col-span-5 lg:pt-8">
        <UiTerminalWindow titulo="devpp@prudente: ~/comunidade" scanlines>
          <div class="p-5 font-mono text-[0.82rem] leading-relaxed">
            <p class="text-fg-dim">
              <span class="text-primary">$</span> devpp status
            </p>
            <dl class="mt-3 space-y-1.5">
              <div
                v-for="(l, i) in linhas"
                :key="l.chave"
                class="flex items-baseline gap-2 opacity-0 [animation:fade-in_.4s_ease-out_forwards]"
                :style="{ animationDelay: `${180 + i * 110}ms` }"
              >
                <dt class="shrink-0 text-fg-dim">{{ l.chave }}</dt>
                <span aria-hidden="true" class="min-w-4 flex-1 self-center border-b border-dotted border-line" />
                <dd class="shrink-0 font-bold" :class="tons[l.tom]">{{ l.valor }}</dd>
              </div>
            </dl>
            <p class="mt-4 text-fg-dim caret opacity-0 [animation:fade-in_.4s_ease-out_forwards]" style="animation-delay: 800ms">
              <span class="text-primary">$</span>
            </p>
          </div>
        </UiTerminalWindow>

        <p class="mt-3 font-mono text-[0.7rem] text-fg-dim">
          // 2019–2021: meetups gratuitos, palestras da comunidade, vagas locais.
        </p>
      </div>
    </div>
  </section>
</template>

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: none; }
}
</style>
