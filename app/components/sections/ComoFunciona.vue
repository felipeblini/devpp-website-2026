<script setup lang="ts">
const passos = [
  {
    cmd: 'inscrever',
    titulo: 'Você se inscreve',
    texto: 'Nome e e-mail. Sem cadastro, sem senha, sem cartão. Leva 15 segundos.',
  },
  {
    cmd: 'aguardar',
    titulo: 'A gente confirma os detalhes',
    texto: 'Local, horário e grade caem no seu e-mail assim que fecharem — antes de ir pro Instagram.',
  },
  {
    cmd: 'aparecer',
    titulo: 'Você aparece no dia',
    texto: 'Chega, pega o cafezinho, senta com quem você só conhecia de LinkedIn.',
  },
  {
    cmd: 'repetir',
    titulo: 'E vira rotina',
    texto: 'O objetivo não é um evento: é a comunidade rodando de novo, encontro atrás de encontro.',
  },
]
</script>

<template>
  <section class="border-b border-line-soft bg-bg-deep">
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <UiSectionHead
        comando="man participar"
        titulo="Como participar"
        descricao="Não tem burocracia nenhuma. É de propósito."
      />

      <ol class="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(p, i) in passos" :key="p.cmd" class="bg-bg p-7">
          <p class="pixel text-[0.6rem] text-fg-dim">passo {{ String(i + 1).padStart(2, '0') }}</p>
          <p class="mt-4 font-mono text-sm text-primary">$ {{ p.cmd }}</p>
          <h3 class="mt-2 text-xl">{{ p.titulo }}</h3>
          <p class="mt-2 text-sm text-fg-muted">{{ p.texto }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
