/**
 * prepare-images.mjs — S.E.S.S image pipeline
 *
 * The supplied design files in ../Sess are full-page MOCKUP COMPOSITES: each one
 * has the UI, headlines and buttons baked onto the photograph. We cannot use them
 * as backgrounds directly (the mockup's own text would show behind our live text).
 *
 * This script derives clean, reusable renditions by CROPPING the guaranteed-clean
 * photographic regions out of each mockup, and by cutting the official logo into its
 * natural pieces (mark + wordmark). It NEVER repaints, recolours, distorts or
 * regenerates any artwork — it only crops and re-encodes. The logo's colours,
 * proportions and details are preserved exactly; only the surrounding dark photo
 * background is left to be dropped at render time via mix-blend-mode.
 *
 * Output: public/img/{hero,projects,teaser,logo}
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { mkdir } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = resolve(__dirname, '..', '..', 'Sess') // ../../Sess relative to /scripts
const OUT = resolve(__dirname, '..', 'public', 'img')

sharp.cache(false)

async function ensure(dir) {
  await mkdir(dir, { recursive: true })
}

// Emit WebP + JPEG renditions of a cropped region, at one or more widths.
async function photo(srcFile, region, outDir, base, widths) {
  await ensure(outDir)
  const input = join(SRC, srcFile)
  for (const w of widths) {
    const pipeline = sharp(input)
      .extract(region)
      .resize({ width: w, withoutEnlargement: true })
    await pipeline
      .clone()
      .webp({ quality: 80, effort: 5 })
      .toFile(join(outDir, `${base}-${w}.webp`))
    await pipeline
      .clone()
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(join(outDir, `${base}-${w}.jpg`))
    const meta = await sharp(join(outDir, `${base}-${w}.webp`)).metadata()
    console.log(`  ${base}-${w}  ->  ${meta.width}x${meta.height}`)
  }
}

// Emit a single-width photo (cards / teasers), WebP + JPEG.
async function photoOne(srcFile, region, outDir, base, width) {
  await photo(srcFile, region, outDir, base, [width])
}

// Emit a cropped PNG piece of the logo (lossless, edges crisp). No colour change.
async function logoPiece(region, base, resizeW) {
  const outDir = join(OUT, 'logo')
  await ensure(outDir)
  let p = sharp(join(SRC, 'logo.png')).extract(region)
  if (resizeW) p = p.resize({ width: resizeW, withoutEnlargement: true })
  await p.png({ compressionLevel: 9 }).toFile(join(outDir, `${base}.png`))
  const meta = await sharp(join(outDir, `${base}.png`)).metadata()
  console.log(`  logo/${base}  ->  ${meta.width}x${meta.height}`)
}

async function main() {
  console.log('Hero (from 01-homepage.png, 1672x940 — clean refinery, right of the baked text):')
  await photo(
    '01-homepage.png',
    { left: 705, top: 118, width: 967, height: 675 },
    join(OUT, 'hero'),
    'refinery',
    [960, 560],
  )

  console.log('Project cards (from 08-team.png, 1024x1536 — clean photo band only; badges/titles rendered live):')
  // The photo is a short landscape strip; the mockup's badge + title sit BELOW it. Crop photo only.
  await photoOne('08-team.png', { left: 58, top: 686, width: 290, height: 54 }, join(OUT, 'projects'), 'tayal', 580)
  await photoOne('08-team.png', { left: 372, top: 686, width: 290, height: 54 }, join(OUT, 'projects'), 'gnl', 580)
  await photoOne('08-team.png', { left: 685, top: 686, width: 290, height: 54 }, join(OUT, 'projects'), 'infra', 580)

  console.log('Teaser bands:')
  // Workers looking at the refinery (07 staff hero) — for the staff teaser + final CTA band.
  await photoOne('07-experience.png', { left: 430, top: 82, width: 594, height: 300 }, join(OUT, 'teaser'), 'workers', 1188)
  // Refinery panorama (08 hero) — value-proposition / secondary imagery.
  await photoOne('08-team.png', { left: 512, top: 82, width: 512, height: 330 }, join(OUT, 'teaser'), 'panorama', 1024)

  console.log('Logo pieces (from logo.png, 1536x1024 — crop only, artwork untouched):')
  await logoPiece({ left: 92, top: 70, width: 610, height: 900 }, 'mark', 480) // hexagon mark + "S.E.S.S"
  await logoPiece({ left: 772, top: 305, width: 720, height: 470 }, 'wordmark', 720) // "SMART ENGINEERING & STRATEGIC SOLUTIONS"
  await logoPiece({ left: 40, top: 40, width: 1456, height: 944 }, 'full', 1000) // full lockup for footer
  await logoPiece({ left: 150, top: 120, width: 560, height: 560 }, 'favicon', 96) // square mark for favicon

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
