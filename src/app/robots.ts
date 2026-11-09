import type { MetadataRoute } from 'next';
import { business } from '@/content/business';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', ...(business.launchApproved ? { allow: '/' } : { disallow: '/' }) }, ...(business.siteUrl && business.launchApproved ? { sitemap: `${business.siteUrl}/sitemap.xml` } : {}) }; }
