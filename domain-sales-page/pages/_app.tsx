import React from 'react';
import '../styles/globals.css';
import '../styles/App.css';
import type { AppProps } from 'next/app';
import { NextPageContext } from 'next';

type MyAppProps = AppProps & {
  err?: Error;
};

function MyApp({ Component, pageProps, err }: MyAppProps) {
  return <Component {...pageProps} err={err} />;
}

MyApp.getInitialProps = async ({ Component, ctx }: { Component: any; ctx: NextPageContext }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // Herhangi bir hata durumunu yakala
  if (ctx.err) {
    console.error('Error in _app.getInitialProps:', ctx.err);
  }

  return { pageProps };
};

export default MyApp; 