import { CDN } from '../config'

// Photos live in S3 under images/projekty-v2/<slug>/ (01.jpg … plus cover.jpg),
// compressed from the folders in public/images/Projekty FOTO/ ("DATE - Location - TYPE").
export interface Project {
  id: number
  slug: string      // S3 folder name
  title: string
  location: string
  year: string
  image: string     // cover for cards
  gallery: string[] // filenames inside images/projekty-v2/<slug>/
}

function project(id: number, slug: string, title: string, location: string, year: string, photoCount: number): Project {
  return {
    id,
    slug,
    title,
    location,
    year,
    image: `${CDN}/images/projekty-v2/${slug}/cover.jpg`,
    gallery: Array.from({ length: photoCount }, (_, i) => `${String(i + 1).padStart(2, '0')}.jpg`),
  }
}

// Newest first
export const projects: Project[] = [
  project(1, '2026-07-13-praha-cimice-byt', 'Byt', 'Praha — Čimice', '2026', 28),
  project(2, '2026-06-16-usti-byt', 'Byt', 'Ústí', '2026', 22),
  project(3, '2026-01-15-usti-skrine', 'Skříně', 'Ústí', '2026', 7),
  project(4, '2025-11-08-krasny-les-kuchyne', 'Kuchyně', 'Krásný Les', '2025', 7),
  project(5, '2025-09-30-bast-kuchyne', 'Kuchyně', 'Bašť', '2025', 12),
  project(6, '2025-07-30-praha-holesovice-obyvaci-sestavy', 'Obývací sestavy', 'Praha — Holešovice', '2025', 12),
  project(7, '2025-07-25-praha-kosire-kuchyne', 'Kuchyně', 'Praha — Košíře', '2025', 8),
  project(8, '2025-05-23-praha-branik-byt', 'Byt', 'Praha — Braník', '2025', 18),
  project(9, '2024-09-18-praha-vysocany-tv-stena', 'TV stěna', 'Praha — Vysočany', '2024', 4),
  project(10, '2024-08-13-praha-holesovice-administrativni-prostory', 'Administrativní prostory', 'Praha — Holešovice', '2024', 11),
  project(11, '2023-05-23-praha-holesovice-optika-stul', 'Optika — Stůl', 'Praha — Holešovice', '2023', 6),
  project(12, '2022-06-25-mirovice-dum', 'Dům', 'Mírovice', '2022', 12),
  project(13, '2021-11-21-praha-chodov-byt', 'Byt', 'Praha — Chodov', '2021', 8),
]
