<script setup lang="ts">
/** Cada resposta é uma lista de parágrafos. */
const perguntas: { q: string; a: string[] }[] = [
  {
    q: 'Preciso me inscrever pra ir?',
    a: [
      'Não. É só chegar. Se inscrever só garante a sua vaga caso o local seja muito pequeno e não caiba todo mundo — nesse caso damos preferência pra quem se inscreveu.',
    ],
  },
  {
    q: 'Sou estudante / iniciante. Vou entender alguma coisa?',
    a: [
      'Vai. Metade da plateia sempre foi de estudante e gente em começo de carreira. E não é raro o próprio palestrante ser um estudante que sabe menos que você sobre metade das coisas — a graça é justamente essa.',
      'Se em algum momento você não entender, pergunta — é literalmente o objetivo do encontro.',
    ],
  },
  {
    q: 'Não conheço ninguém. Vou ficar sozinho num canto?',
    a: [
      'E desde quando dev conhece alguém? A proposta dos meetups também é essa: conhecer pessoas.',
      'Todo mundo chega assim na primeira vez. Tem credenciamento e cafezinho antes justamente pra quebrar isso, e é uma sala pequena, não um congresso de mil pessoas.',
    ],
  },
  {
    q: 'Isso é IA ou é de verdade?',
    a: ['Sim.'],
  },
  {
    q: 'Preciso morar em Presidente Prudente?',
    a: [
      'Não. A comunidade é de Prudente e região — sempre veio gente das cidades do entorno. Se você topa a viagem, você é bem-vindo.',
    ],
  },
  {
    q: 'Vou receber spam depois?',
    a: [
      'Não. O e-mail (se vc informar) serve apenas pra avisar o local e horário dos próximos encontros. Nada mais que isso, nunca, jamais repassada pra terceiro, e dá pra sair quando quiser: é só abrir o arquivo .exe que enviamos em anexo.',
    ],
  },
  {
    q: 'E se eu chegar atrasado, não conhecer a stack e não souber o que falar?',
    a: ['Tá fazendo muita pergunta. Cola logo no rolê.'],
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
          <div class="pb-6 pl-8">
            <p v-for="(paragrafo, i) in p.a" :key="i" class="mt-3 text-fg-muted first:mt-0">
              {{ paragrafo }}
            </p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>
