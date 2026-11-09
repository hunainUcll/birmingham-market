/** Confirm facts here before launch. Empty address/hours are intentionally hidden. */
export const business = {
  name: 'Birmingham Market',
  owner: 'Omar Ameen',
  phone: '0465 52 99 77',
  telephone: '+32465529977',
  city: 'Brussels',
  country: 'Belgium',
  streetAddress: '' as string,
  postalCode: '' as string,
  openingHours: [] as { days: string; hours: string }[],
  // Set a real HTTPS origin only after approval to publish. No invented canonical URL.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
  launchApproved: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  // Editorial draft: can be disabled independently pending Omar's review.
  showOwnerStory: true,
  showOwnerPortrait: true,
};
export function directionsUrl() {
  return business.streetAddress ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent([business.name, business.streetAddress, business.postalCode, business.city, business.country].filter(Boolean).join(', '))}` : null;
}
