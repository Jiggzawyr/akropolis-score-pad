import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Akropolis score pad</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="description" content="Akropolis board game scoring pad web app."></meta>
        <meta name="keywords" content="Akropolis, board game, game, board game scoring, score pad, scorekeeping, score sheet"></meta>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
