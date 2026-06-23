import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CDN } from '../config'

const items = [
  { id: 'kuchyne',            label: 'Kuchyně',             color: '#ccc0b0', img: `${CDN}/images/vyrobky/kuchyne.jpg` },
  { id: 'skrine',             label: 'Skříně',              color: '#c2b8a8', img: `${CDN}/images/vyrobky/skrine.jpg` },
  { id: 'jidelni-stoly',      label: 'Jídelní stoly',       color: '#d4c8b8', img: `${CDN}/images/vyrobky/jidelni-stoly.jpg` },
  { id: 'televizni-skrinky',  label: 'Skříňky',             color: '#bdb4a8', img: `${CDN}/images/vyrobky/skrinky.jpg` },
  { id: 'komody',             label: 'Komody',              color: '#c8bfb2', img: `${CDN}/images/vyrobky/komody.jpg` },
  { id: 'postele',            label: 'Postele',             color: '#b8b2a8', img: `${CDN}/images/vyrobky/postele.jpg` },
  { id: 'koupelny',           label: 'Koupelny',            color: '#d0c8bc', img: `${CDN}/images/vyrobky/koupelny.jpg` },
  { id: 'knihovny',           label: 'Knihovny',            color: '#c4bab0', img: `${CDN}/images/vyrobky/knihovny.jpg` },
]

export default function CoVyrabime() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div style={{ paddingTop: '72px' }}>

      {/* Page header */}
      <section style={{ padding: '5rem 2rem 4rem', maxWidth: '1280px', margin: '0 auto' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '1.25rem' }}>
          Naše služby
        </p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 200, letterSpacing: '-0.02em', color: '#1c1917', margin: 0, lineHeight: 1.1 }}>
          Co vyrábíme
        </h1>
      </section>

      {/* 2-column full-width grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4px',
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'relative',
              aspectRatio: '4 / 3',
              backgroundColor: item.color,
              overflow: 'hidden',
              cursor: 'default',
            }}
          >
            {/* Placeholder / real image */}
            <img
              src={item.img}
              alt={item.label}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transform: hovered === item.id ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 0.6s ease',
              }}
            />

            {/* Wood grain texture on placeholder */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: `repeating-linear-gradient(87deg, transparent, transparent 60px, rgba(255,255,255,0.05) 60px, rgba(255,255,255,0.05) 61px)`,
            }} />

            {/* Always-visible bottom label */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(28,25,23,0.65) 0%, rgba(28,25,23,0.08) 45%, transparent 100%)',
                transition: 'opacity 0.3s ease',
                opacity: hovered === item.id ? 1 : 0.85,
              }}
            />
            <div style={{ position: 'absolute', bottom: '2rem', left: '2.5rem' }}>
              <h2 style={{
                fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                fontWeight: 300,
                color: '#fafaf9',
                letterSpacing: '-0.01em',
                margin: 0,
              }}>
                {item.label}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section style={{ padding: '7rem 2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '1.5rem' }}>
          Máte zájem?
        </p>
        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 3rem)', fontWeight: 300, letterSpacing: '-0.02em', color: '#1c1917', marginBottom: '2.5rem' }}>
          Vyrobíme vám cokoliv na míru
        </h2>
        <Link
          to="/kontakt"
          style={{
            display: 'inline-block',
            padding: '1rem 3rem',
            backgroundColor: '#1c1917',
            color: '#fafaf9',
            textDecoration: 'none',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Kontaktujte nás
        </Link>
      </section>

    </div>
  )
}
