import Image from 'next/image';
import { assetPath } from '@/lib/paths';
import type { ReactNode } from 'react';

export function Arrow({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" /></svg>;
}
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) { return <p className={`eyebrow ${light ? 'light' : ''}`}><span className="tiny-square" />{children}</p>; }
export function Photo({ name, alt, className = '', priority = false, sizes = '(max-width: 700px) 100vw, 50vw' }: { name: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  return <div className={`photo ${className}`}><Image src={assetPath(`/images/${name}.webp`)} alt={alt} fill sizes={sizes} preload={priority} className="object-cover" /></div>;
}
export function Wordmark({ footer = false }: { footer?: boolean }) { return <a href="#top" className={`wordmark ${footer ? 'wordmark-footer' : ''}`} title="Back to top"><span>BIRMINGHAM<span className="wordmark-square" /></span><span className="wordmark-bottom">MARKET <span>BRUSSELS</span></span></a>; }
