import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CDN } from '../config'

// Photos live in S3 under images/vyrobky/new/ (originals: public/images/vyrobky/new/)
const items = [
  { id: 'kuchyne',           label: 'Kuchyně',           color: '#ccc0b0', img: `${CDN}/images/vyrobky/new/kuchyne.jpg` },
  { id: 'skrine',            label: 'Skříně',            color: '#c2b8a8', img: `${CDN}/images/vyrobky/new/skrine.jpg` },
  { id: 'posuvne-skrine',    label: 'Posuvné skříně',    color: '#d4c8b8', img: `${CDN}/images/vyrobky/new/posuvne-skrine.jpg` },
  { id: 'obyvaci-steny',     label: 'Obývací stěny',     color: '#bdb4a8', img: `${CDN}/images/vyrobky/new/obyvaci-steny.jpg` },
  { id: 'televizni-steny',   label: 'Televizní stěny',   color: '#c8bfb2', img: `${CDN}/images/vyrobky/new/televizni-steny.jpg` },
  { id: 'knihovny',          label: 'Knihovny',          color: '#c4bab0', img: `${CDN}/images/vyrobky/new/knihovny.jpg` },
  { id: 'jidelni-stoly',     label: 'Jídelní stoly',     color: '#d0c8bc', img: `${CDN}/images/vyrobky/new/jidelni-stoly.jpg` },
  { id: 'postele',           label: 'Postele',           color: '#b8b2a8', img: `${CDN}/images/vyrobky/new/postele.jpg` },
  { id: 'sedaky',            label: 'Sedáky',            color: '#ccc0b0', img: `${CDN}/images/vyrobky/new/sedaky.jpg` },
  { id: 'pracovni-prostory', label: 'Pracovní prostory', color: '#c2b8a8', img: `${CDN}/images/vyrobky/new/pracovni-prostory.jpg` },
]

export default function CoVyrabime() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div>

      {/* 2-column grid, inset from the viewport edges */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem 2rem',
        }}
      >
        {items.map((item) => (
          <div key={item.id}>
            <div
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                aspectRatio: '4 / 3',
                backgroundColor: item.color,
                overflow: 'hidden',
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
            </div>

            <p style={{
              fontSize: '1.1rem',
              fontWeight: 400,
              color: '#1c1917',
              letterSpacing: '-0.01em',
              margin: '1rem 0 0',
            }}>
              {item.label}
            </p>
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
            padding: '1rem 4.5rem',
            backgroundColor: '#1c1917',
            color: '#fafaf9',
            textDecoration: 'none',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 500,
            borderRadius: '9999px',
          }}
        >
          Kontaktujte nás
        </Link>
      </section>

    </div>
  )
}
