import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Akropolis score pad</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="description" content="Akropolis board game scoring pad web app."></meta>
        <meta name="keywords" content="Akropolis, board game, game, board game scoring, score pad, scorekeeping, score sheet"></meta>
      </Head>
      <body 
        className="bg-[url('/img/background.jpg')] text-sm lg:text-xl"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
