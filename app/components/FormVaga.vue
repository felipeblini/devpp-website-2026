<script setup lang="ts">
/** Inscrição num encontro marcado. Só faz sentido quando existe data. */
const props = defineProps<{ meetup: string; numero: number }>()

const nome = ref('')
const email = ref('')

const emailOk = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()))
const valido = computed(() => nome.value.trim().length >= 2 && emailOk.value)

const montar = () => ({
  tipo: 'inscricao',
  nome: nome.value.trim(),
  email: email.value.trim(),
  meetup: props.meetup,
  numero: props.numero,
})

function limpar() {
  nome.value = ''
  email.value = ''
}
</script>

<template>
  <FormBase
    arquivo="inscricao.sh"
    :comando="`devpp inscrever --meetup ${meetup}`"
    rotulo="garantir minha vaga"
    titulo-sucesso="Tá valendo. Te vemos lá."
    :valido="valido"
    :montar="montar"
    @enviado="limpar"
  >
    <CampoTexto
      id="vaga-nome"
      v-model="nome"
      rotulo="nome"
      placeholder="como te chamam"
      autocomplete="name"
    />
    <CampoTexto
      id="vaga-email"
      v-model="email"
      rotulo="e-mail"
      type="email"
      autocomplete="email"
      placeholder="voce@dominio.com"
      ajuda="só pra confirmar a vaga e avisar se algo mudar de última hora."
    />

    <template #icone>
      <UiIcone nome="vaga" />
    </template>

    <template #sucesso>
      Sua vaga no <strong class="text-fg">meetup #{{ numero }}</strong> está garantida
      — e você já entrou no sorteio de brindes do fim do encontro. Agora é só não dar
      merge na sexta e aparecer. Se mudar alguma coisa de última hora, a gente te avisa
      por e-mail.
    </template>
    <template #rodape>
      a gente não repassa seu e-mail pra ninguém
    </template>
  </FormBase>
</template>
