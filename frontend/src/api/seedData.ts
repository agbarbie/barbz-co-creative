import type { Product, PortfolioItem, Testimonial, Service, BlogPost, FAQ } from '../types';

export const services: Service[] = [
  { id: 'brand-identity', title: 'Brand Identity Design', description: 'Logos, guidelines, colour systems and the full visual language behind your brand.', icon: 'palette' },
  { id: 'graphic-design', title: 'Graphic Design', description: 'Print and digital design for campaigns, packaging, and stationery.', icon: 'layers' },
  { id: 'social-design', title: 'Social Media Design', description: 'Cohesive, scroll-stopping content systems for every platform.', icon: 'grid' },
  { id: 'web-dev', title: 'Website Design & Development', description: 'Fast, modern, conversion-focused websites built around your brand.', icon: 'code' },
  { id: 'ui-ux', title: 'UI/UX Design', description: 'Interfaces that are intuitive, elegant, and built around real users.', icon: 'layout' },
  { id: 'apparel', title: 'Custom Apparel & Merchandise', description: 'Premium hoodies, tees and branded merch for teams, events and brands.', icon: 'shirt' },
  { id: 'event-branding', title: 'Event Branding', description: 'End-to-end creative direction for conferences, church events and launches.', icon: 'calendar' },
  { id: 'consulting', title: 'Creative Strategy & Consulting', description: 'Positioning, brand strategy, and creative direction for growing organisations.', icon: 'compass' },
];

export const products: Product[] = [
  { id: 'p1', name: 'Signature Oversized Hoodie', category: 'hoodies', price: 3500, image: '/assets/products/hoodie-1.jpg', customizable: true, description: 'Heavyweight fleece hoodie, plain or fully branded.' },
  { id: 'p2', name: 'Classic Crewneck Sweatshirt', category: 'sweatshirts', price: 3000, image: '/assets/products/sweatshirt-1.jpg', customizable: true, description: 'Soft-brushed crewneck, perfect for team and church branding.' },
  { id: 'p3', name: 'Essential Cotton Tee', category: 'tshirts', price: 1800, image: '/assets/products/tee-1.jpg', customizable: true, description: '100% cotton tee built for everyday wear and bulk branding.' },
  { id: 'p4', name: 'Premium Zip-Up Hoodie', category: 'hoodies', price: 4200, image: '/assets/products/hoodie-2.jpg', customizable: true, description: 'Structured zip-up hoodie with embroidery-ready panels.' },
  { id: 'p5', name: 'Event Staff Tee', category: 'tshirts', price: 1600, image: '/assets/products/tee-2.jpg', customizable: true, description: 'Durable tee designed for event and organisation branding.' },
  { id: 'p6', name: 'Corporate Polo', category: 'accessories', price: 2400, image: '/assets/products/polo-1.jpg', customizable: true, description: 'Sharp, professional polo for corporate branding.' },
];

export const portfolio: PortfolioItem[] = [
  { id: 'w1', title: 'Grace Chapel Rebrand', client: 'Grace Chapel', category: 'branding', image: '/assets/portfolio/grace-chapel.jpg', summary: 'Full identity system including logo, colours, and branded apparel for a growing congregation.' },
  { id: 'w2', title: 'Nova Tech Website', client: 'Nova Tech', category: 'web', image: '/assets/portfolio/nova-tech.jpg', summary: 'A conversion-focused website for a fintech startup, built on React and Node.' },
  { id: 'w3', title: 'Summit Conference Merch', client: 'Summit Africa', category: 'apparel', image: '/assets/portfolio/summit.jpg', summary: '500+ branded hoodies and tees produced for a three-day conference.' },
  { id: 'w4', title: 'Kito School Identity', client: 'Kito School', category: 'branding', image: '/assets/portfolio/kito-school.jpg', summary: 'Logo, uniform branding guidelines, and stationery for a growing school.' },
  { id: 'w5', title: 'Elevate Fest Event Branding', client: 'Elevate Fest', category: 'event', image: '/assets/portfolio/elevate-fest.jpg', summary: 'Complete event branding — signage, stage design, and staff apparel.' },
];

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Pastor Daniel M.', role: 'Grace Chapel', quote: 'Barbz & Co. captured exactly who we are and turned it into a brand our congregation is proud to wear.', rating: 5 },
  { id: 't2', name: 'Achieng O.', role: 'Founder, Nova Tech', quote: 'The website did not just look premium — it changed how prospects perceive us from the first click.', rating: 5 },
  { id: 't3', name: 'Brian K.', role: 'Summit Africa', quote: 'Every hoodie arrived exactly on brief and on time, even at scale for our whole event team.', rating: 5 },
];

export const blogPosts: BlogPost[] = [
  { id: 'b1', title: 'Why Your Brand Colours Are Doing More Work Than You Think', excerpt: 'A look at how colour psychology shapes trust, memory, and perceived value.', date: '2026-06-12', category: 'Branding', image: '/assets/blog/colour-psychology.jpg' },
  { id: 'b2', title: 'From Logo to Merch: Keeping Your Identity Consistent', excerpt: 'How to carry one visual language across digital, print, and apparel.', date: '2026-05-28', category: 'Design Systems', image: '/assets/blog/logo-to-merch.jpg' },
  { id: 'b3', title: 'What Churches and Schools Get Wrong About Branding', excerpt: 'Purpose-led organisations deserve design that matches their mission.', date: '2026-05-02', category: 'Strategy', image: '/assets/blog/purpose-branding.jpg' },
];

export const faqs: FAQ[] = [
  { question: 'How does the custom apparel ordering process work?', answer: 'You choose your apparel, upload your logo or artwork, select colours, sizes and quantities, and our team sends you a digital mockup for approval before production begins.' },
  { question: 'What is the minimum order quantity for branded apparel?', answer: 'We accommodate both individual pieces and bulk orders for teams, schools, churches and events — quantity requirements are confirmed at quotation stage.' },
  { question: 'Do you offer branding services without apparel?', answer: 'Yes. Brand identity, graphic design, and website design and development are all available as standalone services.' },
  { question: 'How long does a typical project take?', answer: 'Timelines vary by scope. Branding projects typically take 1–3 weeks; websites 3–6 weeks; apparel production 1–2 weeks after mockup approval.' },
  { question: 'How do I book a consultation?', answer: 'Use the Book a Consultation page to choose a service and available time slot, or reach us directly on WhatsApp.' },
];
