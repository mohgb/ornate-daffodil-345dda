/**
 * prepare-juridique.mjs — optimise the standalone "Lady Justice" photo (a
 * blindfolded justice statue holding golden scales, with law books, a gavel,
 * marble columns and a sunset window) into responsive WebP + JPEG renditions
 * for the Conseil Juridique & Réglementaire page hero. The image is used AS
 * PROVIDED — only resized and re-encoded, never repainted, recoloured,
 * cropped-to-hide-subject or distorted (skill + plan §1).
 *
 * Source: media/juridique-background.png
 * Output: public/img/juridique/justice-{w}.{webp,jpg}
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { mkdir } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = resolve(__dirname, '..', 'media', 'juridique-background.png')
const OUT = resolve(__dirname, '..', 'public', 'img', 'juridique')
const WIDTHS = [960, 1440, 1672] // withoutEnlargement caps the top rung to the source width

sharp.cache(false)

async function main() {
  await mkdir(OUT, { recursive: true })
  const src = await sharp(SRC).metadata()
  console.log(`source  ->  ${src.width}x${src.height}`)
  for (const w of WIDTHS) {
    const pipeline = sharp(SRC).resize({ width: w, withoutEnlargement: true })
    await pipeline.clone().webp({ quality: 80, effort: 5 }).toFile(join(OUT, `justice-${w}.webp`))
    await pipeline.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, `justice-${w}.jpg`))
    const meta = await sharp(join(OUT, `justice-${w}.webp`)).metadata()
    console.log(`  justice-${w}  ->  ${meta.width}x${meta.height}`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
