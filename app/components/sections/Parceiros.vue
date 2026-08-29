<template>
  <section id="parceiros" class="border-b border-line-soft">
    <div class="mx-auto max-w-6xl px-5 py-16">
      <div class="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <UiSectionHead comando="cat parceiros.txt">
            <template #titulo>
              Quer ser um <span class="text-primary glow">parceiro</span>?
            </template>
          </UiSectionHead>
          <p class="mt-5 max-w-xl text-fg-muted">
            Os meetups são gratuitos, e isso tem custo: espaço, cafezinho, cerveja,
            projetor, às vezes um deslocamento e hospedagem de palestrante… Empresas da
            região que quiserem bancar um pedaço disso serão muito bem-vindas — e em
            troca ganham um enorme agradecimento no fim do meetup, a marca aparece pra
            comunidade inteira, vira referência para os devs e ainda encontra gente boa
            de perto.
          </p>
          <p class="mt-4 font-mono text-sm text-fg-dim">
            // quem sempre segurou essa onda foi a galera daqui mesmo: coworkings,
            empresas, investimento próprio e parceiros locais.
          </p>
        </div>
        <div class="lg:col-span-5">
          <div class="border border-line p-6">
            <p class="font-mono text-sm text-fg-muted">falar com a organização</p>
            <a
              href="mailto:devpporg@gmail.com?subject=Quero%20apoiar%20o%20DEV-PP"
              class="mt-2 block font-mono text-lg font-bold text-primary underline underline-offset-4 break-all"
            >devpporg@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
