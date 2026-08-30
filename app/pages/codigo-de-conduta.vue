<script setup lang="ts">
const { public: { siteUrl } } = useRuntimeConfig()

useSeoMeta({
  title: 'Código de conduta — DEV-PP',
  description:
    'Todos os encontros do DEV-PP são dedicados a oferecer uma experiência livre de assédio para todo mundo. Leia o código de conduta da comunidade.',
  ogUrl: `${siteUrl}/codigo-de-conduta`,
  ogLocale: 'pt_BR',
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/codigo-de-conduta` }] })
</script>

<template>
  <article class="border-b border-line-soft">
    <div class="mx-auto max-w-3xl px-5 py-16 lg:py-20">
      <p class="font-mono text-sm">
        <UiPrompt />{{ ' ' }}<NuxtLink
          to="/"
          class="text-fg-muted underline underline-offset-4 transition-colors hover:text-primary"
        >cd ..</NuxtLink>
      </p>

      <p class="mt-8 font-mono text-[0.72rem] text-fg-muted">
        <UiPrompt />{{ ' ' }}cat CODIGO-DE-CONDUTA.md
      </p>
      <h1 class="mt-4 text-4xl">Código de conduta</h1>

      <div class="mt-8 space-y-5 text-fg-muted">
        <p>
          Todos os participantes, palestrantes, apoiadores e voluntários dos encontros
          precisam concordar com este código de conduta. Os organizadores vão reforçar
          que ele seja seguido durante todos os eventos, e esperamos a cooperação de
          todo mundo pra garantir um ambiente seguro.
        </p>

        <h2 class="pt-6 text-2xl text-fg">Versão rápida</h2>
        <p>
          Todos os encontros do DEV-PP são dedicados a oferecer uma experiência
          <strong class="font-semibold text-fg">livre de assédio</strong> para qualquer
          pessoa, independentemente de sexo, identidade e expressão de gênero, idade,
          orientação sexual, deficiência, aparência física, tamanho corporal, cor de
          pele, etnia, religião (ou falta dela) ou escolha de tecnologia.
          <strong class="font-semibold text-fg">Não toleramos assédio sob nenhuma forma.</strong>
        </p>
        <p>
          Linguagem e imagens sexuais não são apropriadas em nenhum espaço do evento —
          o que inclui palestras, workshops, confraternizações e as nossas redes sociais.
        </p>
        <p>
          Participantes, voluntários, palestrantes e apoiadores não devem mexer em
          equipamentos, entrar em salas fechadas, alterar a configuração de palco ou
          assentos, nem usar o microfone sem autorização da organização.
        </p>
        <p>
          Quem violar estas regras pode ser advertido ou retirado do evento e impedido
          de participar dos próximos, a critério dos organizadores.
        </p>

        <h2 class="pt-6 text-2xl text-fg">Versão detalhada</h2>
        <p>
          Assédio inclui comentários verbais ofensivos relacionados a gênero,
          identidade e expressão de gênero, idade, orientação sexual, deficiência,
          aparência física, tamanho corporal, cor de pele, etnia, religião ou escolha
          de tecnologia; imagens sexuais em espaços públicos; intimidação deliberada;
          perseguição; <em>stalking</em>; fotografia ou filmagem constrangedora;
          contato físico inadequado e atenção sexual indesejada.
        </p>
        <p>
          Quem receber um pedido para interromper qualquer comportamento de assédio
          deve fazê-lo imediatamente. Se alguém insistir, a organização pode tomar as
          medidas que julgar necessárias, incluindo advertir e retirar a pessoa do
          evento.
        </p>
        <p>
          Se você for assediado, perceber alguém sendo assediado ou tiver qualquer
          dúvida, <strong class="font-semibold text-fg">procure um organizador na
            hora</strong>. Não tome atitude por conta própria: relate de forma discreta,
          pra manter a segurança e o sigilo de todo mundo.
        </p>
        <p>
          Qualquer patrimônio do local — computadores, mesas, cadeiras, microfones,
          cozinha e utensílios — só deve ser manuseado com autorização da organização;
          danos podem ser cobrados. Encontrou objeto perdido? Avise a organização
          imediatamente pra anúncio.
        </p>
        <p>
          A equipe organizadora está disponível em todos os eventos pra ajudar no que
          for preciso. A gente valoriza a sua participação e quer que você aproveite ao
          máximo, se sinta à vontade, seguro e — acima de tudo — respeitado.
        </p>
        <p>
          Estas regras valem durante os encontros e também nos eventos sociais
          relacionados, como <em>after-parties</em>, happy hours ou jantares.
        </p>

        <div class="mt-10 border border-line p-6">
          <p class="font-mono text-sm text-fg">Precisa falar com a organização?</p>
          <a
            href="mailto:devpporg@gmail.com"
            class="mt-2 inline-block font-mono text-primary underline underline-offset-4"
          >devpporg@gmail.com</a>
        </div>

        <p class="pt-4 font-mono text-xs text-fg-dim">
          Traduzido e adaptado de
          <a href="http://confcodeofconduct.com/" target="_blank" rel="noopener" class="underline">confcodeofconduct.com</a>.
          Licenciado sob
          <a href="http://creativecommons.org/licenses/by/3.0/deed.en_US" target="_blank" rel="noopener" class="underline">Creative Commons Attribution 3.0</a>.
        </p>
      </div>
    </div>
  </article>
</template>
