/**
 * prepare-construction.mjs — optimise the standalone construction-site photo
 * (a worker in a hi-vis vest facing a sunset build site with crane + excavator)
 * into responsive WebP + JPEG renditions for the Ingénierie & Construction page
 * hero. The image is used AS PROVIDED — only resized and re-encoded, never
 * repainted, recoloured, cropped-to-hide-subject or distorted (skill + plan §1).
 *
 * Source: media/construction-background.png (1672x940)
 * Output: public/img/construction/site-{w}.{webp,jpg}
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { mkdir } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = resolve(__dirname, '..', 'media', 'construction-background.png')
const OUT = resolve(__dirname, '..', 'public', 'img', 'construction')
const WIDTHS = [960, 1440, 1672] // source is 1672 wide; withoutEnlargement caps the top rung

sharp.cache(false)

async function main() {
  await mkdir(OUT, { recursive: true })
  for (const w of WIDTHS) {
    const pipeline = sharp(SRC).resize({ width: w, withoutEnlargement: true })
    await pipeline.clone().webp({ quality: 80, effort: 5 }).toFile(join(OUT, `site-${w}.webp`))
    await pipeline.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, `site-${w}.jpg`))
    const meta = await sharp(join(OUT, `site-${w}.webp`)).metadata()
    console.log(`  site-${w}  ->  ${meta.width}x${meta.height}`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
