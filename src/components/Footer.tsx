import { Link } from 'react-router-dom'
import { CDN } from '../config'

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/truhlarstvim_za_stestim/', logo: `${CDN}/images/logo.jpg` },
]

const services = [
  'Kuchyně a jídelny na míru',
  'Vestavné skříně a úložné systémy',
  'Ložnice, knihovny',
  'Koupelnový nábytek',
  'Kompletní realizace interiérů',
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#fafaf9', marginTop: 0 }}>

      {/* ── Three columns ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 2rem 4rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }}>

        {/* O nás */}
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, color: '#a8a29e', marginBottom: '1.25rem' }}>
            O nás
          </p>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: '#1c1917', marginBottom: '0.4rem' }}>
            Truhlářstvím za štěstím
          </p>
          <p style={{ fontSize: '0.875rem', color: '#57534e', lineHeight: 1.75, maxWidth: '280px' }}>
            Truhlářská dílna se sídlem v Praze která se zaměřuje na zakázkovou výrobu nábytku na míru nejen v Praze, ale i v širokém okolí.
          </p>
        </div>

        {/* Kontakt */}
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, color: '#a8a29e', marginBottom: '1.25rem' }}>
            Kontakt
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#a8a29e', minWidth: '52px' }}>E-mail</span>
              <a href="mailto:info@truhlarstvimzastestim.cz" style={{ fontSize: '0.875rem', color: '#57534e', textDecoration: 'none' }}>
                info@truhlarstvimzastestim.cz
              </a>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#a8a29e', minWidth: '52px' }}>Telefon</span>
              <a href="tel:+420722035525" style={{ fontSize: '0.875rem', color: '#57534e', textDecoration: 'none' }}>
                +420 722 035 525
              </a>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#a8a29e', minWidth: '52px' }}>Adresa</span>
              <span style={{ fontSize: '0.875rem', color: '#57534e' }}>U Elektry 650/2, 198 00, Praha 9</span>
            </div>
          </div>

          <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '0.75rem' }}>
            Sociální sítě
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.25rem' }}>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                <img
                  src={s.logo}
                  alt={s.label}
                  style={{ height: '200px', width: '200px', display: 'block', borderRadius: '50%', objectFit: 'cover', marginTop: '30px' }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Služby */}
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, color: '#a8a29e', marginBottom: '1.25rem' }}>
            Služby
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {services.map((s) => (
              <Link
                key={s}
                to="/co-vyrabime"
                style={{ fontSize: '0.875rem', color: '#a8a29e', textDecoration: 'none' }}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* ── Copyright bar ── */}
      <div
        style={{
          borderTop: '1px solid #e7e5e4',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          maxWidth: '100%',
        }}
      >
        <p style={{ fontSize: '0.72rem', color: '#a8a29e' }}>
          © {new Date().getFullYear()} Filip Kopáček — Truhlářstvím za štěstím. Všechna práva vyhrazena.
        </p>
        <p style={{ fontSize: '0.72rem', color: '#a8a29e' }}>
          U Elektry 650/2, 198 00, Praha 9
        </p>
      </div>

    </footer>
  )
}
