<template>
  <section id="vagas" class="border-b border-line-soft bg-bg-deep">
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <UiSectionHead
            comando="grep -r 'vaga' ./prudente"
            titulo="Vagas da região"
            descricao="Uma das coisas mais úteis que a comunidade sempre fez foi circular vaga de TI daqui — que raramente aparece nos grandes portais."
          />
          <AppButton
            href="https://github.com/dev-pp/vagas/issues"
            variante="linha"
            class="mt-8"
          >
            abrir o board de vagas ↗
          </AppButton>
        </div>

        <div class="grid gap-px self-start border border-line bg-line">
          <div class="bg-bg p-6">
            <h3 class="font-mono text-lg font-bold">Tem vaga aberta na sua empresa?</h3>
            <p class="mt-2 text-sm text-fg-muted">
              Abre uma issue no board ou manda pra gente que a gente divulga no meetup,
              nas redes e pra lista — de graça, como sempre foi.
            </p>
            <a
              href="mailto:devpporg@gmail.com?subject=Vaga%20para%20divulgar%20no%20DEV-PP"
              class="mt-3 inline-block font-mono text-sm text-primary underline underline-offset-4"
            >devpporg@gmail.com</a>
          </div>
          <div class="bg-bg p-6">
            <h3 class="font-mono text-lg font-bold">Procurando trampo?</h3>
            <p class="mt-2 text-sm text-fg-muted">
              Acompanha o board — e aparece no meetup. Boa parte das contratações da
              região sai de conversa em pé com café na mão, não de processo seletivo.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
