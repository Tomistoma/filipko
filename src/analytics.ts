import { GOATCOUNTER_CODE } from './config'

declare global {
  interface Window {
    goatcounter?: { count?: (vars: { path: string }) => void; no_onload?: boolean }
  }
}

let script: Promise<void> | null = null

// Loads GoatCounter's script once. Its automatic count on page load is switched off,
// because this is a single-page app and every route change is counted by hand instead.
function loadScript() {
  if (!script) {
    script = new Promise((resolve, reject) => {
      window.goatcounter = { no_onload: true }
      const el = document.createElement('script')
      el.async = true
      el.src = 'https://gc.zgo.at/count.js'
      el.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`
      el.onload = () => resolve()
      el.onerror = () => reject(new Error('GoatCounter failed to load'))
      document.head.append(el)
    })
  }
  return script
}

export function countPageview(path: string) {
  if (!GOATCOUNTER_CODE) return
  loadScript()
    .then(() => window.goatcounter?.count?.({ path }))
    .catch(() => { /* blocked by an ad blocker — statistics must never break the page */ })
}
