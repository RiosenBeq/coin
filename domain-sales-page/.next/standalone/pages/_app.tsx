import '../styles/globals.css';
import '../styles/App.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ErrorPage = dynamic(() => import('./404'));
const CustomErrorPage = dynamic(() => import('./_error'));

interface MyAppProps extends AppProps {
  err?: any;
}

function MyApp({ Component, pageProps, err }: MyAppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log(`Navigating to: ${url}`);
    };

    const handleRouteChangeError = (err: any, url: string) => {
      console.error(`Error navigating to ${url}:`, err);
      if (err.cancelled) {
        console.log('Route change was cancelled');
      } else {
        router.push('/404');
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  if (err) {
    return <CustomErrorPage statusCode={err.statusCode || 500} />;
  }

  return <Component {...pageProps} />;
}

export default MyApp; 