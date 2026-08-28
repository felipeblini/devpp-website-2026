<script setup lang="ts">
const perguntas = [
  {
    q: 'É pago mesmo? Tem pegadinha?',
    a: 'Não é pago e não tem pegadinha. O DEV-PP é sem fins lucrativos: ninguém ganha dinheiro com isso, não existe ingresso, upsell nem curso no fim. Quando tem patrocínio, ele paga café e espaço — nunca a sua entrada.',
  },
  {
    q: 'Sou estudante / iniciante. Vou entender alguma coisa?',
    a: 'Vai. Metade da plateia sempre foi de estudante e gente em começo de carreira, e as palestras são calibradas pra isso. Se em algum momento você não entender, pergunta — é literalmente o objetivo do encontro.',
  },
  {
    q: 'Não conheço ninguém. Vou ficar sozinho num canto?',
    a: 'Todo mundo chega assim na primeira vez. Tem credenciamento e cafezinho antes justamente pra quebrar isso, e é uma sala pequena, não um congresso de mil pessoas.',
  },
  {
    q: 'Preciso morar em Presidente Prudente?',
    a: 'Não. A comunidade é de Prudente e região — sempre veio gente das cidades do entorno. Se você topa a viagem, você é bem-vindo.',
  },
  {
    q: 'Vou receber spam depois?',
    a: 'Não. O e-mail serve pra avisar de local, horário e dos próximos encontros. Sem venda, sem lista repassada pra terceiro, e dá pra sair quando quiser.',
  },
  {
    q: 'Por que vocês ficaram cinco anos sumidos?',
    a: 'A pandemia parou os encontros presenciais em 2021 e a retomada foi ficando pra depois. Em 2026 a gente decidiu que já deu — e o encontro de 24 de setembro é o recomeço.',
  },
]
</script>

<template>
  <section class="border-b border-line-soft">
    <div class="mx-auto max-w-3xl px-5 py-20 lg:py-24">
      <UiSectionHead comando="devpp faq" titulo="Antes que você pergunte" />

      <div class="mt-10 border-t border-line-soft">
        <details
          v-for="p in perguntas"
          :key="p.q"
          class="group border-b border-line-soft"
        >
          <summary
            class="flex cursor-pointer list-none items-start gap-4 py-5 font-mono text-[1.02rem] font-bold marker:content-none"
          >
            <span class="mt-0.5 text-primary transition-transform group-open:rotate-90">›</span>
            <span>{{ p.q }}</span>
          </summary>
          <p class="pb-6 pl-8 text-fg-muted">{{ p.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
