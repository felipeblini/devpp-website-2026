<template>
  <section id="parceiros" class="border-b border-line-soft">
    <div class="mx-auto max-w-6xl px-5 py-16">
      <div class="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <UiSectionHead
            comando="cat parceiros.txt"
            titulo="Quer ser um parceiro?"
          />
          <p class="mt-5 max-w-xl text-fg-muted">
            Meetup gratuito ainda tem custo: espaço, cafezinho, projetor, às vezes um
            deslocamento de palestrante. Empresa da região que quiser bancar um pedaço
            disso aparece pra comunidade inteira — e ainda encontra gente boa de perto.
          </p>
          <p class="mt-4 font-mono text-sm text-fg-dim">
            // quem sempre segurou essa onda foi a galera daqui mesmo: coworkings,
            empresas, parceiros locais e a
            <a
              href="https://inovaprudente.com.br/"
              target="_blank"
              rel="noopener"
              class="text-primary underline underline-offset-4"
            >Inova Prudente</a>.
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
