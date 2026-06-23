import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

const GAP = 20    // px between cards
const VISIBLE = 3
const ANIM_MS = 900

const placeholderColors = ['#d6cfc7', '#c7c0b8', '#bfb8ae', '#ccc4bb']

export default function ProjectCarousel() {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  const maxIndex = projects.length - VISIBLE

  // One slide step in pure CSS:
  // card width = (100% - (VISIBLE-1)*GAP) / VISIBLE
  // step       = card width + GAP = (100% + GAP) / VISIBLE
  // translateX = -index * step
  const step = `calc((100% + ${GAP}px) / ${VISIBLE})`
  const offset = index === 0 ? '0px' : `calc(-${index} * (100% + ${GAP}px) / ${VISIBLE})`

  return (
    <section style={{ padding: '6rem 0', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '0.75rem' }}>
              Výběr z projektů
            </p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, letterSpacing: '-0.02em', color: '#1c1917', margin: 0 }}>
              Realizované projekty
            </h2>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#a8a29e' }}>
            {index + 1}–{Math.min(index + VISIBLE, projects.length)} / {projects.length}
          </p>
        </div>

        {/* Carousel row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>

          {/* Left arrow */}
          <button
            onClick={() => setIndex(i => Math.max(0, i - 1))}
            disabled={index === 0}
            aria-label="Předchozí projekty"
            style={{
              flexShrink: 0,
              width: '48px', height: '48px',
              borderRadius: '50%',
              border: '1px solid #d6d3d1',
              backgroundColor: '#fff',
              cursor: index === 0 ? 'default' : 'pointer',
              opacity: index === 0 ? 0.25 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'opacity 0.2s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="#1c1917" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Clipping window — overflow:hidden clips cards outside view */}
          <div style={{ flex: 1, overflow: 'hidden' }}>

            {/* Sliding track — width:100% makes translateX(%) resolve against clipping window */}
            <div
              style={{
                display: 'flex',
                width: '100%',
                gap: `${GAP}px`,
                transform: `translateX(${offset})`,
                transition: `transform ${ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              }}
            >
              {projects.map((project, i) => (
                <Link
                  key={project.id}
                  to={`/projekty/${project.id}`}
                  onMouseEnter={() => setHovered(project.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    textDecoration: 'none',
                    // Each card takes exactly 1/VISIBLE of the clipping window
                    flex: `0 0 calc((100% - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE})`,
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: placeholderColors[i % placeholderColors.length],
                    aspectRatio: '4 / 3',
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover', display: 'block',
                      transform: hovered === project.id ? 'scale(1.04)' : 'scale(1)',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(28,25,23,0.72) 0%, rgba(28,25,23,0.1) 55%, transparent 100%)',
                      opacity: hovered === project.id ? 1 : 0.8,
                      transition: 'opacity 0.35s ease',
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
                    <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d6d3d1', marginBottom: '0.3rem' }}>
                      {project.year}
                    </p>
                    <p style={{ fontSize: '0.95rem', fontWeight: 300, color: '#fafaf9', lineHeight: 1.3 }}>
                      {project.title}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#a8a29e', marginTop: '0.2rem' }}>
                      {project.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => setIndex(i => Math.min(maxIndex, i + 1))}
            disabled={index === maxIndex}
            aria-label="Další projekty"
            style={{
              flexShrink: 0,
              width: '48px', height: '48px',
              borderRadius: '50%',
              border: '1px solid #d6d3d1',
              backgroundColor: '#fff',
              cursor: index === maxIndex ? 'default' : 'pointer',
              opacity: index === maxIndex ? 0.25 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'opacity 0.2s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="#1c1917" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

        </div>

        {/* Portfolio button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem' }}>
          <Link
            to="/portfolio"
            style={{
              display: 'inline-block',
              padding: '0.875rem 3rem',
              backgroundColor: '#1c1917',
              color: '#fafaf9',
              textDecoration: 'none',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Portfolio
          </Link>
        </div>

      </div>
    </section>
  )
}
