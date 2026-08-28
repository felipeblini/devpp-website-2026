<script setup lang="ts">
const numeros = [
  { valor: '2019', rotulo: 'primeiro meetup' },
  { valor: '5 anos', rotulo: 'de hiato (2021→2026)' },
  { valor: 'R$ 0', rotulo: 'pra participar, sempre' },
]
</script>

<template>
  <section id="sobre" class="border-b border-line-soft">
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-7">
          <UiSectionHead comando="cat sobre.md" titulo="Uma comunidade, não um evento" />

          <div class="mt-7 space-y-5 text-[1.05rem] text-fg-muted">
            <p>
              O DEV-PP nasceu da vontade de <strong class="font-semibold text-fg">juntar quem
              desenvolve software em Presidente Prudente e região</strong> — trocar
              conhecimento, trocar experiência, fazer networking de verdade e, com isso,
              fortalecer o ecossistema de tecnologia daqui.
            </p>
            <p>
              Na prática são meetups gratuitos: palestras, demos, workshops, grupos de
              estudo e bate-papo. Sempre com uma confraternização no fim, porque metade
              das boas ideias sai depois da última palestra.
            </p>
            <p>
              Não tem ingresso, não tem venda, não tem pegadinha. É estudante, é júnior,
              é sênior, é quem trabalha com produto, design ou infra — todo mundo que
              tem interesse na área cabe aqui.
            </p>
          </div>

          <p class="mt-7 font-mono text-sm text-fg-dim">
            Todo mundo que participa — organizador, palestrante, apoiador ou visitante —
            segue o nosso
            <NuxtLink to="/codigo-de-conduta" class="text-primary underline underline-offset-4">
              código de conduta</NuxtLink>.
          </p>
        </div>

        <div class="lg:col-span-5">
          <dl class="grid gap-px border border-line bg-line">
            <div v-for="n in numeros" :key="n.rotulo" class="bg-bg p-6">
              <dt class="font-mono text-3xl font-extrabold text-primary">{{ n.valor }}</dt>
              <dd class="mt-1 font-mono text-sm text-fg-muted">{{ n.rotulo }}</dd>
            </div>
          </dl>

          <div class="mt-8 border-l-2 border-primary pl-5">
            <p class="text-fg-muted">
              “Se você desenvolve, quer aprender junto ou só tem interesse na área e quer
              ajudar a construir uma comunidade forte na nossa cidade — vem.”
            </p>
            <p class="mt-3 font-mono text-xs text-fg-dim">// do site original, 2019</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
