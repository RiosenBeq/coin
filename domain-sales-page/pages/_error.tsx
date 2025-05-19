import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/404.module.css';

interface ErrorProps {
  statusCode?: number;
}

const CustomError: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className={styles.errorContainer}>
      <Head>
        <title>{statusCode ? `Hata ${statusCode}` : 'Sunucu Hatası'}</title>
        <meta name="description" content={statusCode ? `Hata ${statusCode}` : 'Sunucu Hatası'} />
        <meta name="robots" content="noindex" />
      </Head>
      <div className={styles.errorContent}>
        <h1>{statusCode || 'Hata'}</h1>
        <h2>Bir sorun oluştu</h2>
        <p>
          {statusCode
            ? `Sunucuda ${statusCode} hata kodu ile bir sorun oluştu.`
            : 'İstek işlenirken bir hata oluştu.'}
        </p>
        <Link href="/" className={styles.backButton}>
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
};

CustomError.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res ? res.statusCode : err ? (err as any).statusCode : 404;
  return { statusCode };
};

export default CustomError; 