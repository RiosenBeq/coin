import Head from 'next/head';
import Link from 'next/link';
import { CoinMark } from '../components/Logo';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found | Coin14.com</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="not-found">
        <CoinMark size={72} className="coin-float" />
        <p className="kicker">Error 404</p>
        <h1>This page doesn&rsquo;t exist</h1>
        <p className="section-lead">But Coin14.com is still for sale.</p>
        <Link className="btn btn-primary btn-lg" href="/">
          Back to Coin14.com
        </Link>
      </main>
    </>
  );
}
