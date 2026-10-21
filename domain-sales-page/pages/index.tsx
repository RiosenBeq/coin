import Head from 'next/head';
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { CoinMark, Logo } from '../components/Logo';
import {
  ArrowRightIcon,
  AwardIcon,
  BoltIcon,
  BrainIcon,
  CardIcon,
  ChartIcon,
  CheckIcon,
  ChevronIcon,
  CloseIcon,
  CubeIcon,
  ExchangeIcon,
  LockIcon,
  MenuIcon,
  NewsIcon,
  SearchIcon,
  ShieldIcon,
  StarIcon,
  TrendIcon,
  WalletIcon,
  WhatsAppIcon,
} from '../components/Icons';
import { faqs, formatPrice, portfolio, site, whatsappLink, type DomainCategory } from '../lib/site';

const NAV = [
  { href: '#overview', label: 'Overview' },
  { href: '#use-cases', label: 'Use cases' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#faq', label: 'FAQ' },
];

const DOMAIN_FACTS = [
  { label: 'Length', value: '6 characters' },
  { label: 'Extension', value: '.com' },
  { label: 'Keyword', value: 'Coin' },
  { label: 'Style', value: 'Brandable' },
];

const PAYMENT_METHODS = ['BTC', 'ETH', 'USDT', 'USD', 'Escrow'];

const TICKER = ['Bitcoin', 'Ethereum', 'Exchange', 'Wallet', 'DeFi', 'Web3', 'Trading', 'Payments', 'Blockchain', 'Tokens'];

const USE_CASES = [
  { icon: ExchangeIcon, title: 'Crypto exchange', text: 'A short .com customers can type from memory and trust with their funds.' },
  { icon: WalletIcon, title: 'Wallet & custody', text: 'A clear, credible name for a wallet, crypto card or payment app.' },
  { icon: ChartIcon, title: 'Price tracker & data', text: 'Perfect for live coin prices, market data, portfolio or analytics tools.' },
  { icon: CubeIcon, title: 'Web3 & token project', text: 'Give your token, DeFi protocol or NFT collection a premium home.' },
  { icon: NewsIcon, title: 'News & education', text: 'Launch a crypto media brand, newsletter or trading academy.' },
  { icon: CardIcon, title: 'Fintech & payments', text: 'Ideal for payment gateways, OTC desks and crypto-friendly fintech.' },
];

const BENEFITS = [
  { icon: AwardIcon, title: 'Instant credibility', text: '.com is the most trusted extension in the world and signals an established brand.' },
  { icon: BrainIcon, title: 'Short & memorable', text: 'Six characters that are easy to spell, say and remember — more direct visits.' },
  { icon: SearchIcon, title: 'Search & ad performance', text: 'A relevant keyword in the name supports click-through in search results and ads.' },
  { icon: TrendIcon, title: 'Long-term asset', text: 'Quality crypto .com names are scarce and can appreciate in value over time.' },
];

const STEPS = [
  { title: 'Agree on the price', text: 'Buy at the listed price or send an offer. We reply on WhatsApp or email.' },
  { title: 'Pay securely', text: 'Pay via escrow, crypto (BTC, ETH, USDT) or USD bank transfer — your choice.' },
  { title: 'Receive the domain', text: 'The transfer starts immediately and the domain is registered in your name.' },
];

const FILTERS: Array<'All' | 'Featured' | DomainCategory> = ['All', 'Featured', 'Crypto', 'Business', 'Travel', 'Personal'];

const EMPTY_FORM: Record<'name' | 'email' | 'phone' | 'offer' | 'domain' | 'message', string> = {
  name: '',
  email: '',
  phone: '',
  offer: '',
  domain: site.domain,
  message: '',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: `${site.url}/`,
      logo: `${site.url}/logo512.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+90-543-412-3380',
        contactType: 'sales',
        availableLanguage: ['English', 'Turkish'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.domain,
      inLanguage: 'en',
      publisher: { '@id': `${site.url}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${site.url}/#webpage`,
      url: `${site.url}/`,
      name: site.title,
      description: site.description,
      inLanguage: 'en',
      isPartOf: { '@id': `${site.url}/#website` },
      about: { '@id': `${site.url}/#product` },
      primaryImageOfPage: { '@type': 'ImageObject', url: site.ogImage, width: 1200, height: 630 },
    },
    {
      '@type': 'Product',
      '@id': `${site.url}/#product`,
      name: site.domain,
      description: site.description,
      image: site.ogImage,
      sku: 'coin14.com',
      category: 'Domain names',
      brand: { '@type': 'Brand', name: site.name },
      offers: {
        '@type': 'Offer',
        url: `${site.url}/`,
        price: String(site.price),
        priceCurrency: site.currency,
        availability: 'https://schema.org/InStock',
        seller: { '@id': `${site.url}/#organization` },
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${site.url}/#portfolio`,
      name: 'Premium domain portfolio',
      itemListElement: portfolio.map((d, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: d.name,
          category: `${d.category} domain name`,
          offers: {
            '@type': 'Offer',
            price: String(d.price),
            priceCurrency: site.currency,
            availability: 'https://schema.org/InStock',
          },
        },
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${site.url}/#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const [form, setForm] = useState(EMPTY_FORM);
  const [sentLink, setSentLink] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal-on-scroll; content stays visible when JS or IntersectionObserver is unavailable.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const root = document.documentElement;
    root.classList.add('reveal-ready');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);

  const visibleDomains = useMemo(() => {
    if (filter === 'All') return portfolio;
    if (filter === 'Featured') return portfolio.filter((d) => d.featured);
    return portfolio.filter((d) => d.category === filter);
  }, [filter]);

  const startOffer = (domain: string) => {
    setForm((prev) => ({ ...prev, domain }));
    setSentLink(null);
    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => document.getElementById('offer-name')?.focus({ preventScroll: true }), 500);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const offer = Number(form.offer);
    const lines = [
      `Hello! I'm interested in buying ${form.domain}.`,
      '',
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
    ];
    if (form.phone.trim()) lines.push(`Phone: ${form.phone.trim()}`);
    if (offer > 0) lines.push(`My offer: ${formatPrice(offer)}`);
    if (form.message.trim()) lines.push('', form.message.trim());
    const link = whatsappLink(lines.join('\n'));
    window.open(link, '_blank', 'noopener,noreferrer');
    setSentLink(link);
    setForm(EMPTY_FORM);
  };

  const buyNowLink = whatsappLink(`Hello! I would like to buy ${site.domain} for ${formatPrice(site.price)}.`);
  const year = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>{site.title}</title>
        <meta name="description" content={site.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={`${site.url}/`} />
        <meta name="google-site-verification" content={site.googleSiteVerification} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.domain} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content={`${site.url}/`} />
        <meta property="og:title" content={site.title} />
        <meta property="og:description" content={site.description} />
        <meta property="og:image" content={site.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Coin14.com – premium crypto domain for sale" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={site.title} />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:image" content={site.ogImage} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="wrap header-inner">
          <a href="#overview" className="logo-link" aria-label="Coin14.com home">
            <Logo />
          </a>
          <nav id="site-nav" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main">
            <ul>
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a className="btn btn-primary btn-sm nav-cta" href="#offer" onClick={() => setMenuOpen(false)}>
              Make an offer
            </a>
          </nav>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="hero" id="overview" aria-labelledby="hero-title">
          <div className="hero-glow" aria-hidden />
          <div className="hero-grid-bg" aria-hidden />
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="live-dot" aria-hidden /> Premium .com domain · Available now
              </p>
              <h1 id="hero-title">
                <span className="gradient-text">Coin14.com</span> <span className="h1-rest">is for sale</span>
              </h1>
              <p className="lead">
                A short, brandable crypto domain for your exchange, wallet, Web3 project or fintech startup. Own the name
                your customers will remember.
              </p>

              <div className="price-box">
                <div>
                  <span className="price-label">Buy it now</span>
                  <span className="price">{formatPrice(site.price)}</span>
                </div>
                <span className="price-divider" aria-hidden />
                <p className="price-note">
                  Offers welcome
                  <br />
                  <span>Escrow available</span>
                </p>
              </div>

              <div className="cta-row">
                <a className="btn btn-primary btn-lg" href={buyNowLink} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Buy now
                </a>
                <button type="button" className="btn btn-ghost btn-lg" onClick={() => startOffer(site.domain)}>
                  Make an offer <ArrowRightIcon />
                </button>
              </div>

              <ul className="trust-row">
                <li>
                  <ShieldIcon /> Escrow protected
                </li>
                <li>
                  <BoltIcon /> Instant transfer
                </li>
                <li>
                  <LockIcon /> Secure payment
                </li>
              </ul>
            </div>

            <div className="hero-visual">
              <div className="domain-card">
                <div className="browser-bar" aria-hidden>
                  <span className="browser-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="browser-url">
                    <LockIcon /> https://<strong>coin14.com</strong>
                  </span>
                </div>
                <div className="domain-card-body">
                  <CoinMark size={92} className="coin-float" />
                  <p className="domain-card-name">
                    Coin14<span>.com</span>
                  </p>
                  <p className="domain-card-tag">Premium crypto domain</p>
                  <dl className="facts">
                    {DOMAIN_FACTS.map((fact) => (
                      <div key={fact.label}>
                        <dt>{fact.label}</dt>
                        <dd>{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="pay-methods">
                    <span>Accepted payments</span>
                    <ul>
                      {PAYMENT_METHODS.map((method) => (
                        <li key={method}>{method}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ticker */}
        <div className="ticker" aria-hidden>
          <div className="ticker-track">
            {[...TICKER, ...TICKER].map((word, i) => (
              <span key={`${word}-${i}`}>{word}</span>
            ))}
          </div>
        </div>

        {/* Use cases */}
        <section className="section" id="use-cases" aria-labelledby="use-cases-title">
          <div className="wrap">
            <div className="section-head reveal">
              <p className="kicker">Use cases</p>
              <h2 id="use-cases-title">Built for the next big crypto brand</h2>
              <p className="section-lead">
                &ldquo;Coin&rdquo; is the most recognised word in crypto. Paired with a short number, Coin14.com works
                for almost any digital-asset business.
              </p>
            </div>
            <div className="card-grid card-grid-3">
              {USE_CASES.map(({ icon: Icon, title, text }) => (
                <article className="feature-card reveal" key={title}>
                  <span className="icon-badge">
                    <Icon />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section section-alt" id="why" aria-labelledby="why-title">
          <div className="wrap why-inner">
            <div className="section-head section-head-left reveal">
              <p className="kicker">Why a premium .com</p>
              <h2 id="why-title">Your domain is your first impression</h2>
              <p className="section-lead">
                Investors, users and partners judge a crypto project by its name. A premium .com builds trust before the
                first click.
              </p>
              <button type="button" className="btn btn-ghost" onClick={() => startOffer(site.domain)}>
                Make an offer <ArrowRightIcon />
              </button>
            </div>
            <div className="card-grid card-grid-2">
              {BENEFITS.map(({ icon: Icon, title, text }) => (
                <article className="feature-card feature-card-compact reveal" key={title}>
                  <span className="icon-badge">
                    <Icon />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section" id="how-it-works" aria-labelledby="how-title">
          <div className="wrap">
            <div className="section-head reveal">
              <p className="kicker">How it works</p>
              <h2 id="how-title">Buy Coin14.com in three simple steps</h2>
              <p className="section-lead">A safe, transparent process — the same one used by major domain marketplaces.</p>
            </div>
            <ol className="steps">
              {STEPS.map((step, i) => (
                <li className="step reveal" key={step.title}>
                  <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
            <ul className="assurance reveal">
              <li>
                <CheckIcon /> Full ownership & DNS control
              </li>
              <li>
                <CheckIcon /> Escrow.com supported
              </li>
              <li>
                <CheckIcon /> 24/7 support on WhatsApp
              </li>
            </ul>
          </div>
        </section>

        {/* Portfolio */}
        <section className="section section-alt" id="portfolio" aria-labelledby="portfolio-title">
          <div className="wrap">
            <div className="section-head reveal">
              <p className="kicker">Portfolio</p>
              <h2 id="portfolio-title">More premium domains for sale</h2>
              <p className="section-lead">Hand-picked crypto, business and lifestyle domains — ready for instant transfer.</p>
            </div>

            <div className="filters" role="group" aria-label="Filter domains">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`filter${filter === f ? ' is-active' : ''}`}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <ul className="domain-grid">
              {visibleDomains.map((d) => (
                <li className="domain-item" key={d.name}>
                  <div className="domain-item-top">
                    <span className="chip">{d.category}</span>
                    {d.featured && (
                      <span className="chip chip-featured">
                        <StarIcon /> Featured
                      </span>
                    )}
                  </div>
                  <h3 className="domain-item-name">{d.name}</h3>
                  <p className="domain-item-price">
                    {formatPrice(d.price)}
                    <span> · Buy now or offer</span>
                  </p>
                  <div className="domain-item-actions">
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => startOffer(d.name)}>
                      Make an offer
                    </button>
                    <a
                      className="btn btn-icon"
                      href={whatsappLink(`Hello! I would like to get information about ${d.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ask about ${d.name} on WhatsApp`}
                    >
                      <WhatsAppIcon />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq" aria-labelledby="faq-title">
          <div className="wrap faq-inner">
            <div className="section-head section-head-left reveal">
              <p className="kicker">FAQ</p>
              <h2 id="faq-title">Frequently asked questions</h2>
              <p className="section-lead">
                Everything you need to know about buying Coin14.com. Still have a question?{' '}
                <a href={whatsappLink('Hello! I have a question about Coin14.com.')} target="_blank" rel="noopener noreferrer">
                  Ask us on WhatsApp
                </a>
                .
              </p>
            </div>
            <div className="faq-list">
              {faqs.map((item, i) => (
                <details className="faq-item reveal" key={item.q} open={i === 0}>
                  <summary>
                    <h3>{item.q}</h3>
                    <ChevronIcon />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Offer form */}
        <section className="section offer-section" id="offer" aria-labelledby="offer-title">
          <div className="wrap offer-inner">
            <div className="offer-copy reveal">
              <p className="kicker">Make an offer</p>
              <h2 id="offer-title">Ready to own Coin14.com?</h2>
              <p className="section-lead">
                Buy now for {formatPrice(site.price)} or send your best offer. Your message opens in WhatsApp so you get
                a direct, fast reply from the owner.
              </p>
              <ul className="offer-points">
                <li>
                  <ShieldIcon /> Escrow-protected payment
                </li>
                <li>
                  <BoltIcon /> Transfer starts right after payment
                </li>
                <li>
                  <WalletIcon /> BTC, ETH, USDT or USD
                </li>
              </ul>
              <a className="whatsapp-direct" href={whatsappLink(`Hello! I'm interested in ${site.domain}.`)} target="_blank" rel="noopener noreferrer">
                <span className="whatsapp-direct-icon">
                  <WhatsAppIcon />
                </span>
                <span>
                  <small>Prefer to chat directly?</small>
                  {site.phoneDisplay}
                </span>
              </a>
            </div>

            <div className="form-card reveal">
              {sentLink ? (
                <div className="form-success" role="status">
                  <span className="success-icon">
                    <CheckIcon />
                  </span>
                  <h3>Thank you for your offer!</h3>
                  <p>
                    WhatsApp has opened with your details — just press send. If it didn&rsquo;t open,{' '}
                    <a href={sentLink} target="_blank" rel="noopener noreferrer">
                      click here
                    </a>
                    .
                  </p>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSentLink(null)}>
                    Send another offer
                  </button>
                </div>
              ) : (
                <form className="offer-form" onSubmit={handleSubmit}>
                  <div className="field">
                    <label htmlFor="offer-name">Full name *</label>
                    <input id="offer-name" name="name" type="text" autoComplete="name" required value={form.name} onChange={handleChange} placeholder="Satoshi Nakamoto" />
                  </div>
                  <div className="field">
                    <label htmlFor="offer-email">Email *</label>
                    <input id="offer-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange} placeholder="you@company.com" />
                  </div>
                  <div className="field">
                    <label htmlFor="offer-phone">Phone</label>
                    <input id="offer-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="+1 555 000 0000" />
                  </div>
                  <div className="field">
                    <label htmlFor="offer-amount">Your offer (USD)</label>
                    <input id="offer-amount" name="offer" type="number" inputMode="numeric" min={1} step={1} value={form.offer} onChange={handleChange} placeholder={String(site.price)} />
                  </div>
                  <div className="field field-full">
                    <label htmlFor="offer-domain">Domain</label>
                    <select id="offer-domain" name="domain" value={form.domain} onChange={handleChange}>
                      <option value={site.domain}>
                        {site.domain} — {formatPrice(site.price)}
                      </option>
                      {portfolio.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name} — {formatPrice(d.price)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field field-full">
                    <label htmlFor="offer-message">Message</label>
                    <textarea id="offer-message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell us about your project or preferred payment method" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg field-full">
                    <WhatsAppIcon /> Send offer via WhatsApp
                  </button>
                  <p className="form-note field-full">No spam. Your details are only used to reply to your offer.</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              Coin14.com is a premium .com domain name offered for sale by its owner. Secure escrow, crypto and USD
              payments accepted.
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="footer-title">Explore</p>
            <ul>
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="footer-title">Featured domains</p>
            <ul>
              {portfolio
                .filter((d) => d.featured)
                .map((d) => (
                  <li key={d.name}>{d.name}</li>
                ))}
            </ul>
          </div>
          <div>
            <p className="footer-title">Contact</p>
            <ul>
              <li>
                <a href={whatsappLink(`Hello! I'm interested in ${site.domain}.`)} target="_blank" rel="noopener noreferrer">
                  WhatsApp: {site.phoneDisplay}
                </a>
              </li>
              <li>24/7 support</li>
            </ul>
            <ul className="footer-pay" aria-label="Accepted payments">
              {PAYMENT_METHODS.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <p suppressHydrationWarning>© {year} Coin14.com. All rights reserved.</p>
          <p>Coin14.com is a domain name for sale and is not affiliated with any cryptocurrency exchange or token.</p>
        </div>
      </footer>

      <a className="fab" href={buyNowLink} target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp">
        <WhatsAppIcon />
      </a>
    </>
  );
}
