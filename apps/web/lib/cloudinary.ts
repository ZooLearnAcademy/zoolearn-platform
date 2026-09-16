/**
 * Cloudinary image optimization utilities.
 *
 * These helpers inject delivery transformations (f_auto, q_auto, width)
 * into existing Cloudinary URLs at render-time without modifying the
 * original assets stored in Cloudinary.
 */

const CLOUDINARY_UPLOAD_SEGMENT = "/image/upload/"

/**
 * Optimise a Cloudinary URL by injecting `f_auto,q_auto` and an optional
 * width transform.  Non-Cloudinary URLs are returned unchanged.
 *
 * @example
 * optimizeCloudinaryUrl(
 *   "https://res.cloudinary.com/duibfmcw1/image/upload/v1767671721/Leucosolenia_lyznns.png",
 *   400
 * )
 * // → "https://res.cloudinary.com/duibfmcw1/image/upload/f_auto,q_auto,w_400/v1767671721/Leucosolenia_lyznns.png"
 */
export function optimizeCloudinaryUrl(url: string, width?: number): string {
  if (!url || !url.includes(CLOUDINARY_UPLOAD_SEGMENT)) return url

  // Avoid double-adding transforms
  if (url.includes("f_auto") && url.includes("q_auto")) {
    // If width is requested and not yet present, inject it
    if (width && !url.includes(`w_${width}`)) {
      const idx = url.indexOf(CLOUDINARY_UPLOAD_SEGMENT) + CLOUDINARY_UPLOAD_SEGMENT.length
      const after = url.slice(idx)
      // Transforms are already present — append width to the existing chain
      if (after.startsWith("f_auto") || after.startsWith("q_auto")) {
        const slashIdx = after.indexOf("/")
        if (slashIdx !== -1) {
          const existingTransforms = after.slice(0, slashIdx)
          const rest = after.slice(slashIdx + 1)
          return (
            url.slice(0, idx) + existingTransforms + `,w_${width}/` + rest
          )
        }
      }
    }
    return url
  }

  const idx =
    url.indexOf(CLOUDINARY_UPLOAD_SEGMENT) + CLOUDINARY_UPLOAD_SEGMENT.length
  const transforms = width ? `f_auto,q_auto,w_${width}` : "f_auto,q_auto"

  return url.slice(0, idx) + transforms + "/" + url.slice(idx)
}

/**
 * Custom image loader for Next.js `<Image>` that routes through Cloudinary
 * transforms instead of the built-in Next.js image optimizer.
 *
 * Usage:
 * ```tsx
 * import { cloudinaryLoader } from "@/lib/cloudinary"
 * <Image loader={cloudinaryLoader} src={url} ... />
 * ```
 */
export function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}): string {
  if (!src.includes(CLOUDINARY_UPLOAD_SEGMENT)) return src

  const q = quality || 80
  const idx =
    src.indexOf(CLOUDINARY_UPLOAD_SEGMENT) + CLOUDINARY_UPLOAD_SEGMENT.length

  return src.slice(0, idx) + `f_auto,q_${q},w_${width}/` + src.slice(idx)
}
