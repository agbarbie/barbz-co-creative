export interface Product {
  id: string;
  name: string;
  category: 'hoodies' | 'tshirts' | 'sweatshirts' | 'accessories';
  price: number;
  image: string;
  customizable: boolean;
  description: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: 'branding' | 'web' | 'apparel' | 'event';
  image: string;
  summary: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CustomOrderPayload {
  apparelType: string;
  colors: string;
  sizes: Record<string, number>;
  quantity: number;
  placement: string;
  notes: string;
  fileName?: string;
  contactEmail: string;
  contactPhone: string;
}

export interface BookingPayload {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface QuotePayload {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  budgetRange: string;
  details: string;
}
