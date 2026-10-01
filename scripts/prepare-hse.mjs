/**
 * prepare-hse.mjs — optimise the standalone night-refinery photo (a suited
 * engineer in a hard hat on a wet platform facing an illuminated plant at
 * night) into responsive WebP + JPEG renditions for the HSE page hero. The
 * image is used AS PROVIDED — only resized and re-encoded, never repainted,
 * recoloured, cropped-to-hide-subject or distorted (skill + plan §1).
 *
 * Source: media/hse-background.png (1536x1024)
 * Output: public/img/hse/refinery-{w}.{webp,jpg}
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { mkdir } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = resolve(__dirname, '..', 'media', 'hse-background.png')
const OUT = resolve(__dirname, '..', 'public', 'img', 'hse')
const WIDTHS = [960, 1440, 1536] // source is 1536 wide; withoutEnlargement caps the top rung

sharp.cache(false)

async function main() {
  await mkdir(OUT, { recursive: true })
  for (const w of WIDTHS) {
    const pipeline = sharp(SRC).resize({ width: w, withoutEnlargement: true })
    await pipeline.clone().webp({ quality: 80, effort: 5 }).toFile(join(OUT, `refinery-${w}.webp`))
    await pipeline.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, `refinery-${w}.jpg`))
    const meta = await sharp(join(OUT, `refinery-${w}.webp`)).metadata()
    console.log(`  refinery-${w}  ->  ${meta.width}x${meta.height}`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
