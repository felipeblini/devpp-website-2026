<template>
  <section id="palestrar" class="border-b border-line-soft bg-bg-deep">
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div class="min-w-0 lg:col-span-6">
          <UiSectionHead comando="devpp cfp --open">
            <template #titulo>
              A chamada de palestras está <span class="text-primary glow">sempre aberta</span>
            </template>
          </UiSectionHead>

          <div class="mt-6 space-y-4 text-fg-muted">
            <p>
              A grade tem os dois lados: <strong class="font-semibold text-fg">gente da
                comunidade</strong> e <strong class="font-semibold text-fg">convidados de
                fora</strong> — nomes de destaque do mercado, de qualquer lugar, que a gente
              traz pra agregar conhecimento e abrir networking pra galera daqui.
            </p>
            <p>
              E sempre sobra espaço pra você. Se você resolveu um problema estranho no
              trabalho, montou algo que ninguém pediu, apanhou de um deploy ou estuda um
              assunto que ninguém da região comenta:
              <strong class="font-semibold text-fg">isso já é uma palestra.</strong>
            </p>
            <p>
              Não precisa ser sênior, não precisa ser inédito e não precisa ter slide
              bonito. Nunca palestrou? Melhor ainda — a gente ajuda a lapidar antes.
            </p>
          </div>

          <ul class="mt-7 space-y-2 font-mono text-sm text-fg-muted">
            <li><span class="text-primary">✓</span> 20 a 40 minutos, ou lightning talk de 10</li>
            <li><span class="text-primary">✓</span> qualquer stack, qualquer nível</li>
            <li><span class="text-primary">✓</span> presencial, em Presidente Prudente e região</li>
            <li><span class="text-primary">✓</span> a proposta vale mesmo sem data marcada</li>
          </ul>

          <p class="mt-7 font-mono text-sm text-fg-dim">
            // quer indicar outra pessoa em vez de palestrar?
            <a href="#ajudar" class="text-primary underline underline-offset-4">é logo ali ↓</a>
          </p>
        </div>

        <div class="min-w-0 lg:col-span-6">
          <FormPalestra />
        </div>
      </div>
    </div>
  </section>
</template>
