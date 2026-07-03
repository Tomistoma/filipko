import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

const CONTACT_TO_EMAIL = 'tomas.libertatem@gmail.com'
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

// SPA fallback — all unmatched routes serve index.html (app.use works in Express 4 and 5)
app.use((_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT)
