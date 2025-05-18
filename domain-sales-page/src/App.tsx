import React, { useState } from 'react';
import './App.css';
import { Helmet } from 'react-helmet';

function App() {
  const [domainInfo] = useState({
    name: 'Coin14.com',
    price: 2000,
    features: [
      'Premium Crypto Domain',
      'Instant Transfer',
      'Secure Escrow',
      '24/7 Support',
      'Perfect for Crypto Projects'
    ]
  });

  const [otherDomains] = useState([
    { name: 'cointype.net', category: 'Crypto', price: 1800, featured: true },
    { name: 'coinmarkt.org', category: 'Crypto', price: 1500, featured: true },
    { name: 'anlikcoinfiyatlari.com', category: 'Crypto', price: 1200, featured: false },
    { name: 'buaze.com', category: 'Business', price: 950, featured: false },
    { name: 'cryptobase360.com', category: 'Crypto', price: 2200, featured: true },
    { name: 'aybuke.org', category: 'Personal', price: 800, featured: false },
    { name: 'marshotel.org', category: 'Travel', price: 10000, featured: true },
    { name: 'markalarin.com', category: 'Business', price: 1500, featured: true },
    { name: 'markalarim.com', category: 'Business', price: 1400, featured: false }
  ]);

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    domainInterest: 'Coin14.com'
  });

  // English translations only
  const t = {
    home: 'Home',
    features: 'Features',
    portfolio: 'Portfolio',
    contact: 'Contact',
    heroPrimary: 'Premium Crypto Domain:',
    heroSubtitle: 'Launch your crypto project with a memorable domain that converts',
    buyNow: 'Buy Now',
    premiumCryptoDomain: 'Premium Crypto Domain',
    whyChoose: 'Why Choose This Domain?',
    limitedOffer: 'Limited Time Offer!',
    secureNow: 'Secure This Domain Now',
    sellsFast: 'Premium crypto domains sell fast. Secure this domain today for just',
    domainPortfolio: 'Our Domain Portfolio',
    browseCollection: 'Browse our collection of premium domains available for purchase',
    featuredDomains: 'Featured Domains',
    allDomains: 'All Domains',
    price: 'Price:',
    inquire: 'Inquire',
    getDomain: 'Get This Domain Now',
    yourName: 'Your Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    yourMessage: 'Your Message',
    domainInterest: 'Domain of Interest',
    sendViaWhatsApp: 'Send via WhatsApp',
    sendViaEmail: 'Send via Email',
    contactUs: 'Contact Us',
    readyToSecure: 'Ready to secure a premium domain for your project? Contact us now for fast domain transfer.',
    weAccept: 'We accept:',
    quickLinks: 'Quick Links',
    allRightsReserved: 'All rights reserved',
    enterYourName: 'Enter your full name',
    enterYourEmail: 'Enter your email address',
    enterYourPhone: 'Enter your phone number',
    tellUsHowYouPlan: 'Tell us how you plan to use the domain'
  };

  // Sanitize user input to prevent XSS attacks
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!contactForm.name || !contactForm.email || !contactForm.phone || !contactForm.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Sanitize user inputs
    const sanitizedName = sanitizeInput(contactForm.name);
    const sanitizedEmail = sanitizeInput(contactForm.email);
    const sanitizedPhone = sanitizeInput(contactForm.phone);
    const sanitizedMessage = sanitizeInput(contactForm.message);
    const sanitizedDomainInterest = sanitizeInput(contactForm.domainInterest);
    
    // Format the message for WhatsApp
    const message = encodeURIComponent(
      `*Domain Inquiry: ${sanitizedDomainInterest}*\n\n` +
      `*Name:* ${sanitizedName}\n` +
      `*Email:* ${sanitizedEmail}\n` +
      `*Phone:* ${sanitizedPhone}\n` +
      `*Message:* ${sanitizedMessage}`
    );
    
    // Use rel="noopener noreferrer" for security when opening new tabs
    const whatsappWindow = window.open(`https://api.whatsapp.com/send?phone=905434123380&text=${message}`, '_blank');
    if (whatsappWindow) {
      whatsappWindow.opener = null;
    }
    
    // Reset form
    setContactForm({ name: '', email: '', phone: '', message: '', domainInterest: 'Coin14.com' });
  };

  const sendEmail = () => {
    // Sanitize user inputs
    const sanitizedName = sanitizeInput(contactForm.name);
    const sanitizedEmail = sanitizeInput(contactForm.email);
    const sanitizedPhone = sanitizeInput(contactForm.phone);
    const sanitizedMessage = sanitizeInput(contactForm.message);
    const sanitizedDomainInterest = sanitizeInput(contactForm.domainInterest);
    
    window.location.href = `mailto:riosenbeq@msn.com?subject=Domain Inquiry: ${encodeURIComponent(sanitizedDomainInterest)}&body=Name: ${encodeURIComponent(sanitizedName)}%0D%0AEmail: ${encodeURIComponent(sanitizedEmail)}%0D%0APhone: ${encodeURIComponent(sanitizedPhone)}%0D%0AMessage: ${encodeURIComponent(sanitizedMessage)}`;
  };

  // Always show all domains by default
  const [showFeatured, setShowFeatured] = useState(false);
  const filteredDomains = showFeatured 
    ? otherDomains.filter(domain => domain.featured) 
    : otherDomains;

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product", 
    "name": "Coin14.com",
    "description": "Premium cryptocurrency domain for sale",
    "offers": {
      "@type": "Offer",
      "price": domainInfo.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="App" lang="en">
      <Helmet>
        <title>Coin14.com - Premium Crypto Domain For Sale</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Premium cryptocurrency domain for sale - Coin14.com and other premium crypto domains at competitive prices." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <header className="header">
        <div className="container">
          <h1 className="logo">Coin14<span className="logo-dot">.</span>com</h1>
          <nav>
            <ul>
              <li><a href="#home">{t.home}</a></li>
              <li><a href="#features">{t.features}</a></li>
              <li><a href="#portfolio">{t.portfolio}</a></li>
              <li><a href="#contact">{t.contact}</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>{t.heroPrimary} <span className="highlight">{domainInfo.name}</span></h1>
            <p className="subtitle">{t.heroSubtitle}</p>
            <div className="price-tag">${domainInfo.price}</div>
            <a href="#contact" className="cta-button">{t.buyNow}</a>
          </div>
          <div className="hero-image">
            <div className="domain-card">
              <div className="domain-icon">
                <img src="https://img.icons8.com/fluency/96/null/bitcoin.png" alt="Bitcoin Icon" />
              </div>
              <h2>{domainInfo.name}</h2>
              <p>{t.premiumCryptoDomain}</p>
              <div className="crypto-badges">
                <span className="crypto-badge">BTC</span>
                <span className="crypto-badge">ETH</span>
                <span className="crypto-badge">NFT</span>
              </div>
            </div>
          </div>
        </div>
        <div className="crypto-animation">
          <div className="coin coin-1">₿</div>
          <div className="coin coin-2">Ξ</div>
          <div className="coin coin-3">₿</div>
          <div className="coin coin-4">Ξ</div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">{t.whyChoose}</h2>
          <div className="features-grid">
            {domainInfo.features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">✓</div>
                <h3>{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>{t.limitedOffer}</h2>
          <p>{t.sellsFast} ${domainInfo.price}.</p>
          <a href="#contact" className="cta-button">{t.secureNow}</a>
        </div>
      </section>

      <section id="portfolio" className="domain-portfolio">
        <div className="container">
          <h2 className="section-title">{t.domainPortfolio}</h2>
          <p className="portfolio-intro">{t.browseCollection}</p>
          
          <div className="portfolio-tabs">
            <button 
              className={`portfolio-tab ${showFeatured ? 'active' : ''}`}
              onClick={() => setShowFeatured(true)}
            >
              {t.featuredDomains}
            </button>
            <button 
              className={`portfolio-tab ${!showFeatured ? 'active' : ''}`}
              onClick={() => setShowFeatured(false)}
            >
              {t.allDomains}
            </button>
          </div>
          
          <div className="portfolio-grid">
            {filteredDomains.map((domain, index) => (
              <div key={index} className={`portfolio-item ${domain.featured ? 'featured' : ''}`}>
                <div className="portfolio-item-content">
                  <h3>{domain.name}</h3>
                  <span className="domain-category">{domain.category}</span>
                  <div className="domain-price">
                    <span>{t.price}</span>
                    <strong>${domain.price}</strong>
                  </div>
                  <a 
                    href="#contact" 
                    className="portfolio-cta"
                    onClick={() => setContactForm(prev => ({...prev, domainInterest: domain.name}))}
                  >
                    {t.inquire}
                  </a>
                  {domain.featured && <div className="featured-badge">Featured</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">{t.getDomain}</h2>
          <div className="contact-content">
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">{t.yourName}</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required 
                    placeholder={t.enterYourName}
                    maxLength={50}
                    pattern="[A-Za-z0-9\s]+"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t.emailAddress}</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required 
                    placeholder={t.enterYourEmail}
                    maxLength={100}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{t.phoneNumber}</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={contactForm.phone}
                    onChange={handleInputChange}
                    required 
                    placeholder={t.enterYourPhone}
                    maxLength={20}
                    pattern="[0-9+\-\s]+"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="domainInterest">{t.domainInterest}</label>
                  <select
                    id="domainInterest"
                    name="domainInterest"
                    value={contactForm.domainInterest}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Coin14.com">Coin14.com</option>
                    {otherDomains.map((domain, index) => (
                      <option key={index} value={domain.name}>{domain.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t.yourMessage}</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={3}
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    placeholder={t.tellUsHowYouPlan}
                    maxLength={500}
                  ></textarea>
                </div>
                <div className="contact-buttons">
                  <button type="submit" className="submit-button">
                    <span className="whatsapp-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </span>
                    {t.sendViaWhatsApp}
                  </button>
                  <button type="button" className="email-button" onClick={sendEmail}>
                    <span className="email-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </span>
                    {t.sendViaEmail}
                  </button>
                </div>
              </form>
            </div>
            <div className="contact-info">
              <h3>{t.contactUs}</h3>
              <p>{t.readyToSecure}</p>
              <ul>
                <li>📧 riosenbeq@msn.com</li>
                <li>📱 +90 543 412 3380</li>
                <li className="payment-options">
                  <span>{t.weAccept}</span>
                  <div className="crypto-payment-icons">
                    <span className="payment-icon">₿</span>
                    <span className="payment-icon">Ξ</span>
                    <span className="payment-icon">USDT</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>Coin14<span className="logo-dot">.</span>com</h2>
              <p>Premium cryptocurrency domain for sale. Perfect for exchanges, wallets, NFT marketplaces, and crypto businesses.</p>
            </div>
            <div className="footer-links">
              <h3>{t.quickLinks}</h3>
              <ul>
                <li><a href="#home">{t.home}</a></li>
                <li><a href="#features">{t.features}</a></li>
                <li><a href="#portfolio">{t.portfolio}</a></li>
                <li><a href="#contact">{t.contact}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Coin14.com. {t.allRightsReserved}.</p>
          </div>
        </div>
      </footer>
      
      {/* SEO Optimization Content */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <h1>Buy Coin14.com - Premium Cryptocurrency Domain For Sale</h1>
        <h2>Premium Crypto Domains - Coin14.com, cointype.net, coinmarkt.org, marshotel.org</h2>
        <p>
          Premium cryptocurrency domain names for sale. Perfect for crypto exchanges, wallets, 
          NFT marketplaces, and blockchain businesses. Buy premium crypto domains at competitive prices.
        </p>
        <p>
          Keywords: cryptocurrency domain, crypto domain name, bitcoin domain, ethereum domain, 
          blockchain domain, NFT domain, crypto exchange domain, premium domain names
        </p>
      </div>
    </div>
  );
}

export default App;
