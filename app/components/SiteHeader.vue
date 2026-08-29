<script setup lang="ts">
import { proximoMeetup } from '#shared/meetups'

const aberto = ref(false)
const links = [
  { href: '/#meetup', label: 'próximo meetup' },
  { href: '/#sobre', label: 'sobre' },
  { href: '/#palestrar', label: 'palestrar' },
  { href: '/#ajudar', label: 'ajudar' },
  { href: '/#vagas', label: 'vagas' },
]

// Sem encontro marcado não existe vaga pra garantir — o convite vira palestrar.
const cta = proximoMeetup
  ? { href: '/#inscricao', label: 'garantir minha vaga' }
  : { href: '/#palestrar', label: 'quero palestrar' }
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-line-soft bg-bg-deep/85 backdrop-blur-sm"
  >
    <div class="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3">
      <NuxtLink
        to="/"
        class="flex shrink-0 items-center gap-1.5"
        aria-label="DEV-PP — página inicial"
      >
        <span aria-hidden="true" class="font-mono text-base font-bold text-primary">$</span>
        <img
          src="/img/devpp-logo.png"
          alt="DEV-PP"
          width="366"
          height="80"
          class="h-6 w-auto [image-rendering:pixelated]"
        >
        <span aria-hidden="true" class="caret" />
      </NuxtLink>

      <nav class="hidden flex-1 items-center gap-5 font-mono text-[0.8rem] text-fg-muted md:flex">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="transition-colors hover:text-primary"
        >{{ l.label }}</a>
      </nav>

      <a
        :href="cta.href"
        class="ml-auto hidden border border-primary bg-primary px-4 py-2 font-mono text-[0.78rem] font-bold text-primary-fg transition-colors hover:bg-primary-deep md:inline-block"
      >
        {{ cta.label }}
      </a>

      <button
        class="ml-auto border border-line px-3 py-2 font-mono text-xs text-fg-muted md:hidden"
        :aria-expanded="aberto"
        aria-controls="menu-mobile"
        @click="aberto = !aberto"
      >
        {{ aberto ? '[ fechar ]' : '[ menu ]' }}
      </button>
    </div>

    <div v-if="aberto" id="menu-mobile" class="border-t border-line-soft md:hidden">
      <nav class="mx-auto flex max-w-6xl flex-col px-5 py-2 font-mono text-sm">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="border-b border-line-soft py-3 text-fg-muted"
          @click="aberto = false"
        >
          <span class="text-primary">&gt;</span> {{ l.label }}
        </a>
        <a
          :href="cta.href"
          class="mt-3 mb-2 bg-primary px-4 py-3 text-center font-bold text-primary-fg"
          @click="aberto = false"
        >{{ cta.label }}</a>
      </nav>
    </div>
  </header>
</template>
