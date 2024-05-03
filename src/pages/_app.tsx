import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { FaArrowUp } from "react-icons/fa";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/Redux/store";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {

    const [scrollUpShown, setScroolUpShown] = useState(false)
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
        Aos.init()
        window.addEventListener('scroll', () => setScroolUpShown(window.pageYOffset > 0 ? true : false))
        return () => window.removeEventListener('scroll', () => { setScroolUpShown(window.pageYOffset > 0 ? true : false) })
    }, [])


    if (!isHydrated) return <div className='text-[30px] text-red-600 fixed inset-0 w-full h-screen text-center flex items-center bg-secondary-black justify-center'>بروزرسانی...</div>;

    return (
        <>
            <Head>
                <link rel="icon" href="/images/fav-logo.png"></link>
                <title>پی سی کالا | رقابت قدرت </title>
            </Head>

            <Toaster />

            <span onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} className={`xl:fixed z-50 xl:flex items-center justify-center hidden ${scrollUpShown ? 'left-8 opacity-100' : '-left-8 opacity-0'} border border-white/30 cursor-pointer transition-all rounded-md bottom-12 bg-secondary-black text-white size-12 ch:size-5`}><FaArrowUp /></span>

            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}
