import GlobalStyle from '@/styles/pages/GlobalStyle'


export default function MyApp({ Component, pageProps }) {
  return (

    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}


