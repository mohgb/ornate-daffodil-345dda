/**
 * prepare-home-hero.mjs — optimise the new Accueil/Home hero photograph (a modern
 * engineering office: architectural blueprints, an industrial building model with
 * tower cranes on the desk, CAD monitors and engineers working in the background)
 * into the responsive WebP + JPEG renditions the homepage Hero already expects.
 *
 * It replaces ONLY the pixels behind the existing hero composition — the image is
 * used AS PROVIDED (resized + re-encoded only, never repainted, recoloured,
 * cropped-to-hide-subject or distorted; skill + user brief §6). Widths match the
 * hero's current srcset [560, 960] so the responsive behaviour is unchanged.
 *
 * Source: media/home-hero-source.jpg (1080x616)
 * Output: public/img/hero/office-{w}.{webp,jpg}
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { mkdir } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = resolve(__dirname, '..', 'media', 'home-hero-source.jpg')
const OUT = resolve(__dirname, '..', 'public', 'img', 'hero')
const WIDTHS = [560, 960] // source is 1080 wide; both rungs are truthful (withoutEnlargement)

sharp.cache(false)

async function main() {
  await mkdir(OUT, { recursive: true })
  const src = await sharp(SRC).metadata()
  console.log(`source  ->  ${src.width}x${src.height}`)
  for (const w of WIDTHS) {
    const pipeline = sharp(SRC).resize({ width: w, withoutEnlargement: true })
    await pipeline.clone().webp({ quality: 82, effort: 5 }).toFile(join(OUT, `office-${w}.webp`))
    await pipeline.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(join(OUT, `office-${w}.jpg`))
    const meta = await sharp(join(OUT, `office-${w}.webp`)).metadata()
    console.log(`  office-${w}  ->  ${meta.width}x${meta.height}`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
