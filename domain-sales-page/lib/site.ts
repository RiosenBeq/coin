export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://coin14.com').replace(/\/$/, '');

export const site = {
  name: 'Coin14',
  domain: 'Coin14.com',
  url: SITE_URL,
  title: 'Coin14.com For Sale | Premium Crypto Domain Name',
  description:
    'Coin14.com is a short, brandable .com crypto domain for sale. Buy it now for $2,000 or make an offer. Secure escrow, crypto & USD payments, fast transfer.',
  ogImage: `${SITE_URL}/og-image.png`,
  price: 2000,
  currency: 'USD',
  whatsappNumber: '905434123380',
  phoneDisplay: '+90 543 412 33 80',
  googleSiteVerification: '_ADTcIHHfzLq7yjeBm0s0R7lqx79bLS8urmEEtlIxsU',
} as const;

export type DomainCategory = 'Crypto' | 'Business' | 'Travel' | 'Personal';

export interface PortfolioDomain {
  name: string;
  category: DomainCategory;
  price: number;
  featured: boolean;
}

export const portfolio: PortfolioDomain[] = [
  { name: 'cryptobase360.com', category: 'Crypto', price: 2200, featured: true },
  { name: 'cointype.net', category: 'Crypto', price: 1800, featured: true },
  { name: 'coinmarkt.org', category: 'Crypto', price: 1500, featured: true },
  { name: 'anlikcoinfiyatlari.com', category: 'Crypto', price: 1200, featured: false },
  { name: 'marshotel.org', category: 'Travel', price: 10000, featured: true },
  { name: 'markalarin.com', category: 'Business', price: 1500, featured: true },
  { name: 'markalarim.com', category: 'Business', price: 1400, featured: false },
  { name: 'buaze.com', category: 'Business', price: 950, featured: false },
  { name: 'aybuke.org', category: 'Personal', price: 800, featured: false },
];

export const faqs = [
  {
    q: 'How do I buy Coin14.com?',
    a: 'Click "Buy now" or send an offer through the form. We confirm the price with you on WhatsApp or email, agree on a payment method and start the transfer as soon as payment is confirmed.',
  },
  {
    q: 'Is the payment secure?',
    a: 'Yes. For maximum safety you can pay through a licensed escrow service such as Escrow.com: the funds are held by the escrow agent and only released to the seller after you confirm the domain is in your account.',
  },
  {
    q: 'Which payment methods do you accept?',
    a: 'We accept Bitcoin (BTC), Ethereum (ETH), Tether (USDT), bank transfer in USD and payment via escrow. Tell us your preferred method when you contact us.',
  },
  {
    q: 'How long does the domain transfer take?',
    a: 'The transfer starts immediately after payment is confirmed. A push within the same registrar usually completes the same day; a transfer to another registrar with an authorization (EPP) code typically takes up to 5 days, depending on the registrar.',
  },
  {
    q: 'Can I make an offer below the listed price?',
    a: 'Yes. Every serious offer is reviewed. Send your offer with the form below and we will reply with an answer or a counter-offer.',
  },
  {
    q: 'Will I get full ownership of the domain?',
    a: 'Yes. Once the transfer is complete the domain is registered in your name, and you have full control over DNS, renewals and any future use or resale.',
  },
];

export const whatsappLink = (text: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: site.currency, maximumFractionDigits: 0 }).format(value);
