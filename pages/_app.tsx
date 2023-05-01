import Head from "next/head";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Voyage from "@/components/Voyage";
import { About } from "@/components/About";
import Navbar from "@/components/Navbar";
import { Novu } from "@/components/Novu";
import LoginBtn from "@/components/login-btn";
import VoyageData from "@/data/VoyageData.json";
import { SessionProvider, useSession } from "next-auth/react";
import { ClerkProvider } from "@clerk/nextjs";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <div className="bg-primary-black">
        <div className=" p-4">
          <Navbar />
          <div className="p-4" />
          {VoyageData.voyages.map((voyage) => (
            <Voyage />
          ))}
          <Novu />
        </div>
      </div>
    </ClerkProvider>
  );
}

export default MyApp;
