import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Aos from 'aos'
import { FaArrowUp } from "react-icons/fa";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/Redux/store";

export default function App({ Component, pageProps }: AppProps) {

  const [scrollUpShown, setScroolUpShown] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => setScroolUpShown(window.pageYOffset > 0 ? true : false))
    return () => window.removeEventListener('scroll', () => { setScroolUpShown(window.pageYOffset > 0 ? true : false) })
  }, [])

  useEffect(() => { setIsHydrated(true), Aos.init() }, []);

  if (!isHydrated) return <div className='text-[30px] text-red-600 text-center flex items-center bg-secondary-black justify-center'>Loading...</div>;

  return (
    <>
      <Head>
        <link rel="icon" href="/images/fav-logo.png"></link>
        <title>پی سی کالا | رقابت قدرت </title>
      </Head>
      <span
        onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
        className={`xl:fixed z-50 xl:flex items-center justify-center hidden left-10 ${scrollUpShown ? 'left-10 opacity-100' : '-left-12 opacity-0'} border border-white/30 cursor-pointer duration-400 rounded-md bottom-12 bg-secondary-black transition-all text-white size-12 ch:size-5`}><FaArrowUp /></span>

      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
