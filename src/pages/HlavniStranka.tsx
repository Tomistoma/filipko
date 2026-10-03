import { Link } from 'react-router-dom'
import { CDN } from '../config'
import PhotoCarousel from '../components/PhotoCarousel'
import ProjectCarousel from '../components/ProjectCarousel'
import InstagramFeed from '../components/InstagramFeed'

export default function HlavniStranka() {
  return (
    <div>

      {/* ── Hero — white, scrolls naturally ── */}
      {/* ── Full-width photo carousel ── */}
      <PhotoCarousel />

      {/* ── Project carousel ── */}
      <ProjectCarousel />

      {/* ── Split: text + portrait ── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '60vh' }}>
        {/* Left — text, top-aligned with the photo */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '4rem 2rem 4rem 5rem',
            backgroundColor: '#fafaf9',
            gap: '2.5rem',
          }}
        >
          {/* Negative margin cancels the line-height's extra space above the first line */}
          <p style={{ fontSize: '1rem', color: '#57534e', lineHeight: 1.9, textAlign: 'justify', marginTop: '-0.45em' }}>
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
              borderRadius: '9999px',
            }}
          >
            O nás
          </Link>
        </div>

        {/* Right — portrait photo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '4rem 3rem',
            backgroundColor: '#fafaf9',
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
        {/* Shrink-wraps to the heading's width; the button stretches to match */}
        <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', maxWidth: '100%' }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 5vw, 5rem)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            color: '#1c1917',
            lineHeight: 1.1,
            whiteSpace: 'nowrap',
            margin: '0 0 3.5rem',
          }}>
            Máte svou vizi nábytku?
          </h2>
          <Link
            to="/kontakt"
            style={{
              display: 'block',
              // width 0 + minWidth 100%: the button never widens the box, only fills it
              width: 0,
              minWidth: '100%',
              padding: '1.6rem 2rem',
              backgroundColor: '#1c1917',
              color: '#fafaf9',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              borderRadius: '9999px',
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
