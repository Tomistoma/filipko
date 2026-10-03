import { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { CDN } from '../config'
import { projects } from '../data/projects'

function GalleryImage({ src, alt, onOpen }: { src: string; alt: string; onOpen: () => void }) {
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
    <div
      onClick={onOpen}
      style={{ position: 'relative', aspectRatio: '4 / 3', backgroundColor: '#f5f5f4', overflow: 'hidden', cursor: 'zoom-in' }}
    >
      <img
        ref={ref}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: visible && loaded ? 1 : 0,
          transition: 'opacity 2s ease',
        }}
      />
    </div>
  )
}

const lightboxButton: React.CSSProperties = {
  position: 'absolute',
  width: '48px', height: '48px',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: 'rgba(250,250,249,0.12)',
  color: '#fafaf9',
  cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}

function Lightbox({ images, index, alt, onClose, onChange }: {
  images: string[]
  index: number
  alt: string
  onClose: () => void
  onChange: (i: number) => void
}) {
  const hasPrev = index > 0
  const hasNext = index < images.length - 1

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onChange(index - 1)
      if (e.key === 'ArrowRight' && hasNext) onChange(index + 1)
    }
    window.addEventListener('keydown', onKey)
    // Stop the page behind from scrolling while the photo is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [index, hasPrev, hasNext, onClose, onChange])

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(12,10,9,0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Larger bottom padding keeps a strip free for the counter below the photo
        padding: '2rem 2rem 4rem',
      }}
    >
      <img
        src={images[index]}
        alt={`${alt} — foto ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
      />

      <button onClick={onClose} aria-label="Zavřít" style={{ ...lightboxButton, top: '1.25rem', right: '1.25rem' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      </button>

      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onChange(index - 1) }}
          aria-label="Předchozí foto"
          style={{ ...lightboxButton, left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onChange(index + 1) }}
          aria-label="Další foto"
          style={{ ...lightboxButton, right: '1.25rem', top: '50%', transform: 'translateY(-50%)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <p style={{ position: 'absolute', bottom: '1.25rem', left: 0, right: 0, textAlign: 'center', fontSize: '0.75rem', letterSpacing: '0.15em', color: '#a8a29e' }}>
        {index + 1} / {images.length}
      </p>
    </div>
  )
}

function getGallery(slug: string, filenames: string[]): string[] {
  return filenames.map((f) => `${CDN}/images/projekty-v2/${slug}/${f}`)
}

export default function ProjektDetail() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === Number(id))
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!project) return <Navigate to="/portfolio" replace />

  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const prev = projects[currentIndex - 1] ?? null
  const next = projects[currentIndex + 1] ?? null
  const gallery = getGallery(project.slug, project.gallery)

  return (
    // Extra bottom space (~2.5 cm) before the footer
    <div style={{ paddingBottom: '6rem' }}>

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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem 2rem' }}>
            {gallery.map((src, i) => (
              <GalleryImage
                key={src}
                src={src}
                alt={`${project.title} — foto ${i + 1}`}
                onOpen={() => setOpenIndex(i)}
              />
            ))}
          </div>
        )}
      </section>

      {openIndex !== null && (
        <Lightbox
          images={gallery}
          index={openIndex}
          alt={project.title}
          onClose={() => setOpenIndex(null)}
          onChange={setOpenIndex}
        />
      )}

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
