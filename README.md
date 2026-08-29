# devpp.com.br — site da comunidade

Site novo do **DEV-PP**, a comunidade de desenvolvedores de Presidente Prudente e
região. Substitui o site antigo (Vue 2 + webpack, parado desde 2023, dependia da API
do Meetup.com que não existe mais).

**Stack:** Nuxt 4 · Vue 3 · Tailwind v4 (plugin do Vite) · @nuxt/fonts · @nuxt/image.
Sem biblioteca de componentes — o visual é "terminal fósforo" e os componentes são
próprios, o que deixa o bundle pequeno e o estilo consistente.

## Rodar

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # gera .output (páginas pré-renderizadas + API)
node .output/server/index.mjs
```

## Páginas

| rota | o que é |
|---|---|
| `/` | one-page: herói, próximo meetup, sobre, como participar, palestrar, vagas, FAQ, inscrição, parceiros |
| `/meetup/2026-09-24` | página completa do encontro + formulário |
| `/codigo-de-conduta` | código de conduta da comunidade |

As três são **pré-renderizadas** (HTML estático). A rota `/api/inscricao` roda no
servidor — por isso use `pnpm build`, **não** `nuxt generate`, senão o formulário fica
sem back-end.

## Mudar os dados do encontro

Fonte única: [`content/meetups.json`](content/meetups.json). Dá pra editar **direto pela
interface do GitHub** — cada commit publica o site.

- `status: "confirmado"` → o encontro aparece no site com data, local e agenda.
- Qualquer outro status (ou nenhum encontro futuro) → o site entra em **modo
  `loading...`**: o badge vira `meetup #N loading...`, a seção do encontro convida a
  ajudar a marcar o próximo e **a seção de inscrição some** (não existe vaga sem data).
- O número seguinte é calculado sozinho: `maior numero + 1`.
- Campos `null` (`horario`, `local`, `mapa`) aparecem como "a definir".
- `palestrantes: []` mostra o aviso de grade em confirmação; preencher gera a lista.

Como as páginas são pré-renderizadas, **editar o JSON exige um novo deploy** (o commit
já dispara). Em desenvolvimento, reinicie o `pnpm dev` — o Vite não invalida o import
do JSON sozinho.

Trocar por um banco depois é barato: só `shared/meetups.ts` lê o arquivo.

## Formulários

São **três**, todos indo pro mesmo endpoint (`POST /api/mensagem`) e virando e-mail
para `devpporg@gmail.com`. Sem banco: a lista vive na caixa de entrada.

| formulário | quando aparece | pra quê |
|---|---|---|
| `FormVaga` | **só com encontro marcado** | inscrição no meetup |
| `FormPalestra` | **sempre** | proposta de palestra (a chamada não depende de data) |
| `FormAjuda` | **sempre** | indicar palestrante, oferecer local, apoiar com café/brindes |

Copie `.env.example` para `.env` e escolha **um** dos caminhos:

- **Resend** (`NUXT_RESEND_API_KEY`) — 3.000 e-mails/mês de graça; com o domínio
  `devpp.com.br` verificado, o remetente pode ser `contato@devpp.com.br`.
- **SMTP do Gmail** (`NUXT_SMTP_*`) — usa a própria conta `devpporg@gmail.com` com uma
  [senha de app](https://myaccount.google.com/apppasswords) (exige 2FA ligado).

Sem nenhuma das duas configuradas, o endpoint **recusa com uma mensagem clara** em vez
de engolir a inscrição em silêncio; a pessoa vê o e-mail de contato na tela.

Proteções: honeypot, validação no servidor e limite de 5 envios por IP a cada 10 min.

## Checar scroll lateral no mobile

Screenshot não prova ausência de scroll lateral — o script mede `scrollWidth` de
verdade, em várias larguras:

```bash
# 1) suba o site (pnpm dev ou o build)
# 2) suba um Edge/Chrome com depuração remota
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" \
  --headless=new --remote-debugging-port=9222 --user-data-dir=%TEMP%\edge-devpp about:blank

# 3) meça
node scripts/check-overflow.mjs http://localhost:3000 / /meetup/2026-09-24 /codigo-de-conduta
```

Sai `OK` ou `VAZA` por rota/largura, com os elementos culpados.

## Deploy

Qualquer host com Node (Vercel, Netlify, Cloudflare). O domínio `devpp.com.br` está no
**Registro.br** — apontar o DNS depois que o deploy estiver de pé.
