import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

const placeholderColors = ['#d6cfc7', '#c7c0b8', '#bfb8ae', '#ccc4bb', '#b8b0a6', '#c2bbb2']

export default function Portfolio() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Header */}
      <section style={{ padding: '6rem 2rem 4rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '2rem',
            borderBottom: '1px solid #e7e5e4',
            paddingBottom: '3rem',
          }}
        >
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '1.5rem' }}>
              Realizované projekty
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 200, letterSpacing: '-0.02em', color: '#1c1917', margin: 0, lineHeight: 1.1 }}>
              Portfolio
            </h1>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#a8a29e' }}>{projects.length} projektů</p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '0 2rem 8rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ columns: '3 300px', columnGap: '1rem' }}>
          {projects.map((project, i) => (
            <Link
              key={project.id}
              to={`/projekty/${project.id}`}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'block',
                textDecoration: 'none',
                position: 'relative',
                backgroundColor: placeholderColors[i % placeholderColors.length],
                marginBottom: '1rem',
                breakInside: 'avoid',
                height: i % 3 === 0 ? '480px' : '320px',
                overflow: 'hidden',
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transform: hovered === project.id ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 0.6s ease',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(28,25,23,0.75) 0%, rgba(28,25,23,0.1) 60%, transparent 100%)',
                  opacity: hovered === project.id ? 1 : 0.4,
                  transition: 'opacity 0.35s ease',
                }}
              />

              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d6d3d1', marginBottom: '0.25rem' }}>
                  {project.category} · {project.year}
                </p>
                <p style={{ fontSize: '0.95rem', color: '#fafaf9', fontWeight: 300, letterSpacing: '0.01em' }}>
                  {project.title}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#a8a29e', marginTop: '0.15rem' }}>
                  {project.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
