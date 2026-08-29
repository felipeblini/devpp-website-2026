/**
 * Recadinho pra quem abre o DevTools — ou seja, exatamente o nosso público.
 */
export default defineNuxtPlugin(() => {
  const verde = 'color:#7ef0a4;font-family:ui-monospace,SFMono-Regular,Menlo,monospace'
  const claro = 'color:#e8eaed;font-family:ui-monospace,SFMono-Regular,Menlo,monospace'
  const fraco = 'color:#8b9099;font-family:ui-monospace,SFMono-Regular,Menlo,monospace'

  console.log('%cdev@pp:~$ %cwhoami', verde, claro)
  console.log('%cvocê abriu o console. já é um dos nossos.', claro)
  console.log('%cdev@pp:~$ %cdevpp entrar', verde, claro)
  console.log('%c→ comunidade de devs de Presidente Prudente e região', claro)
  console.log('%c→ https://devpp.com.br', claro)
  console.log('%c# chegou até aqui? então vc tem perfil de palestrante: devpp.com.br/#palestrar', fraco)
})
