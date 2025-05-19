import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/404.module.css'
import { GetStaticProps } from 'next'

export default function Custom404() {
  return (
    <div className={styles.errorContainer}>
      <Head>
        <title>404 - Sayfa Bulunamadı</title>
        <meta name="description" content="Sayfa bulunamadı" />
        <meta name="robots" content="noindex" />
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

// Next.js'in static site generation özelliğini kullanarak 
// bu sayfayı build sırasında oluşturalım
export const getStaticProps: GetStaticProps = () => {
  return {
    props: {}, // Boş props
    // Diğer tüm 404 rotalarını buraya yönlendirecek
    notFound: false
  }
} 