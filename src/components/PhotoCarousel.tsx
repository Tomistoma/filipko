import { useState, useEffect, useRef } from 'react'
import { CDN } from '../config'

const slides = [
  { src: `${CDN}/images/foto-1.jpg` },
  { src: `${CDN}/images/foto-2.jpg` },
  { src: `${CDN}/images/foto-3.jpg` },
  { src: `${CDN}/images/foto-4.jpg` },
  { src: `${CDN}/images/foto-5.jpg` },
]

const INTERVAL = 8000
const FADE_DURATION = 2000

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Preload all slides up front so cross-fade transitions are smooth from slide 1.
  useEffect(() => {
    slides.forEach((slide) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = slide.src
      document.head.appendChild(link)
    })
  }, [])

  // Restart zoom animation on the newly active slide via DOM manipulation —
  // avoids remounting the <img> which caused the black flash.
  useEffect(() => {
    const el = imgRefs.current[current]
    if (el) {
      el.style.animation = 'none'
      void el.offsetHeight // force reflow so animation restarts
      el.style.animation = `slowZoom ${INTERVAL + FADE_DURATION}ms ease-in-out forwards`
    }
  }, [current])

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => {
        setPrevious(prev)
        return (prev + 1) % slides.length
      })
    }, INTERVAL)
  }

  useEffect(() => {
    startTimer()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handleDotClick = (i: number) => {
    setPrevious(current)
    setCurrent(i)
    startTimer()
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 72px)',
        overflow: 'hidden',
        // Neutral background — if a gap ever appeared it won't flash black
        backgroundColor: '#c7c0b8',
      }}
    >
      {slides.map((slide, i) => {
        const isActive = i === current
        const isPrev = i === previous

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              // Active: fades in. Previous: stays fully visible underneath (no transition).
              // Others: invisible.
              opacity: isActive || isPrev ? 1 : 0,
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
              transition: isActive ? `opacity ${FADE_DURATION}ms ease-in-out` : 'none',
            }}
          >
            <img
              ref={(el) => { imgRefs.current[i] = el }}
              src={slide.src}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transformOrigin: 'center center',
              }}
            />
          </div>
        )
      })}

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.5rem',
          zIndex: 10,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            aria-label={`Snímek ${i + 1}`}
            style={{
              width: i === current ? '2rem' : '0.5rem',
              height: '2px',
              backgroundColor: i === current ? '#fafaf9' : 'rgba(250,250,249,0.35)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
