// Mede scrollWidth real via CDP (screenshot não prova scroll lateral).
const [, , base, ...rotas] = process.argv
const larguras = [360, 390, 414, 768]

const alvos = await (await fetch('http://127.0.0.1:9222/json/list')).json()
const alvo = alvos.find(t => t.type === 'page')
const ws = new WebSocket(alvo.webSocketDebuggerUrl)
let id = 0
const pendentes = new Map()
ws.onmessage = (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pendentes.has(m.id)) { pendentes.get(m.id)(m); pendentes.delete(m.id) }
}
await new Promise(r => ws.onopen = r)
const cmd = (method, params = {}) => new Promise((res) => {
  const _id = ++id
  pendentes.set(_id, res)
  ws.send(JSON.stringify({ id: _id, method, params }))
})

const espera = ms => new Promise(r => setTimeout(r, ms))
let falhou = false

for (const rota of rotas) {
  for (const w of larguras) {
    await cmd('Emulation.setDeviceMetricsOverride', {
      width: w, height: 800, deviceScaleFactor: 1, mobile: w < 768,
    })
    await cmd('Page.navigate', { url: base + rota })
    await espera(1400)
    const r = await cmd('Runtime.evaluate', {
      expression: `(() => {
        const d = document.documentElement
        const culpados = [...document.querySelectorAll('body *')]
          .filter(el => el.getBoundingClientRect().right > d.clientWidth + 1)
          .slice(0, 4)
          .map(el => el.tagName.toLowerCase() + '.' + (el.className?.toString?.().slice(0, 60) || ''))
        return JSON.stringify({ scrollWidth: d.scrollWidth, clientWidth: d.clientWidth, culpados })
      })()`,
      returnByValue: true,
    })
    const { scrollWidth, clientWidth, culpados } = JSON.parse(r.result.result.value)
    const ok = scrollWidth <= clientWidth
    if (!ok) falhou = true
    console.log(`${ok ? 'OK  ' : 'VAZA'} ${String(w).padStart(4)}px ${rota || '/'} → scrollWidth=${scrollWidth} clientWidth=${clientWidth}${ok ? '' : ' :: ' + culpados.join(' | ')}`)
  }
}
ws.close()
process.exit(falhou ? 1 : 0)
