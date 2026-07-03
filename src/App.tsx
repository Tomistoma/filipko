import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LocationMap from './components/LocationMap'
import HlavniStranka from './pages/HlavniStranka'
import ONas from './pages/ONas'
import CoVyrabime from './pages/CoVyrabime'
import Portfolio from './pages/Portfolio'
import Kontakt from './pages/Kontakt'
import ProjektDetail from './pages/ProjektDetail'

function Layout() {
  const { pathname } = useLocation()

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
      {(pathname === '/' || pathname === '/kontakt') && <LocationMap />}
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
