import { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { CDN } from '../config'
import { projects } from '../data/projects'

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLImageElement>(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.05, rootMargin: '0px 0px -150px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      style={{
        display: 'block',
        width: '100%',
        marginBottom: '6px',
        breakInside: 'avoid',
        opacity: visible && loaded ? 1 : 0,
        transition: 'opacity 2s ease',
      }}
    />
  )
}

function getGallery(projectId: number, filenames: string[]): string[] {
  return filenames.map((f) => `${CDN}/images/projekty/projekt${projectId}/${f}`)
}

export default function ProjektDetail() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === Number(id))

  if (!project) return <Navigate to="/portfolio" replace />

  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const prev = projects[currentIndex - 1] ?? null
  const next = projects[currentIndex + 1] ?? null
  const gallery = getGallery(project.id, project.gallery)

  return (
    <div style={{ paddingTop: '72px' }}>

      {/* Header */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '5rem 2rem 4rem',
          borderBottom: '1px solid #e7e5e4',
        }}
      >
        <Link
          to="/portfolio"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#a8a29e',
            textDecoration: 'none',
            marginBottom: '3rem',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          Zpět na portfolio
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end' }}>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '1.25rem' }}>
              Projekt #{String(project.id).padStart(2, '0')}
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 200,
                letterSpacing: '-0.02em',
                color: '#1c1917',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '4rem', justifyContent: 'flex-end' }}>
            {[
              { label: 'Lokace', value: project.location },
              { label: 'Kategorie', value: project.category },
              { label: 'Rok', value: project.year },
            ].map((item) => (
              <div key={item.label}>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '0.4rem' }}>
                  {item.label}
                </p>
                <p style={{ fontSize: '0.95rem', color: '#1c1917', fontWeight: 300 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>
        {gallery.length === 0 ? (
          <div
            style={{
              height: '400px',
              backgroundColor: '#f5f5f4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a8a29e' }}>
              Fotografie připravujeme
            </p>
          </div>
        ) : (
          <div style={{ columns: '2 500px', columnGap: '6px' }}>
            {gallery.map((src, i) => (
              <GalleryImage
                key={src}
                src={src}
                alt={`${project.title} — foto ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Prev / Next */}
      <div style={{ borderTop: '1px solid #e7e5e4' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          {prev ? (
            <Link
              to={`/projekty/${prev.id}`}
              style={{ padding: '2.5rem 2rem', textDecoration: 'none', borderRight: '1px solid #e7e5e4' }}
            >
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '0.5rem' }}>
                ← Předchozí
              </p>
              <p style={{ fontSize: '1rem', fontWeight: 300, color: '#1c1917' }}>{prev.title}</p>
              <p style={{ fontSize: '0.8rem', color: '#a8a29e', marginTop: '0.2rem' }}>{prev.location}</p>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              to={`/projekty/${next.id}`}
              style={{ padding: '2.5rem 2rem', textDecoration: 'none', textAlign: 'right' }}
            >
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '0.5rem' }}>
                Další →
              </p>
              <p style={{ fontSize: '1rem', fontWeight: 300, color: '#1c1917' }}>{next.title}</p>
              <p style={{ fontSize: '0.8rem', color: '#a8a29e', marginTop: '0.2rem' }}>{next.location}</p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

    </div>
  )
}
