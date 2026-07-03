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

  const offset = index === 0 ? '0px' : `calc(-${index} * (100% + ${GAP}px) / ${VISIBLE})`

  return (
    <section style={{ padding: '6rem 0', backgroundColor: '#fafaf9' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>

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
              border: 'none',
              backgroundColor: '#1c1917',
              cursor: index === 0 ? 'default' : 'pointer',
              opacity: index === 0 ? 0.25 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'opacity 0.2s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="#fafaf9" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
                  }}
                >
                  <div
                    style={{
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
                  </div>
                  <div style={{ marginTop: '0.9rem' }}>
                    <p style={{ fontSize: '0.75rem', color: '#a8a29e' }}>
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
              border: 'none',
              backgroundColor: '#1c1917',
              cursor: index === maxIndex ? 'default' : 'pointer',
              opacity: index === maxIndex ? 0.25 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'opacity 0.2s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="#fafaf9" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
              borderRadius: '9999px',
            }}
          >
            Portfolio
          </Link>
        </div>

      </div>
    </section>
  )
}
