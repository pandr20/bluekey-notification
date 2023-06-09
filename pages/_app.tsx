import Head from "next/head";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Voyage from "@/components/Voyage";
import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ClerkProvider } from "@clerk/nextjs";

function MyApp({ pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <ClerkProvider {...pageProps}>
        <div className="bg-primary-black">
          <div className=" p-4">
            <Navbar />
            <div className="p-4" />
            <Voyage />
          </div>
        </div>
      </ClerkProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
