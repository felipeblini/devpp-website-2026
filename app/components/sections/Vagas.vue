<template>
  <section id="vagas" class="border-b border-line-soft bg-bg-deep">
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <UiSectionHead comando="grep -r 'vaga' ./prudente-e-regiao" titulo="Procurando trampo?" />

          <div class="mt-5 space-y-4 text-fg-muted">
            <p>
              Uma das coisas mais úteis que a comunidade sempre fez foi divulgar vaga de
              TI daqui e da região.
            </p>
            <p>
              Acompanha o board — e apareça nos meetups. Boa parte das contratações da
              região sai de conversa em pé com café na mão, não de processo seletivo.
            </p>
          </div>

          <AppButton
            href="https://github.com/dev-pp/vagas/issues"
            variante="linha"
            class="mt-8"
          >
            abrir o board de vagas ↗
          </AppButton>
        </div>

        <div class="self-start border border-line p-6">
          <h3 class="font-mono text-lg font-bold">Tem vaga aberta na sua empresa?</h3>
          <p class="mt-2 text-sm text-fg-muted">
Crie uma <a
              href="https://github.com/dev-pp/vagas/issues/new"
              target="_blank"
              rel="noopener"
              class="text-primary underline underline-offset-4"
            >nova issue</a> no nosso board de vagas ou manda pra gente que a gente
            divulga no meetup, nas redes, nos nossos grupos e pra a lista de e-mails —
            de graça, como sempre foi.
          </p>
          <a
            href="mailto:devpporg@gmail.com?subject=Vaga%20para%20divulgar%20no%20DEV-PP"
            class="mt-3 inline-block font-mono text-sm text-primary underline underline-offset-4"
          >devpporg@gmail.com</a>
        </div>
      </div>
    </div>
  </section>
</template>
