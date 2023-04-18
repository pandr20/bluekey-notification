import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Voyage from '@/components/Voyage';
import { About } from '@/components/About';
import Navbar from '@/components/Navbar';
import LoginBtn from '@/components/login-btn';
import VoyageData from '@/data/VoyageData.json';
import { SessionProvider, useSession } from "next-auth/react";
import { ClerkProvider, SignInButton } from '@clerk/nextjs';


function MyApp({ Component, pageProps }: AppProps) {


  
  return (
    <ClerkProvider {...pageProps} >
      <div className="bg-primary-black">
        <div className=" p-4">
          <Navbar />
          <About />
          {VoyageData.voyages.map((voyage) => (
            <Voyage key={voyage.id} voyage={voyage} />
          ))}
        </div>
      </div>
      </ClerkProvider>
      
  );
}

export default MyApp
