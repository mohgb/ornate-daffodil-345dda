/**
 * prepare-strategie.mjs — optimise the standalone "chess strategy" photo (a
 * businessman in a blue suit moving a green-glowing knight on a marble
 * chessboard, night city skyline behind) into responsive WebP + JPEG
 * renditions for the Stratégie & Développement page hero. The image is used AS
 * PROVIDED — only resized and re-encoded, never repainted, recoloured,
 * cropped-to-hide-subject or distorted (skill + plan §1).
 *
 * Source: media/strategie-background.png
 * Output: public/img/strategie/chess-{w}.{webp,jpg}
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { mkdir } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = resolve(__dirname, '..', 'media', 'strategie-background.png')
const OUT = resolve(__dirname, '..', 'public', 'img', 'strategie')
const WIDTHS = [960, 1440, 1672] // the source is 1672px wide, so the top rung is a truthful 1:1 rendition

sharp.cache(false)

async function main() {
  await mkdir(OUT, { recursive: true })
  const src = await sharp(SRC).metadata()
  console.log(`source  ->  ${src.width}x${src.height}`)
  for (const w of WIDTHS) {
    const pipeline = sharp(SRC).resize({ width: w, withoutEnlargement: true })
    await pipeline.clone().webp({ quality: 80, effort: 5 }).toFile(join(OUT, `chess-${w}.webp`))
    await pipeline.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, `chess-${w}.jpg`))
    const meta = await sharp(join(OUT, `chess-${w}.webp`)).metadata()
    console.log(`  chess-${w}  ->  ${meta.width}x${meta.height}`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
