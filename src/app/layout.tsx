import type { Metadata } from 'next';
import '@fontsource-variable/archivo';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/instrument-serif/latin-400.css';
import './globals.css';
import { assetPath } from '@/lib/paths';
import { business } from '@/content/business';

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl || 'http://localhost:3010'),
  ...(business.siteUrl ? { alternates: { canonical: `${business.siteUrl}/` } } : {}),
  title: 'Birmingham Market — Your Corner of Brussels',
  description: 'A little shop. A big story. Discover Birmingham Market, Omar Ameen’s independent neighbourhood grocery shop in Brussels. Fresh produce and everyday essentials.',
  robots: business.launchApproved ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: 'website', locale: 'en_GB', title: 'Birmingham Market — A Little Shop. A Big Story.', description: 'An independent corner of Brussels. Meet the shop, the everyday essentials, and the person behind the counter.', images: [{ url: business.siteUrl ? `${business.siteUrl}/images/social.jpg` : '/images/social.jpg', width: 1200, height: 630, alt: 'The Birmingham Market storefront in Brussels' }] },
  twitter: { card: 'summary_large_image', title: 'Birmingham Market — Your Corner of Brussels', images: [business.siteUrl ? `${business.siteUrl}/images/social.jpg` : '/images/social.jpg'] },
  icons: { icon: assetPath('/icon.svg') },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>; }
