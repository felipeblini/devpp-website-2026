<script setup lang="ts">
import { proximoNumero } from '#shared/meetups'

const vias = [
  {
    cmd: 'palestrante',
    titulo: 'Indica quem você quer ouvir',
    texto: 'Pode ser alguém da região ou um nome de peso do mercado, de qualquer lugar do Brasil. A gente corre atrás do convite.',
  },
  {
    cmd: 'local',
    titulo: 'Arruma onde a gente cabe',
    texto: 'Não somos casados com nenhum endereço: já rolou em universidade, dentro de empresa, coworking e café. Se tem espaço pra umas dezenas de pessoas e um projetor, serve.',
  },
  {
    cmd: 'apoio',
    titulo: 'Banca o café ou manda brinde',
    texto: 'Coffee break e brindes de sorteio no fim do encontro saem de empresas da região. Custa pouco e aparece pra comunidade inteira.',
  },
]
</script>

<template>
  <section id="ajudar" class="border-b border-line-soft">
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <UiSectionHead comando="devpp contribuir">
        <template #titulo>
          Ajude a construir o meetup <span class="text-primary">#{{ proximoNumero }}</span>
        </template>
        <template #descricao>
          Encontro não cai do céu. Ele acontece quando três coisas se juntam:
          <strong class="font-semibold text-fg">gente pra palestrar</strong>,
          <strong class="font-semibold text-fg">um lugar pra receber</strong> e
          <strong class="font-semibold text-fg">alguém que banca o café</strong>.
          Qualquer uma das três já destrava.
        </template>
      </UiSectionHead>

      <div class="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <ol class="min-w-0 lg:col-span-7">
          <li
            v-for="(v, i) in vias"
            :key="v.cmd"
            class="grid grid-cols-[auto_1fr] gap-x-5 border-t border-line-soft py-6 first:border-t-0 first:pt-0"
          >
            <span class="pixel pt-1 text-[0.62rem] text-primary">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <div>
              <p class="font-mono text-sm text-primary">$ {{ v.cmd }}</p>
              <p class="mt-1 font-mono text-lg font-bold">{{ v.titulo }}</p>
              <p class="mt-1 text-fg-muted">{{ v.texto }}</p>
            </div>
          </li>
        </ol>

        <div class="min-w-0 lg:col-span-5">
          <FormAjuda />
        </div>
      </div>
    </div>
  </section>
</template>
