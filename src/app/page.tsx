import { Header, Hero, Shop, Essentials, Story, Neighbourhood, Visit, Footer } from '@/components/sections';
import { RevealObserver } from '@/components/reveal';
import { business } from '@/content/business';
export default function Home() {
  const schema = { '@context': 'https://schema.org', '@type': 'GroceryStore', name: business.name, telephone: business.telephone, address: { '@type': 'PostalAddress', addressLocality: business.city, addressCountry: 'BE', ...(business.streetAddress ? { streetAddress: business.streetAddress } : {}), ...(business.postalCode ? { postalCode: business.postalCode } : {}) }, ...(business.siteUrl ? { url: business.siteUrl, image: `${business.siteUrl}/images/social.jpg` } : {}) };
  return <><div id="top" /><Header /><main id="main"><Hero /><Shop /><Essentials /><Story /><Neighbourhood /><Visit /></main><Footer /><RevealObserver /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /></>;
}
