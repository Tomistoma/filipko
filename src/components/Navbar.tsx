import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Hlavní stránka' },
  { to: '/o-nas', label: 'O nás' },
  { to: '/co-vyrabime', label: 'Co vyrábíme' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/kontakt', label: 'Kontakt' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: scrolled ? 'rgba(250,250,249,0.97)' : 'transparent',
          borderBottom: scrolled ? '1px solid #e7e5e4' : '1px solid transparent',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 2rem',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: '#1c1917',
              letterSpacing: '0.15em',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span style={{ fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.08em', color: '#78716c', textTransform: 'none' }}>Filip Kopáček</span>
              <span>Truhlářstvím za štěstím</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  color: isActive ? '#1c1917' : '#78716c',
                  borderBottom: isActive ? '1px solid #1c1917' : '1px solid transparent',
                  paddingBottom: '2px',
                  transition: 'color 0.2s',
                })}
                className="hidden md:block"
              >
                {l.label}
              </NavLink>
            ))}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
              aria-label="Menu"
            >
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1px',
                  backgroundColor: '#1c1917',
                  transition: 'transform 0.2s',
                  transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1px',
                  backgroundColor: '#1c1917',
                  opacity: menuOpen ? 0 : 1,
                  transition: 'opacity 0.2s',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1px',
                  backgroundColor: '#1c1917',
                  transition: 'transform 0.2s',
                  transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            backgroundColor: '#fafaf9',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
          }}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                textDecoration: 'none',
                fontSize: '1.5rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 300,
                color: isActive ? '#1c1917' : '#a8a29e',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  )
}
