import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HlavniStranka from './pages/HlavniStranka'
import ONas from './pages/ONas'
import CoVyrabime from './pages/CoVyrabime'
import Portfolio from './pages/Portfolio'
import Kontakt from './pages/Kontakt'
import ProjektDetail from './pages/ProjektDetail'
import Admin from './pages/Admin'
import { countPageview } from './analytics'

function Layout() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  // Count the page view in GoatCounter (shown on our own dashboard at /admin)
  useEffect(() => {
    if (isAdmin) return
    countPageview(pathname)
  }, [pathname, isAdmin])

  // The admin dashboard is a standalone page, without the site's navbar and footer
  if (isAdmin) return <Admin />

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main key={pathname} style={{ animation: 'pageEnter 0.75s ease both' }}>
        <Routes>
          <Route path="/" element={<HlavniStranka />} />
          <Route path="/o-nas" element={<ONas />} />
          <Route path="/co-vyrabime" element={<CoVyrabime />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/projekty/:id" element={<ProjektDetail />} />
          <Route path="/kontakt" element={<Kontakt />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
