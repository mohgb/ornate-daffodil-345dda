/**
 * prepare-international.mjs — optimise the standalone "global network" photo (two
 * businessmen's hands — one pointing, one open — beneath a glowing holographic
 * world map + network lines, a sunset night-city skyline behind) into responsive
 * WebP + JPEG renditions for the Ouverture Internationale page hero. The image is
 * used AS PROVIDED — only resized and re-encoded, never repainted, recoloured,
 * cropped-to-hide-subject or distorted (skill + plan §1).
 *
 * Source: media/international-background.png
 * Output: public/img/international/world-{w}.{webp,jpg}
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { mkdir } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = resolve(__dirname, '..', 'media', 'international-background.png')
const OUT = resolve(__dirname, '..', 'public', 'img', 'international')
const WIDTHS = [960, 1440, 1536] // the source is 1536x1024, so the top rung is a truthful 1:1 rendition

sharp.cache(false)

async function main() {
  await mkdir(OUT, { recursive: true })
  const src = await sharp(SRC).metadata()
  console.log(`source  ->  ${src.width}x${src.height}`)
  for (const w of WIDTHS) {
    const pipeline = sharp(SRC).resize({ width: w, withoutEnlargement: true })
    await pipeline.clone().webp({ quality: 80, effort: 5 }).toFile(join(OUT, `world-${w}.webp`))
    await pipeline.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, `world-${w}.jpg`))
    const meta = await sharp(join(OUT, `world-${w}.webp`)).metadata()
    console.log(`  world-${w}  ->  ${meta.width}x${meta.height}`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
