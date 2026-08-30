<script setup lang="ts">
/** Proposta de palestra. Existe sempre — independe de ter encontro marcado. */
const nome = ref('')
const email = ref('')
const titulo = ref('')
const formato = ref('talk (20–40 min)')
const resumo = ref('')

const formatos = ['talk (20–40 min)', 'lightning talk (10 min)', 'demo', 'workshop', 'ainda não sei']

const emailOk = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()))
const valido = computed(
  () => nome.value.trim().length >= 2 && emailOk.value && titulo.value.trim().length >= 3,
)

const montar = () => ({
  tipo: 'palestra',
  nome: nome.value.trim(),
  email: email.value.trim(),
  titulo: titulo.value.trim(),
  formato: formato.value,
  resumo: resumo.value.trim(),
})

function limpar() {
  nome.value = ''
  email.value = ''
  titulo.value = ''
  resumo.value = ''
  formato.value = formatos[0]!
}
</script>

<template>
  <FormBase
    arquivo="call4papers.sh"
    comando="devpp palestrar --propor"
    rotulo="enviar minha proposta"
    titulo-sucesso="Proposta recebida."
    :valido="valido"
    :montar="montar"
    @enviado="limpar"
  >
    <CampoTexto
      id="pal-nome"
      v-model="nome"
      rotulo="nome"
      placeholder="como te chamam"
      autocomplete="name"
    />
    <CampoTexto
      id="pal-email"
      v-model="email"
      rotulo="e-mail"
      type="email"
      autocomplete="email"
      placeholder="voce@dominio.com"
    />
    <CampoTexto
      id="pal-titulo"
      v-model="titulo"
      rotulo="título da palestra"
      placeholder="Aquilo que quase derrubou a produção"
    />

    <div>
      <label for="pal-formato" class="block font-mono text-xs text-fg-muted">formato</label>
      <select
        id="pal-formato"
        v-model="formato"
        class="mt-1.5 w-full border border-line bg-bg px-4 py-3 font-mono text-sm text-fg focus:border-primary focus:outline-none"
      >
        <option v-for="f in formatos" :key="f" :value="f">{{ f }}</option>
      </select>
    </div>

    <CampoTexto
      id="pal-resumo"
      v-model="resumo"
      rotulo="resumo (opcional)"
      :linhas="3"
      placeholder="2 ou 3 linhas: o que a pessoa leva de novo pra casa depois de te ouvir."
      ajuda="não precisa estar pronto — a gente ajuda a lapidar."
    />

    <template #icone>
      <UiIcone nome="microfone" />
    </template>

    <template #sucesso>
      Prometemos ler inteira — diferente daquele PR de 400 linhas. A gente responde
      por e-mail, inclusive quando a resposta é “vamos encaixar no próximo”. Se for
      a sua primeira palestra, avisa: a gente ensaia junto.
    </template>
  </FormBase>
</template>
