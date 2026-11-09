import type { MetadataRoute } from 'next';
import { business } from '@/content/business';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap { return business.siteUrl && business.launchApproved ? [{ url: business.siteUrl, changeFrequency: 'monthly', priority: 1 }] : []; }
