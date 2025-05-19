import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';

export default function Home() {
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

  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Animation for page loading effect
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Domain filtering
  const filteredDomains = activeFilter === 'all' 
    ? otherDomains
    : activeFilter === 'featured'
      ? otherDomains.filter(domain => domain.featured)
      : otherDomains.filter(domain => domain.category === activeFilter);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form validation
  const validateForm = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      alert('Please fill in all required fields');
      return false;
    }
    return true;
  };

  // WhatsApp message sending for direct contact button
  const handleWhatsAppContact = (domainName: string) => {
    const message = encodeURIComponent(`Hello, I would like to get information about the ${domainName} domain.`);
    window.open(`https://api.whatsapp.com/send?phone=905434123380&text=${message}`, '_blank', 'noopener,noreferrer');
  };

  // WhatsApp form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Format the message for WhatsApp
    const message = encodeURIComponent(
      `*Domain Inquiry: ${contactForm.domainInterest}*\n\n` +
      `*Name:* ${contactForm.name}\n` +
      `*Email:* ${contactForm.email}\n` +
      `*Phone:* ${contactForm.phone}\n` +
      `*Message:* ${contactForm.message || 'No additional message'}`
    );
    
    // Open WhatsApp with the formatted message
    window.open(`https://api.whatsapp.com/send?phone=905434123380&text=${message}`, '_blank', 'noopener,noreferrer');
    
    // Reset form and show success message
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        domainInterest: 'Coin14.com'
      });
    }, 3000);
  };

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
    <div className={`container ${isLoaded ? 'fade-in' : ''}`} style={{animation: isLoaded ? 'fadeIn 1s ease' : 'none'}}>
      <Head>
        <title>Coin14.com - Premium Crypto Domain For Sale</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Premium cryptocurrency domains for sale - Coin14.com and other premium crypto domains at competitive prices." />
        <meta name="google-site-verification" content="_ADTcIHHfzLq7yjeBm0s0R7lqx79bLS8urmEEtlIxsU" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://img.icons8.com data:; connect-src 'self' https://api.whatsapp.com; frame-src 'none';" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <header className="header">
        <div className="header-content">
          <h1 className="logo">COIN14<span className="logo-dot">.COM</span></h1>
          <div className="header-contact">
            <a href="https://wa.me/905434123380" className="whatsapp-badge">
              <Image 
                src="/icons/whatsapp.png" 
                alt="WhatsApp" 
                width={24} 
                height={24}
              />
              +90 543 412 33 80
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section-simple">
          <div className="hero-content-simple">
            <h1>Premium Crypto Domain For Sale</h1>
            <div className="domain-highlight-simple">
              <h2>{domainInfo.name}</h2>
              <p className="price-tag-simple">${domainInfo.price.toLocaleString()}</p>
              <div className="domain-features-simple">
                {domainInfo.features.map((feature, index) => (
                  <span key={index}>✓ {feature}</span>
                ))}
              </div>
              <button 
                className="cta-button-simple" 
                onClick={() => handleWhatsAppContact(domainInfo.name)}
              >
                <Image 
                  src="/icons/whatsapp.png" 
                  alt="WhatsApp" 
                  width={24} 
                  height={24}
                />
                Contact Now
              </button>
            </div>
          </div>
        </section>

        <section className="domain-portfolio">
          <h2 className="section-title">Our Premium Domain Portfolio</h2>
          
          <div className="domain-filter">
            <button 
              className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Domains
            </button>
            <button 
              className={`filter-button ${activeFilter === 'featured' ? 'active' : ''}`}
              onClick={() => setActiveFilter('featured')}
            >
              Featured
            </button>
            <button 
              className={`filter-button ${activeFilter === 'Crypto' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Crypto')}
            >
              Crypto
            </button>
            <button 
              className={`filter-button ${activeFilter === 'Business' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Business')}
            >
              Business
            </button>
          </div>
          
          <div className="domain-grid">
            {filteredDomains.map((domain, index) => (
              <div key={index} className="domain-card">
                <h3>{domain.name}</h3>
                <div className="domain-price">${domain.price}</div>
                <div className="domain-card-content">
                  <ul>
                    <li>Category: {domain.category}</li>
                    <li>{domain.featured ? 'Featured Domain' : 'Standard Domain'}</li>
                    <li>Instant Transfer</li>
                  </ul>
                  <button 
                    className="cta-button" 
                    onClick={() => handleWhatsAppContact(domain.name)}
                  >
                    Make Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{
          padding: '5rem 2rem',
          background: 'var(--dark-bg)',
          color: 'white',
          textAlign: 'center'
        }}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '2rem'}}>Why Premium Domains?</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '15px'}}>
              <h3 style={{marginBottom: '1rem', color: 'var(--primary-color)'}}>Brand Value</h3>
              <p>A premium domain enhances your brand's credibility and professionalism.</p>
            </div>
            <div style={{padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '15px'}}>
              <h3 style={{marginBottom: '1rem', color: 'var(--primary-color)'}}>SEO Advantage</h3>
              <p>Quality domains help you rank better in search engines.</p>
            </div>
            <div style={{padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '15px'}}>
              <h3 style={{marginBottom: '1rem', color: 'var(--primary-color)'}}>Investment Value</h3>
              <p>Premium domains can appreciate in value over time and be a good investment vehicle.</p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section">
          <div className="form-container">
            <h2 className="section-title">Interested in our domains?</h2>
            <p className="form-subtitle">Fill out the form below and we'll get back to you instantly via WhatsApp</p>
            
            {formSubmitted ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Thank you for your inquiry!</h3>
                <p>We've opened WhatsApp with your information. Click send to complete your request.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="contact-form">
                <div className="form-group">
                  <label>
                    <Image
                      src="/icons/user.png"
                      alt="User"
                      width={20}
                      height={20}
                    />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>
                    <Image
                      src="/icons/mail.png"
                      alt="Email"
                      width={20}
                      height={20}
                    />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>
                    <Image
                      src="/icons/phone.png"
                      alt="Phone"
                      width={20}
                      height={20}
                    />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>
                    <Image
                      src="/icons/domain.png"
                      alt="Domain"
                      width={20}
                      height={20}
                    />
                    Domain of Interest
                  </label>
                  <select
                    name="domainInterest"
                    value={contactForm.domainInterest}
                    onChange={handleInputChange}
                  >
                    <option value={domainInfo.name}>{domainInfo.name}</option>
                    {otherDomains.map((domain, index) => (
                      <option key={index} value={domain.name}>
                        {domain.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>
                    <Image
                      src="/icons/comments.png"
                      alt="Message"
                      width={20}
                      height={20}
                    />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    placeholder="Tell us your requirements or questions"
                    rows={4}
                  />
                </div>
                
                <button type="submit" className="form-submit-button">
                  <Image
                    src="/icons/whatsapp.png"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                  />
                  Submit via WhatsApp
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="payment-methods">
          <div className="payment-method">
            <Image src="/icons/bitcoin.png" alt="Bitcoin" width={30} height={30} />
          </div>
          <div className="payment-method">
            <span style={{ color: 'white', fontWeight: 'bold' }}>ETH</span>
          </div>
          <div className="payment-method">
            <span style={{ color: 'white', fontWeight: 'bold' }}>USDT</span>
          </div>
          <div className="payment-method">
            <span style={{ color: 'white', fontWeight: 'bold' }}>USD</span>
          </div>
        </div>
        
        <div className="social-links">
          <a href="#" className="social-link">
            <span>𝕏</span>
          </a>
          <a href="#" className="social-link">
            <span>𝕗</span>
          </a>
          <a href="#" className="social-link">
            <span>𝕚</span>
          </a>
          <a href="#" className="social-link">
            <span>𝕥</span>
          </a>
        </div>
        
        <div className="copyright">
          &copy; {new Date().getFullYear()} Coin14.com - All Rights Reserved
        </div>
      </footer>
      
      {/* Back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'var(--primary-color)',
          color: 'white',
          border: 'none',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          opacity: 0.8,
          transition: 'all 0.3s',
          zIndex: 999
        }}
      >
        ↑
      </button>
    </div>
  );
}

// Sayfa için statik önoluşturma yapılandırması
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
}; 