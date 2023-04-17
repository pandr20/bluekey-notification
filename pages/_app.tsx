import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Voyage from '@/components/Voyage';
import { About } from '@/components/About';
import Navbar from '@/components/Navbar';
import LoginBtn from '@/components/login-btn';
import VoyageData from '@/data/VoyageData.json';
import { SessionProvider, useSession } from "next-auth/react";


function MyApp({ Component, pageProps }: AppProps) {


  
  return (
    <SessionProvider
    // Provider options are not required but can be useful in situations where
    // you have a short session maxAge time. Shown here with default values.
    session={pageProps.session}
  >
      <div className="bg-primary-black">
        <div className=" p-4">
          <Navbar />
          <About />
          {VoyageData.voyages.map((voyage) => (
            <Voyage key={voyage.id} voyage={voyage} />
          ))}
          <LoginBtn />
        </div>
      </div>
      </SessionProvider>
  );
}

export default MyApp
