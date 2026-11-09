'use client';
import { useEffect } from 'react';
/** Progressive enhancement: content remains visible without JS or IntersectionObserver. */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    nodes.forEach(node => { if (node.getBoundingClientRect().top > window.innerHeight) { node.classList.add('reveal-ready'); observer.observe(node); } });
    return () => { observer.disconnect(); nodes.forEach(node => node.classList.remove('reveal-ready')); };
  }, []);
  return null;
}
