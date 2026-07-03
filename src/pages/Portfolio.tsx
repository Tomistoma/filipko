import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

const placeholderColors = ['#d6cfc7', '#c7c0b8', '#bfb8ae', '#ccc4bb', '#b8b0a6', '#c2bbb2']

export default function Portfolio() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Grid */}
      <section style={{ padding: '6rem 2rem 8rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem 2rem',
          }}
        >
          {projects.map((project, i) => (
            <div key={project.id}>
              <Link
                to={`/projekty/${project.id}`}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '4 / 3',
                    backgroundColor: placeholderColors[i % placeholderColors.length],
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
                </div>
              </Link>

              <p style={{
                fontSize: '1.1rem',
                fontWeight: 400,
                color: '#1c1917',
                letterSpacing: '-0.01em',
                margin: '1rem 0 0',
              }}>
                {project.location}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
