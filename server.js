import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { timingSafeEqual } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

const CONTACT_TO_EMAIL = 'info@truhlarstvimzastestim.cz'
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Truhlářstvím za štěstím <onboarding@resend.dev>'

app.use(express.json())
app.use(express.static(join(__dirname, 'dist')))

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

app.post('/api/contact', async (req, res) => {
  const jmeno = req.body?.jmeno?.trim()
  const email = req.body?.email?.trim()
  const predmet = req.body?.predmet?.trim()
  const zprava = req.body?.zprava?.trim()
  const souhlas = req.body?.souhlas

  if (!jmeno || !email || !zprava || !souhlas) {
    return res.status(400).json({ error: 'Chybí povinné údaje.' })
  }

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Zadejte platnou e-mailovou adresu.' })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set')
    return res.status(500).json({ error: 'Odesílání zpráv není momentálně nastaveno.' })
  }

  const submittedAt = new Date().toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1c1917;">
      <div style="background-color: #1c1917; padding: 2rem;">
        <p style="color: #a8a29e; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 0.5rem;">Nová zpráva z webu</p>
        <h1 style="color: #fafaf9; font-size: 22px; font-weight: 300; margin: 0;">Truhlářstvím za štěstím</h1>
      </div>
      <div style="padding: 2rem; background-color: #fafaf9;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e7e5e4; color: #a8a29e; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; width: 140px; vertical-align: top;">Jméno</td>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e7e5e4; font-size: 15px;">${escapeHtml(jmeno)}</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e7e5e4; color: #a8a29e; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Email</td>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e7e5e4; font-size: 15px;"><a href="mailto:${escapeHtml(email)}" style="color: #1c1917;">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e7e5e4; color: #a8a29e; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Předmět</td>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e7e5e4; font-size: 15px;">${predmet ? escapeHtml(predmet) : '—'}</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e7e5e4; color: #a8a29e; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Zpráva</td>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e7e5e4; font-size: 15px; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(zprava)}</td>
          </tr>
        </table>
        <p style="color: #a8a29e; font-size: 12px; margin-top: 1.5rem;">Odesláno ${escapeHtml(submittedAt)} přes kontaktní formulář na webu.</p>
      </div>
    </div>
  `

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        reply_to: email,
        subject: predmet ? `Kontaktní formulář: ${predmet}` : `Kontaktní formulář — nová zpráva od ${jmeno}`,
        html,
      }),
    })

    if (!resendRes.ok) {
      const errBody = await resendRes.text()
      console.error('Resend API error:', resendRes.status, errBody)
      return res.status(502).json({ error: 'Zprávu se nepodařilo odeslat. Zkuste to prosím znovu.' })
    }

    res.json({ ok: true })
  } catch (err) {
    console.error('Failed to send contact email:', err)
    res.status(502).json({ error: 'Zprávu se nepodařilo odeslat. Zkuste to prosím znovu.' })
  }
})

// ── Visit statistics for the /admin dashboard ──
// Visits are counted by GoatCounter; this reads them back through its API so the
// API token stays on the server and the dashboard sits behind our own password.

// Same code as GOATCOUNTER_CODE in src/config.ts
const GOATCOUNTER_API = 'https://truhlarstvi.goatcounter.com/api/v0'
// Trimmed: a stray space pasted into the hosting config would make the password impossible to type
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD?.trim()
const STATS_DAYS = 30
const STATS_CACHE_MS = 60 * 1000

let statsCache = null

function isAdmin(req) {
  const given = Buffer.from(String(req.get('authorization') || '').replace(/^Bearer /, '').trim())
  const expected = Buffer.from(ADMIN_PASSWORD)
  return given.length === expected.length && timingSafeEqual(given, expected)
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// GoatCounter allows only 4 requests per second, so calls are spaced out and retried when refused
async function goatcounter(path, params) {
  for (let attempt = 0; ; attempt++) {
    await sleep(300)
    const res = await fetch(`${GOATCOUNTER_API}${path}?${new URLSearchParams(params)}`, {
      headers: { 'Authorization': `Bearer ${process.env.GOATCOUNTER_API_TOKEN}`, 'Content-Type': 'application/json' },
    })
    if (res.ok) return res.json()
    if (res.status !== 429 || attempt === 3) throw new Error(`GoatCounter ${path} responded ${res.status}: ${await res.text()}`)
    await sleep(1000)
  }
}

// Calendar day in Czech time, as YYYY-MM-DD — the GoatCounter site is set to Europe/Prague
function pragueDay(date) {
  return date.toLocaleDateString('sv-SE', { timeZone: 'Europe/Prague' })
}

async function loadStats() {
  const now = new Date()
  const start = new Date(now.getTime() - (STATS_DAYS - 1) * 24 * 60 * 60 * 1000)
  const range = { start: `${pragueDay(start)}T00:00:00Z`, end: now.toISOString() }

  const month = await goatcounter('/stats/total', range)
  // Counting started in October 2026
  const allTime = await goatcounter('/stats/total', { start: '2026-10-01T00:00:00Z', end: range.end })
  const pages = await goatcounter('/stats/hits', { ...range, limit: 10 })
  const referrers = await goatcounter('/stats/toprefs', { ...range, limit: 10 })
  const devices = await goatcounter('/stats/sizes', range)

  // Days without any visit are missing from the response — fill them in with zero
  const byDay = new Map()
  for (const s of month.stats || []) {
    byDay.set(String(s.day).slice(0, 10), s.daily ?? (s.hourly || []).reduce((sum, n) => sum + n, 0))
  }
  const daily = []
  for (let i = STATS_DAYS - 1; i >= 0; i--) {
    const day = pragueDay(new Date(now.getTime() - i * 24 * 60 * 60 * 1000))
    daily.push({ day, visits: byDay.get(day) || 0 })
  }
  const sum = (days) => daily.slice(-days).reduce((total, d) => total + d.visits, 0)

  return {
    today: sum(1),
    week: sum(7),
    month: sum(STATS_DAYS),
    total: allTime.total || 0,
    daily,
    pages: (pages.hits || []).filter((h) => !h.event).map((h) => ({ name: h.path, visits: h.count })),
    referrers: (referrers.stats || []).map((r) => ({ name: r.name || '', visits: r.count })),
    devices: (devices.stats || []).filter((d) => d.count > 0).map((d) => ({ name: d.id, visits: d.count })),
  }
}

app.get('/api/admin/stats', async (req, res) => {
  if (!ADMIN_PASSWORD || !process.env.GOATCOUNTER_API_TOKEN) {
    return res.status(503).json({ error: 'Administrace není nastavena (chybí ADMIN_PASSWORD nebo GOATCOUNTER_API_TOKEN).' })
  }
  if (!isAdmin(req)) {
    // Slows down password guessing
    await new Promise((resolve) => setTimeout(resolve, 800))
    return res.status(401).json({ error: 'Nesprávné heslo.' })
  }

  try {
    if (!statsCache || Date.now() - statsCache.at > STATS_CACHE_MS) {
      statsCache = { at: Date.now(), data: await loadStats() }
    }
    res.json(statsCache.data)
  } catch (err) {
    console.error('Failed to load stats:', err)
    res.status(502).json({ error: 'Statistiky se nepodařilo načíst.' })
  }
})

// SPA fallback — all unmatched routes serve index.html (app.use works in Express 4 and 5)
app.use((_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT)
