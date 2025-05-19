import '../styles/globals.css';
import '../styles/App.css';
import type { AppProps } from 'next/app';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
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

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async ({ Component, ctx }: any) => {
  let pageProps = {};

  try {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
  } catch (error) {
    console.error('Error in getInitialProps:', error);
    if (ctx.res) {
      ctx.res.statusCode = 404;
    }
    return { pageProps: { statusCode: 404 } };
  }

  return { pageProps };
};

export default MyApp; 