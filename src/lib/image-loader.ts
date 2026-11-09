'use client';
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const size = [480, 768, 1200, 1600].find((size) => size >= width) ?? 1600;
  return src.replace(/\.webp$/, `-${size}.webp`);
}
