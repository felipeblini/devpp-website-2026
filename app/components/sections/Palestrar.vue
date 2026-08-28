<template>
  <section id="palestrar" class="border-b border-line-soft">
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <div class="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div class="lg:col-span-6">
          <UiSectionHead
            comando="devpp cfp --open"
            titulo="A chamada de palestras está sempre aberta"
          />
          <div class="mt-6 space-y-4 text-fg-muted">
            <p>
              A grade é sempre da comunidade — e sempre tem espaço. Se você resolveu
              um problema estranho no trabalho, montou algo que ninguém pediu, apanhou
              de um deploy ou estuda um assunto que ninguém da região comenta:
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
            <li><span class="text-primary">✓</span> presencial, em Presidente Prudente</li>
          </ul>

          <AppButton href="#inscricao" variante="linha" class="mt-8">
            propor minha palestra →
          </AppButton>
          <p class="mt-3 font-mono text-xs text-fg-dim">
            // é o mesmo formulário: marque “quero palestrar”
          </p>
        </div>

        <div class="min-w-0 lg:col-span-6">
          <UiTerminalWindow titulo="proposta.md">
            <pre class="overflow-x-auto p-6 font-mono text-[0.8rem] leading-relaxed text-fg-muted"><span class="text-fg-dim"># o que a gente precisa saber</span>

<span class="text-primary">titulo</span>:     "Aquilo que quase derrubou a produção"
<span class="text-primary">formato</span>:    talk | lightning | demo | workshop
<span class="text-primary">nivel</span>:      iniciante | intermediario | avancado
<span class="text-primary">resumo</span>:     3 linhas. o que a pessoa leva de novo
             pra casa depois de te ouvir.

<span class="text-fg-dim"># não precisamos de:</span>
<span class="text-fg-dim">- curriculo</span>
<span class="text-fg-dim">- slides prontos</span>
<span class="text-fg-dim">- experiência anterior em palco</span></pre>
          </UiTerminalWindow>
        </div>
      </div>
    </div>
  </section>
</template>
