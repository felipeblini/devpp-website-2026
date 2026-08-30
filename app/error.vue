<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const ehQuatroZeroQuatro = computed(() => props.error?.statusCode === 404)
const caminho = computed(() => {
  const url = String(props.error?.url ?? '')
  return url.split('?')[0] || '/pagina-que-vc-procurou'
})

useSeoMeta({
  title: ehQuatroZeroQuatro.value ? 'Página não encontrada — DEV-PP' : 'Deu ruim — DEV-PP',
  robots: 'noindex',
})
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-bg text-fg antialiased">
    <SiteHeader />

    <main class="flex flex-1 items-center">
      <div class="mx-auto w-full max-w-3xl px-5 py-20">
        <UiTerminalWindow estilo="mac" titulo="dev@pp — zsh — 80×18">
          <div class="overflow-x-auto p-6 font-mono text-[0.85rem] leading-relaxed sm:p-8">
            <template v-if="ehQuatroZeroQuatro">
              <p class="whitespace-nowrap">
                <UiPrompt />{{ ' ' }}<span class="text-fg">cd {{ caminho }}</span>
              </p>
              <p class="mt-1 whitespace-nowrap text-danger">
                bash: cd: {{ caminho }}: No such file or directory
              </p>

              <p class="mt-8 text-2xl font-extrabold text-accent">erro 404</p>
              <p class="mt-2 text-fg-muted">
                Essa página não existe — tipo aquele projeto que vc jurou que ia
                terminar no fim de semana.
              </p>
            </template>

            <template v-else>
              <p class="whitespace-nowrap">
                <UiPrompt />{{ ' ' }}<span class="text-fg">devpp servir</span>
              </p>
              <p class="mt-1 text-danger">
                panic: {{ error?.statusCode ?? 500 }} — alguma coisa explodiu do nosso lado
              </p>

              <p class="mt-8 text-2xl font-extrabold text-accent">deu ruim</p>
              <p class="mt-2 text-fg-muted">
                O erro é nosso, não seu. Já pode culpar o deploy de sexta.
              </p>
            </template>

            <p class="mt-8">
              <UiPrompt />{{ ' ' }}<NuxtLink
                to="/"
                class="underline underline-offset-4 transition-colors hover:text-primary"
                @click="clearError({ redirect: '/' })"
              >cd ~</NuxtLink>
            </p>
          </div>
        </UiTerminalWindow>

        <p class="mt-6 text-center font-mono text-sm text-fg-dim">
          // ou vai direto pro
          <a href="/#meetups" class="text-primary underline underline-offset-4">próximo encontro</a>
        </p>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>
