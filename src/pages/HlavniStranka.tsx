import { Link } from 'react-router-dom'
import { CDN } from '../config'
import PhotoCarousel from '../components/PhotoCarousel'
import ProjectCarousel from '../components/ProjectCarousel'
import InstagramFeed from '../components/InstagramFeed'

export default function HlavniStranka() {
  return (
    <div style={{ paddingTop: '72px' }}>

      {/* ── Hero — white, scrolls naturally ── */}
      {/* ── Full-width photo carousel ── */}
      <PhotoCarousel />

      {/* ── Project carousel ── */}
      <ProjectCarousel />

      {/* ── Split: text + portrait ── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '60vh' }}>
        {/* Left — text, right-aligned toward the image */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            padding: '6rem 2rem 6rem 5rem',
            backgroundColor: '#fafaf9',
            gap: '2.5rem',
          }}
        >
          <p style={{ fontSize: '1rem', color: '#57534e', lineHeight: 1.9, textAlign: 'right' }}>
            Jmenuji se Filip Kopáček a Truhlářstvím za štěstím jsem v myšlenkách začal tvořit už v roce 2021. V té době jsem měl za sebou dva roky v truhlářské dílně, kde jsem se řemeslu začal učit od píky. Ale pojďme úplně na začátek.
          </p>
          <Link
            to="/o-nas"
            style={{
              display: 'inline-block',
              padding: '0.875rem 2.5rem',
              backgroundColor: '#1c1917',
              color: '#fafaf9',
              textDecoration: 'none',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            O nás
          </Link>
        </div>

        {/* Right — portrait photo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 3rem',
            backgroundColor: '#f5f5f4',
          }}
        >
          <img
            src={`${CDN}/images/poetrait.jpg`}
            alt="Filip Kopáček"
            style={{
              maxHeight: '520px',
              width: 'auto',
              maxWidth: '100%',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </div>
      </section>

      {/* ── Instagram feed ── */}
      <InstagramFeed />

      {/* ── Bottom CTA ── */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#fafaf9',
          padding: '10rem 2rem',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative' }}>
          <p style={{
            fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#a8a29e', marginBottom: '2rem',
          }}>
            Začněme spolupracovat
          </p>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            color: '#1c1917',
            lineHeight: 1.1,
            marginBottom: '3.5rem',
            maxWidth: '800px',
            margin: '0 auto 3.5rem',
          }}>
            Máte svou vizi<br />nábytku?
          </h2>
          <Link
            to="/kontakt"
            style={{
              display: 'inline-block',
              padding: '1.1rem 3.5rem',
              backgroundColor: '#1c1917',
              color: '#fafaf9',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              transition: 'background-color 0.2s',
            }}
          >
            Pojďme ji společně zrealizovat!
          </Link>
        </div>
      </section>

    </div>
  )
}
