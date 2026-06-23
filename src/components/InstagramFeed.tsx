import { useEffect } from 'react'

const FEED_ID = 'nyFSm0h5Cn83CHlYN4hk'

// Tell TypeScript about the Behold custom element (React 19 uses React.JSX namespace)
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'behold-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'feed-id': string
      }
    }
  }
}

export default function InstagramFeed() {
  useEffect(() => {
    if (document.querySelector('script[src="https://w.behold.so/widget.js"]')) return
    const s = document.createElement('script')
    s.type = 'module'
    s.src = 'https://w.behold.so/widget.js'
    document.head.append(s)
  }, [])

  return (
    <section style={{ padding: '6rem 2rem', backgroundColor: '#1c1917' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#57534e', marginBottom: '0.75rem' }}>
              Instagram
            </p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, letterSpacing: '-0.02em', color: '#fafaf9', margin: 0 }}>
              Sledujte nás
            </h2>
          </div>
          <a
            href="https://www.instagram.com/truhlarstvim_za_stestim/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              color: '#a8a29e',
              textDecoration: 'none',
              borderBottom: '1px solid #44403c',
              paddingBottom: '2px',
            }}
          >
            @truhlarstvim_za_stestim
          </a>
        </div>

        <behold-widget feed-id={FEED_ID} />

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <a
            href="https://www.instagram.com/truhlarstvim_za_stestim/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.875rem 3rem',
              backgroundColor: '#fafaf9',
              color: '#1c1917',
              textDecoration: 'none',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Sledujte naši tvorbu
          </a>
        </div>

      </div>
    </section>
  )
}
