import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.875rem 0',
  border: 'none',
  borderBottom: '1px solid #d6d3d1',
  backgroundColor: 'transparent',
  fontSize: '0.95rem',
  color: '#1c1917',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.65rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#a8a29e',
  marginBottom: '0.75rem',
}

export default function Kontakt() {
  const [form, setForm] = useState({ jmeno: '', email: '', predmet: '', zprava: '' })
  const [souhlas, setSouhlas] = useState(false)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, souhlas }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Zprávu se nepodařilo odeslat.')
      }

      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Zprávu se nepodařilo odeslat.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ paddingTop: '72px' }}>
      <section
        style={{
          padding: '8rem 2rem',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '6rem',
          alignItems: 'center',
        }}
      >
        {/* Left — simple statement */}
        <div>
          <h1
            style={{
              fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
              fontWeight: 200,
              letterSpacing: '-0.02em',
              color: '#1c1917',
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Těšíme se na vás.
          </h1>
        </div>

        {/* Form */}
        <div>
          {sent ? (
            <div
              style={{
                padding: '4rem',
                border: '1px solid #e7e5e4',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '2rem',
                  height: '1px',
                  backgroundColor: '#1c1917',
                  margin: '0 auto 2rem',
                }}
              />
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 300,
                  color: '#1c1917',
                  marginBottom: '1rem',
                }}
              >
                Zpráva odeslána
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#78716c', lineHeight: 1.7 }}>
                Děkujeme za váš zájem. Ozveme se vám co nejdříve, obvykle do 1–2 pracovních dnů.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="jmeno" style={labelStyle}>
                  Jméno a příjmení *
                </label>
                <input
                  id="jmeno"
                  name="jmeno"
                  type="text"
                  required
                  value={form.jmeno}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="email" style={labelStyle}>
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="predmet" style={labelStyle}>
                  Předmět
                </label>
                <input
                  id="predmet"
                  name="predmet"
                  type="text"
                  value={form.predmet}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label htmlFor="zprava" style={labelStyle}>
                  Zpráva *
                </label>
                <textarea
                  id="zprava"
                  name="zprava"
                  required
                  rows={5}
                  value={form.zprava}
                  onChange={handleChange}
                  placeholder="Popište váš projekt — co hledáte, jaký máte prostor, kdy plánujete realizaci..."
                  style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
                />
              </div>

              <label
                htmlFor="souhlas"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  marginBottom: '2.5rem',
                  cursor: 'pointer',
                }}
              >
                <input
                  id="souhlas"
                  name="souhlas"
                  type="checkbox"
                  required
                  checked={souhlas}
                  onChange={(e) => setSouhlas(e.target.checked)}
                  style={{ marginTop: '0.2rem', accentColor: '#1c1917' }}
                />
                <span style={{ fontSize: '0.8rem', color: '#78716c', lineHeight: 1.6 }}>
                  Souhlasím se zpracováním osobních údajů za účelem vyřízení mého dotazu. *
                </span>
              </label>

              {error && (
                <p style={{ fontSize: '0.8rem', color: '#b91c1c', marginBottom: '1.5rem' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                style={{
                  padding: '1rem 3rem',
                  backgroundColor: '#1c1917',
                  color: '#fafaf9',
                  border: 'none',
                  borderRadius: '9999px',
                  cursor: sending ? 'default' : 'pointer',
                  opacity: sending ? 0.6 : 1,
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  transition: 'background-color 0.2s',
                }}
              >
                {sending ? 'Odesílám…' : 'Odeslat'}
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  )
}
