import '../styles/globals.css';
import '../styles/App.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Normal import kullanarak hata durumlarını daha iyi yönetiyoruz
import Custom404 from './404';
import CustomError from './_error';

interface MyAppProps extends AppProps {
  err?: any;
}

function MyApp({ Component, pageProps, err }: MyAppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log(`Navigating to: ${url}`);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  // Hata durumunda CustomError bileşenini göster
  if (err) {
    return <CustomError statusCode={err.statusCode || 500} />;
  }

  // 404 durumunu router ile yakalayıp yönetiyoruz
  if (router.pathname === '/404') {
    return <Custom404 />;
  }

  return <Component {...pageProps} />;
}

export default MyApp; 