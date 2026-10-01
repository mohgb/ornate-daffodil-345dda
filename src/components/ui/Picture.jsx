/**
 * Picture — responsive <picture> with WebP + JPEG renditions (plan §5.3, §8).
 * `widths` lists the rendition widths that exist on disk for `dir/base`.
 */
export default function Picture({
  dir,
  base,
  widths,
  sizes = '100vw',
  alt,
  className = '',
  imgClassName = '',
  loading = 'lazy',
  fetchPriority,
  width,
  height,
  draggable = false,
}) {
  const srcset = (ext) => widths.map((w) => `/img/${dir}/${base}-${w}.${ext} ${w}w`).join(', ')
  const fallback = `/img/${dir}/${base}-${widths[widths.length - 1]}.jpg`

  return (
    <picture className={className}>
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <source type="image/jpeg" srcSet={srcset('jpg')} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        className={imgClassName}
        loading={loading}
        decoding="async"
        fetchpriority={fetchPriority}
        width={width}
        height={height}
        draggable={draggable}
      />
    </picture>
  )
}
