<script setup lang="ts">
const passos = [
  {
    cmd: 'inscrever',
    titulo: 'Você se inscreve',
    texto: 'Nome e e-mail. Sem cadastro, sem senha, sem cartão. Leva 15 segundos.',
  },
  {
    cmd: 'aguardar',
    titulo: 'A grade cai no seu e-mail',
    texto: 'Palestras confirmadas e avisos de última hora chegam pra você antes de ir pro Instagram.',
  },
  {
    cmd: 'aparecer',
    titulo: 'Você aparece no dia',
    texto: 'Chega, pega o cafezinho, senta com quem você só conhecia de LinkedIn.',
  },
  {
    cmd: 'repetir',
    titulo: 'E de novo no próximo',
    texto: 'O DEV-PP não é um evento avulso: é encontro atrás de encontro, com a mesma galera crescendo junto.',
  },
]
</script>

<template>
  <section class="border-b border-line-soft bg-bg-deep">
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <UiSectionHead comando="devpp --help" titulo="Como participar">
        <template #descricao>
          Não tem burocracia nenhuma:
          <strong class="font-semibold text-primary">é só chegar</strong>.
          Mas você pode garantir a sua vaga se inscrevendo.
        </template>
      </UiSectionHead>

      <ol class="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(p, i) in passos" :key="p.cmd" class="bg-bg p-7">
          <p class="pixel text-[0.6rem] text-fg-dim">## PASSO {{ String(i + 1).padStart(2, '0') }}</p>
          <p class="mt-4 font-mono text-sm text-primary">$ {{ p.cmd }}</p>
          <h3 class="mt-2 text-xl">{{ p.titulo }}</h3>
          <p class="mt-2 text-sm text-fg-muted">{{ p.texto }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
