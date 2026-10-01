/**
 * prepare-assistance.mjs — optimise the standalone "assistance technique" photo
 * (three engineers / supervisors in hard hats reviewing plans on a tablet in
 * front of an industrial plant at dusk, cranes & refinery behind) into responsive
 * WebP + JPEG renditions for the Assistance technique page hero. The image is used
 * AS PROVIDED — only resized and re-encoded, never repainted, recoloured,
 * cropped-to-hide-subject or distorted (skill + plan §1).
 *
 * Source: media/assistance-background.png
 * Output: public/img/assistance/team-{w}.{webp,jpg}
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { mkdir } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = resolve(__dirname, '..', 'media', 'assistance-background.png')
const OUT = resolve(__dirname, '..', 'public', 'img', 'assistance')
const WIDTHS = [960, 1440, 1671] // the source is 1671x941, so the top rung is a truthful 1:1 rendition

sharp.cache(false)

async function main() {
  await mkdir(OUT, { recursive: true })
  const src = await sharp(SRC).metadata()
  console.log(`source  ->  ${src.width}x${src.height}`)
  for (const w of WIDTHS) {
    const pipeline = sharp(SRC).resize({ width: w, withoutEnlargement: true })
    await pipeline.clone().webp({ quality: 80, effort: 5 }).toFile(join(OUT, `team-${w}.webp`))
    await pipeline.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, `team-${w}.jpg`))
    const meta = await sharp(join(OUT, `team-${w}.webp`)).metadata()
    console.log(`  team-${w}  ->  ${meta.width}x${meta.height}`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
