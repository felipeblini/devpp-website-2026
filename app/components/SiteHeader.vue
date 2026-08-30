<script setup lang="ts">
const aberto = ref(false)
const links = [
  { href: '/#meetup', label: 'meetup' },
  { href: '/#sobre', label: 'sobre' },
  { href: '/#participar', label: 'participar' },
  { href: '/#palestrar', label: 'palestrar' },
  { href: '/#ajudar', label: 'ajudar' },
  { href: '/#vagas', label: 'vagas' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#parceiros', label: 'parcerias' },
]
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

      <nav class="hidden flex-1 items-center gap-4 font-mono text-[0.78rem] text-fg-muted lg:flex">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="transition-colors hover:text-primary"
        >_{{ l.label }}</a>
      </nav>

      <a
        href="/#junte-se"
        class="ml-auto hidden items-center gap-2 border border-primary bg-primary px-4 py-2 font-mono text-[0.78rem] font-bold tracking-wide text-primary-fg uppercase transition-colors hover:bg-primary-deep lg:inline-flex"
      >
        <UiIcone nome="merge" />
        junte-se a nós
      </a>

      <button
        class="ml-auto border border-line px-3 py-2 font-mono text-xs text-fg-muted lg:hidden"
        :aria-expanded="aberto"
        aria-controls="menu-mobile"
        @click="aberto = !aberto"
      >
        {{ aberto ? '[ fechar ]' : '[ menu ]' }}
      </button>
    </div>

    <div v-if="aberto" id="menu-mobile" class="border-t border-line-soft lg:hidden">
      <nav class="mx-auto flex max-w-6xl flex-col px-5 py-2 pb-4 font-mono text-sm">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="border-b border-line-soft py-3 text-fg-muted"
          @click="aberto = false"
        >
          <span class="text-primary">_</span>{{ l.label }}
        </a>
        <a
          href="/#junte-se"
          class="mt-3 mb-2 flex items-center justify-center gap-2 bg-primary px-4 py-3 font-bold tracking-wide text-primary-fg uppercase"
          @click="aberto = false"
        >
          <UiIcone nome="merge" />
          junte-se a nós
        </a>
      </nav>
    </div>
  </header>
</template>
