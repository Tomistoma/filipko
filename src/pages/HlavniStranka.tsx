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
      {/* Same outer width as ProjectCarousel, inset by its arrow slots (48px + 1.25rem gap)
          so the text and photo line up with the edges of the project cards */}
      <section
        className="m-stack m-split"
        style={{
          maxWidth: '1520px',
          margin: '0 auto',
          padding: '0 calc(2rem + 48px + 1.25rem)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          minHeight: '60vh',
          backgroundColor: '#fafaf9',
        }}
      >
        {/* Left — text, top-aligned with the photo */}
        <div
          className="m-nopad"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '4rem 0',
            gap: '2.5rem',
          }}
        >
          {/* Negative margin cancels the line-height's extra space above the first line */}
          <p className="m-left" style={{ fontSize: '1rem', color: '#57534e', lineHeight: 1.9, textAlign: 'justify', marginTop: '-0.45em' }}>
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

        {/* Right — portrait photo, flush with the right edge of the last card */}
        <div
          className="m-nopad"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            padding: '4rem 0',
          }}
        >
          {/* Round crop on Filip: a 640px square of the 1333×2000 frame, from (120, 330) */}
          <div
            className="m-portrait"
            style={{
              position: 'relative',
              width: 'min(420px, 100%)',
              aspectRatio: '1',
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            <img
              src={`${CDN}/images/filipo.jpg`}
              alt="Filip Kopáček"
              style={{
                position: 'absolute',
                width: '208.3%',
                left: '-18.75%',
                top: '-51.6%',
                maxWidth: 'none',
                display: 'block',
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Instagram feed ── */}
      <InstagramFeed />

      {/* ── Bottom CTA ── */}
      <section
        className="m-cta"
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
          <h2 className="m-cta-h" style={{
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
            className="m-cta-btn"
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
