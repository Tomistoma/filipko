import { useState } from 'react'

export default function Kontakt() {
  const [form, setForm] = useState({ jmeno: '', email: '', telefon: '', zprava: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Header */}
      <section
        style={{
          padding: '6rem 2rem 5rem',
          maxWidth: '1280px',
          margin: '0 auto',
          borderBottom: '1px solid #e7e5e4',
        }}
      >
        <p
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#a8a29e',
            marginBottom: '1.5rem',
          }}
        >
          Spojte se s námi
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 200,
            letterSpacing: '-0.02em',
            color: '#1c1917',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Kontakt
        </h1>
      </section>

      <section
        style={{
          padding: '6rem 2rem',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '8rem',
          alignItems: 'start',
        }}
      >
        {/* Contact info */}
        <div>
          <div style={{ marginBottom: '4rem' }}>
            <p
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#a8a29e',
                marginBottom: '1.5rem',
              }}
            >
              Telefon
            </p>
            <a
              href="tel:+420722035525"
              style={{
                fontSize: '1.25rem',
                fontWeight: 300,
                color: '#1c1917',
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              +420 722 035 525
            </a>
          </div>

          <div style={{ marginBottom: '4rem' }}>
            <p
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#a8a29e',
                marginBottom: '1.5rem',
              }}
            >
              Email
            </p>
            <a
              href="mailto:info@truhlarstvimzastestim.cz"
              style={{
                fontSize: '1.25rem',
                fontWeight: 300,
                color: '#1c1917',
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              info@truhlarstvimzastestim.cz
            </a>
          </div>

          <div style={{ marginBottom: '4rem' }}>
            <p
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#a8a29e',
                marginBottom: '1.5rem',
              }}
            >
              Adresa dílny
            </p>
            <p
              style={{
                fontSize: '1rem',
                fontWeight: 300,
                color: '#1c1917',
                lineHeight: 1.7,
              }}
            >
              U Elektry 650/2<br />
              Praha 9<br />
              198 00
            </p>
          </div>

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
              <p
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#a8a29e',
                  marginBottom: '2.5rem',
                }}
              >
                Napište nám
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label
                    htmlFor="jmeno"
                    style={{
                      display: 'block',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#a8a29e',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Jméno *
                  </label>
                  <input
                    id="jmeno"
                    name="jmeno"
                    type="text"
                    required
                    value={form.jmeno}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.875rem 0',
                      border: 'none',
                      borderBottom: '1px solid #d6d3d1',
                      backgroundColor: 'transparent',
                      fontSize: '0.95rem',
                      color: '#1c1917',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: 'block',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#a8a29e',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.875rem 0',
                      border: 'none',
                      borderBottom: '1px solid #d6d3d1',
                      backgroundColor: 'transparent',
                      fontSize: '0.95rem',
                      color: '#1c1917',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="telefon"
                  style={{
                    display: 'block',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#a8a29e',
                    marginBottom: '0.75rem',
                  }}
                >
                  Telefon
                </label>
                <input
                  id="telefon"
                  name="telefon"
                  type="tel"
                  value={form.telefon}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.875rem 0',
                    border: 'none',
                    borderBottom: '1px solid #d6d3d1',
                    backgroundColor: 'transparent',
                    fontSize: '0.95rem',
                    color: '#1c1917',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <label
                  htmlFor="zprava"
                  style={{
                    display: 'block',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#a8a29e',
                    marginBottom: '0.75rem',
                  }}
                >
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
                  style={{
                    width: '100%',
                    padding: '0.875rem 0',
                    border: 'none',
                    borderBottom: '1px solid #d6d3d1',
                    backgroundColor: 'transparent',
                    fontSize: '0.95rem',
                    color: '#1c1917',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: '1rem 3rem',
                  backgroundColor: '#1c1917',
                  color: '#fafaf9',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  transition: 'background-color 0.2s',
                }}
              >
                Odeslat zprávu
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  )
}
