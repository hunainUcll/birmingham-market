import type { NextConfig } from 'next';
const config: NextConfig = {
  output: 'export',
  outputFileTracingRoot: process.cwd(),
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: { loader: 'custom', loaderFile: './src/lib/image-loader.ts', deviceSizes: [480, 768, 1200, 1600], imageSizes: [480] },
  poweredByHeader: false,
};
export default config;
