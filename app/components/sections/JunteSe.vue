<script setup lang="ts">
import dados from '~~/content/comunidade.json'

interface Canal {
  id: string
  nome: string
  descricao: string
  acao: string
  url: string | null
  pendente: string | null
}

// Canal sem link ainda não entra no site — melhor faltar do que levar a lugar nenhum.
const canais = (dados.canais as Canal[]).filter(c => c.url)

// A grade acompanha a quantidade de canais — senão sobra célula vazia.
const colunas = computed(() =>
  canais.length >= 3 ? 'sm:grid-cols-3' : canais.length === 2 ? 'sm:grid-cols-2' : '',
)
</script>

<template>
  <section id="junte-se" class="border-b border-line-soft bg-bg-deep">
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <UiSectionHead comando="devpp join">
        <template #titulo>
          <span class="text-primary glow">Junte-se</span> a nós
        </template>
        <template #descricao>
          O encontro é uma noite por mês. A comunidade é o ano inteiro — e ela vive
          nesses canais.
        </template>
      </UiSectionHead>

      <ul class="mt-12 grid gap-px border border-line bg-line" :class="colunas">
        <li v-for="c in canais" :key="c.id" class="flex flex-col bg-bg p-7">
          <p class="pixel text-[0.6rem] text-fg-dim">{{ c.id }}</p>
          <h3 class="mt-4 font-mono text-xl font-bold">{{ c.nome }}</h3>
          <p class="mt-2 flex-1 text-sm text-fg-muted">{{ c.descricao }}</p>
          <a
            :href="c.url!"
            target="_blank"
            rel="noopener"
            class="mt-6 inline-flex min-h-11 items-center justify-center border border-line px-4 py-3 font-mono text-sm font-bold transition-colors hover:border-primary hover:text-primary"
          >
            {{ c.acao }} ↗
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
