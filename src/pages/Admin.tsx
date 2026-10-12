import { useEffect, useState } from 'react'
import { projects } from '../data/projects'

interface Row { name: string; visits: number }
interface Stats {
  today: number
  week: number
  month: number
  total: number
  daily: { day: string; visits: number }[]
  pages: Row[]
  referrers: Row[]
  devices: Row[]
}

const STORAGE_KEY = 'admin-password'

const pageNames: Record<string, string> = {
  '/': 'Hlavní stránka',
  '/o-nas': 'O nás',
  '/co-vyrabime': 'Co vyrábíme',
  '/portfolio': 'Portfolio',
  '/kontakt': 'Kontakt',
}

// GoatCounter groups visitors by screen width
const deviceNames: Record<string, string> = {
  phone: 'Mobily',
  tablet: 'Tablety',
  desktop: 'Počítače',
  desktophd: 'Velké monitory',
  unknown: 'Neznámé',
}

function pageName(path: string) {
  if (pageNames[path]) return pageNames[path]
  const project = projects.find((p) => `/projekty/${p.id}` === path)
  return project ? `${project.title} — ${project.location}` : path
}

function formatDay(day: string) {
  const [, m, d] = day.split('-')
  return `${Number(d)}. ${Number(m)}.`
}

const card: React.CSSProperties = { border: '1px solid #e7e5e4', backgroundColor: '#fff', padding: '1.5rem' }
const eyebrow: React.CSSProperties = { fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#78716c', margin: 0 }

function Tile({ label, visits }: { label: string; visits: number }) {
  return (
    <div style={card}>
      <p style={eyebrow}>{label}</p>
      <p style={{ fontSize: '2.25rem', fontWeight: 300, color: '#1c1917', margin: '0.75rem 0 0.25rem', lineHeight: 1 }}>
        {visits.toLocaleString('cs-CZ')}
      </p>
      <p style={{ fontSize: '0.8rem', color: '#78716c', margin: 0 }}>návštěv</p>
    </div>
  )
}

function DailyChart({ daily }: { daily: Stats['daily'] }) {
  const [active, setActive] = useState<number | null>(null)
  const max = Math.max(1, ...daily.map((d) => d.visits))
  const shown = active === null ? null : daily[active]

  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
        <p style={eyebrow}>Návštěvy za posledních 30 dní</p>
        {/* Readout for the bar under the pointer / finger */}
        <p style={{ fontSize: '0.8rem', color: '#57534e', margin: 0, minHeight: '1.2em' }}>
          {shown ? `${formatDay(shown.day)} — ${shown.visits} návštěv` : `Nejvíce za den: ${max}`}
        </p>
      </div>

      <div
        onMouseLeave={() => setActive(null)}
        style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '160px', marginTop: '1.5rem', borderBottom: '1px solid #d6d3d1' }}
      >
        {daily.map((d, i) => (
          // Full-height column is the hover target; the bar itself can be tiny
          <div
            key={d.day}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end' }}
          >
            <div
              style={{
                width: '100%',
                height: d.visits === 0 ? 0 : `max(2px, ${(d.visits / max) * 100}%)`,
                backgroundColor: active === i ? '#1c1917' : '#78716c',
                borderRadius: '3px 3px 0 0',
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.7rem', color: '#78716c' }}>
        <span>{formatDay(daily[0].day)}</span>
        <span>{formatDay(daily[Math.floor(daily.length / 2)].day)}</span>
        <span>dnes</span>
      </div>
    </div>
  )
}

function List({ title, rows, name, empty }: { title: string; rows: Row[]; name: (n: string) => string; empty: string }) {
  const max = Math.max(1, ...rows.map((r) => r.visits))
  return (
    <div style={card}>
      <p style={{ ...eyebrow, marginBottom: '1rem' }}>{title}</p>
      {rows.length === 0 ? (
        <p style={{ fontSize: '0.85rem', color: '#78716c', margin: 0 }}>{empty}</p>
      ) : (
        rows.map((r) => (
          <div key={r.name} style={{ padding: '0.5rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontSize: '0.85rem', color: '#1c1917' }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name(r.name)}</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{r.visits.toLocaleString('cs-CZ')}</span>
            </div>
            <div style={{ height: '3px', marginTop: '0.35rem', backgroundColor: '#f5f5f4' }}>
              <div style={{ height: '100%', width: `${(r.visits / max) * 100}%`, backgroundColor: '#78716c' }} />
            </div>
          </div>
        ))
      )}
    </div>
  )
}

async function fetchStats(password: string): Promise<Stats> {
  const res = await fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${password}` } })
  const data = await res.json().catch(() => null)
  if (!res.ok) throw new Error(data?.error || 'Statistiky se nepodařilo načíst.')
  return data
}

function savedPassword() {
  try { return sessionStorage.getItem(STORAGE_KEY) ?? '' } catch { return '' }
}

function savePassword(password: string | null) {
  try {
    if (password) sessionStorage.setItem(STORAGE_KEY, password)
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch { /* private mode */ }
}

export default function Admin() {
  const [input, setInput] = useState('')
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)
  // Starts as loading when a password from this browser tab can be reused
  const [loading, setLoading] = useState(() => savedPassword() !== '')

  const load = (password: string) =>
    fetchStats(password)
      .then((data) => { setStats(data); savePassword(password) })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Statistiky se nepodařilo načíst.')
        savePassword(null)
      })
      .finally(() => setLoading(false))

  useEffect(() => {
    document.title = 'Administrace — Truhlářstvím za štěstím'
    const saved = savedPassword()
    if (saved) load(saved)
  }, [])

  const login = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    load(input)
  }

  const logout = () => {
    savePassword(null)
    setStats(null)
    setInput('')
  }

  if (!stats) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem' }}>
        <form onSubmit={login} style={{ ...card, width: '100%', maxWidth: '360px', padding: '2.5rem 2rem' }}>
          <p style={eyebrow}>Administrace</p>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 300, color: '#1c1917', margin: '0.5rem 0 2rem' }}>Přihlášení</h1>
          <label htmlFor="heslo" style={{ ...eyebrow, display: 'block', marginBottom: '0.5rem' }}>Heslo</label>
          <input
            id="heslo"
            type="password"
            autoComplete="current-password"
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 0', border: 'none', borderBottom: '1px solid #d6d3d1', backgroundColor: 'transparent', fontSize: '1rem', outline: 'none' }}
          />
          {error && <p style={{ fontSize: '0.8rem', color: '#b91c1c', margin: '1rem 0 0' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '2rem', width: '100%', padding: '1rem', border: 'none', borderRadius: '9999px',
              backgroundColor: '#1c1917', color: '#fafaf9', cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.6 : 1,
              fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500,
            }}
          >
            {loading ? 'Načítám…' : 'Přihlásit'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="m-admin" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <p style={eyebrow}>Truhlářstvím za štěstím</p>
          <h1 style={{ fontSize: '2rem', fontWeight: 200, letterSpacing: '-0.02em', color: '#1c1917', margin: '0.4rem 0 0' }}>Návštěvnost webu</h1>
        </div>
        <button
          onClick={logout}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#78716c' }}
        >
          Odhlásit
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        <Tile label="Dnes" visits={stats.today} />
        <Tile label="Posledních 7 dní" visits={stats.week} />
        <Tile label="Posledních 30 dní" visits={stats.month} />
        <Tile label="Celkem" visits={stats.total} />
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        <DailyChart daily={stats.daily} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1.25rem' }}>
        <List title="Nejnavštěvovanější stránky (30 dní)" rows={stats.pages} name={pageName} empty="Zatím žádná data." />
        <List title="Odkud lidé přicházejí (30 dní)" rows={stats.referrers} name={(n) => n || 'Přímo / neznámé'} empty="Zatím žádná data." />
        <List title="Zařízení (30 dní)" rows={stats.devices} name={(n) => deviceNames[n] ?? n} empty="Zatím žádná data." />
      </div>

      <p style={{ fontSize: '0.75rem', color: '#78716c', marginTop: '2rem', lineHeight: 1.6 }}>
        Data pochází ze služby GoatCounter. Počítá se bez cookies; roboti vyhledávačů se nezapočítávají.
      </p>
    </div>
  )
}
