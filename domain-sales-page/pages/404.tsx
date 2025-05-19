import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/404.module.css'

export default function Custom404() {
  return (
    <div className={styles.errorContainer}>
      <Head>
        <title>404 - Sayfa Bulunamadı</title>
        <meta name="description" content="Sayfa bulunamadı" />
      </Head>
      <div className={styles.errorContent}>
        <h1>404</h1>
        <h2>Sayfa Bulunamadı</h2>
        <p>Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
        <Link href="/" className={styles.backButton}>
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  )
} 