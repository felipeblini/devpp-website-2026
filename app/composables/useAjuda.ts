/**
 * Liga o link "indicar palestrantes" (seção Palestrar) ao formulário de ajuda:
 * quem chega por ele já encontra a opção marcada.
 */
export function usePreSelecaoAjuda() {
  return useState<string | null>('ajuda-pre-selecao', () => null)
}
