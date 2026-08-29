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

// Canal sem link entra como pendente: aparece, mas sem prometer destino.
const canais = dados.canais as Canal[]
</script>

<template>
  <section id="junte-se" class="border-b border-line-soft bg-bg-deep">
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <UiSectionHead comando="devpp join">
        <template #titulo>
          <span class="text-primary glow">Junte-se</span> a nós
        </template>
        <template #descricao>
          Os meetups acontecem qnd dá (os organizadores tbm trabalham rs), mas a
          comunidade não para — e ela vive nesses canais.
        </template>
      </UiSectionHead>

      <ul class="mt-12 grid gap-px border border-line bg-line sm:grid-cols-3">
        <li v-for="c in canais" :key="c.id" class="flex flex-col bg-bg p-7">
          <p class="pixel text-[0.6rem] text-fg-dim">{{ c.id }}</p>
          <h3 class="mt-4 font-mono text-xl font-bold" :class="!c.url && 'text-fg-muted'">
            {{ c.nome }}
          </h3>
          <p class="mt-2 flex-1 text-sm text-fg-muted">{{ c.descricao }}</p>

          <a
            v-if="c.url"
            :href="c.url"
            target="_blank"
            rel="noopener"
            class="mt-6 inline-flex min-h-11 items-center justify-center border border-line px-4 py-3 font-mono text-sm font-bold transition-colors hover:border-primary hover:text-primary"
          >
            {{ c.acao }} ↗
          </a>
          <p
            v-else
            class="mt-6 inline-flex min-h-11 items-center justify-center border border-dashed border-line px-4 py-3 font-mono text-sm text-fg-dim"
          >
            <UiCarregando texto="link em breve" />
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
