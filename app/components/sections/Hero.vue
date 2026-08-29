<script setup lang="ts">
import { proximoMeetup, proximoNumero, partesDaData } from '#shared/meetups'

const data = proximoMeetup ? partesDaData(proximoMeetup.data) : null

const tons: Record<string, string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  muted: 'text-fg-muted',
}
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
        <p class="pixel inline-flex items-center gap-2 border border-line px-3 py-1.5 text-[0.6rem] text-accent">
          <span class="inline-block size-1.5 bg-accent" />
          <span v-if="proximoMeetup && data">
            meetup #{{ proximoNumero }} · {{ data.extenso }} · {{ proximoMeetup.horarioCurto ?? 'horário a definir' }}
          </span>
          <span v-else>
            meetup #{{ proximoNumero }} <UiCarregando />
          </span>
        </p>

        <h1 class="mt-6 text-[2rem] leading-[1.08] sm:text-5xl sm:leading-[1.06] lg:text-[3.2rem]">
          A comunidade dev de<br class="hidden sm:inline">
          <span class="text-primary glow">Presidente Prudente<br class="hidden sm:inline">
            e região</span>
        </h1>

        <p class="mt-6 max-w-xl text-lg text-fg-muted">
          O DEV-PP junta quem escreve código na região pra trocar conhecimento, palestrar
          e fazer networking de verdade. Meetup gratuito, organizado pela própria
          comunidade.
          <template v-if="proximoMeetup && data">
            O próximo é <strong class="font-semibold text-fg">{{ Number(data.dia) }} de {{ data.mes }}<template v-if="proximoMeetup.horarioCurto">, às {{ proximoMeetup.horarioCurto }}</template><template v-if="proximoMeetup.local">, no {{ proximoMeetup.local }}</template></strong>.
          </template>
          <template v-else>
            A data do próximo ainda está sendo fechada —
            <strong class="font-semibold text-fg">e você pode ajudar a construir ele</strong>.
          </template>
        </p>

        <div class="mt-9 flex flex-wrap gap-3">
          <AppButton href="#sobre" variante="linha">
            o que é o DEV-PP →
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
                class="flex items-baseline gap-2 opacity-0 [animation:fade-in_.4s_ease-out_forwards]"
                style="animation-delay: 180ms"
              >
                <dt class="shrink-0 text-fg-dim">comunidade</dt>
                <span aria-hidden="true" class="min-w-4 flex-1 self-center border-b border-dotted border-line" />
                <dd class="shrink-0 font-bold text-primary">ONLINE</dd>
              </div>
              <div
                class="flex items-baseline gap-2 opacity-0 [animation:fade-in_.4s_ease-out_forwards]"
                style="animation-delay: 290ms"
              >
                <dt class="shrink-0 text-fg-dim">desde</dt>
                <span aria-hidden="true" class="min-w-4 flex-1 self-center border-b border-dotted border-line" />
                <dd class="shrink-0 font-bold text-fg-muted">2019</dd>
              </div>
              <div
                class="flex items-baseline gap-2 opacity-0 [animation:fade-in_.4s_ease-out_forwards]"
                style="animation-delay: 400ms"
              >
                <dt class="shrink-0 text-fg-dim">próximo encontro</dt>
                <span aria-hidden="true" class="min-w-4 flex-1 self-center border-b border-dotted border-line" />
                <dd class="shrink-0 font-bold" :class="data ? 'text-accent' : 'text-fg-muted'">
                  <span v-if="data">{{ data.curta }}</span>
                  <UiCarregando v-else />
                </dd>
              </div>
              <div
                class="flex items-baseline gap-2 opacity-0 [animation:fade-in_.4s_ease-out_forwards]"
                style="animation-delay: 510ms"
              >
                <dt class="shrink-0 text-fg-dim">{{ proximoMeetup ? 'inscrição' : 'chamada de palestras' }}</dt>
                <span aria-hidden="true" class="min-w-4 flex-1 self-center border-b border-dotted border-line" />
                <dd class="shrink-0 font-bold text-primary">ABERTA</dd>
              </div>
            </dl>
            <p class="mt-4 text-fg-dim caret opacity-0 [animation:fade-in_.4s_ease-out_forwards]" style="animation-delay: 800ms">
              <span class="text-primary">$</span>
            </p>
          </div>
        </UiTerminalWindow>

        <p class="mt-3 font-mono text-[0.7rem] text-fg-dim">
          // meetups gratuitos, palestras da comunidade e vagas da região.
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
