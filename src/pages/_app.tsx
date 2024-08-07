import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Aos from 'aos'
import Modal from '../components/Modal'
import 'aos/dist/aos.css'
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/Redux/store";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/ScrollToTop";
import FetchOnLoad from "@/components/FetchOnLoad";
import 'react-loading-skeleton'
import prefix from "@/config/prefix";
import dynamic from "next/dynamic";


const DynamicNextProgress = dynamic(async () => await import('nextjs-progressbar'))


export default function App({ Component, pageProps }: AppProps) {

    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => { setIsHydrated(true), Aos.init() }, [])

    if (!isHydrated) return <div className='text-[30px] text-red-600 fixed inset-0 w-full h-screen text-center flex items-center bg-secondary-black justify-center'>بروزرسانی...</div>;

    return (
        <main>
            <Head>
                <link rel="icon" href={`${prefix}/images/fav-logo.png`}></link>
                <title>پی سی کالا | رقابت قدرت </title>
            </Head>

            <Provider store={store}>
                <FetchOnLoad />
                <Toaster />
                <ScrollToTop />
                <Modal />
                <DynamicNextProgress showOnShallow height={location.href.includes('admin-panel') ? 2 : 1} options={{ showSpinner: false, }} startPosition={0} color={location.href.includes('admin-panel') ? '#E30017' : '#FFD300'} />
                <Component {...pageProps} />
            </Provider>
        </main>
    );
}