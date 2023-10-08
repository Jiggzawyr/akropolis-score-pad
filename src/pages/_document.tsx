import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <body 
        className="bg-[url('/img/background.jpg')] text-sm lg:text-xl"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
