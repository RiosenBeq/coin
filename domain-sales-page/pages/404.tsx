import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function Custom404() {
  return (
    <div className="error-page">
      <Head>
        <title>404 - Sayfa Bulunamadı | Coin14.com</title>
        <meta name="description" content="Aradığınız sayfa bulunamadı." />
      </Head>
      <div className="error-container">
        <h1>404</h1>
        <h2>Sayfa Bulunamadı</h2>
        <p>Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.</p>
        <Link href="/" className="back-home-btn">
          Ana Sayfaya Dön
        </Link>
      </div>
      <style jsx>{`
        .error-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, var(--dark-bg), var(--accent-color));
          text-align: center;
          color: white;
        }
        .error-container {
          padding: 2rem;
          max-width: 500px;
        }
        h1 {
          font-size: 8rem;
          margin: 0;
          color: var(--primary-color);
          text-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        h2 {
          font-size: 2rem;
          margin: 0 0 1.5rem;
        }
        p {
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }
        .back-home-btn {
          display: inline-block;
          background-color: var(--primary-color);
          color: white;
          padding: 0.8rem 1.6rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          transition: all 0.3s;
        }
        .back-home-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  )
} 