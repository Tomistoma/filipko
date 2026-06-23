/**
 * Compresses all images in public/images/ and uploads them to S3.
 * Gallery images  → max 2400px wide, quality 82
 * Thumbnails/carousel → max 1600px wide, quality 80
 *
 * Run with: node scripts/compress-and-upload.mjs
 */

import sharp from 'sharp'
import { execSync } from 'child_process'
import { readdirSync, mkdirSync, statSync } from 'fs'
import { join, relative, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const INPUT  = join(ROOT, 'public', 'images')
const OUTPUT = join(ROOT, 'public', 'images-web')
const BUCKET = 'truhlarstvi-filipko-images'
const REGION = 'eu-central-1'

// Gallery images get higher resolution; thumbnails and carousel get smaller
function getMaxWidth(relPath) {
  if (relPath.includes('projekty')) return 2400  // full gallery
  return 1600                                     // carousel / thumbnails / portraits
}

function walkDir(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) files.push(...walkDir(full))
    else if (/\.(jpe?g|png|JPG|JPEG|PNG)$/.test(e.name)) files.push(full)
  }
  return files
}

const files = walkDir(INPUT)
console.log(`Found ${files.length} images. Compressing...`)

for (const src of files) {
  const rel     = relative(INPUT, src)
  const dest    = join(OUTPUT, rel).replace(/\.(JPG|JPEG|PNG)$/i, '.jpg')
  const destDir = dirname(dest)
  mkdirSync(destDir, { recursive: true })

  const maxW = getMaxWidth(rel)

  await sharp(src)
    .rotate()                          // auto-rotate from EXIF
    .resize({ width: maxW, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest)

  const before = (statSync(src).size / 1024 / 1024).toFixed(1)
  const after  = (statSync(dest).size / 1024 / 1024).toFixed(1)
  console.log(`  ${rel}: ${before}MB → ${after}MB`)
}

console.log('\nUploading compressed images to S3...')
execSync(
  `aws s3 sync "${OUTPUT}" s3://${BUCKET}/images ` +
  `--region ${REGION} ` +
  `--cache-control "public,max-age=31536000,immutable" ` +
  `--content-type "image/jpeg" ` +
  `--no-progress`,
  { stdio: 'inherit' }
)

console.log('\nDone. All images compressed and uploaded with 1-year cache headers.')
