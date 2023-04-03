import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Voyage from '@/components/Voyage';
import { About } from '@/components/About';
import Navbar from '@/components/Navbar';
import VoyageData from '@/data/VoyageData.json';

function HomePage() {
  return (
    <div className="bg-primary-black">
      <div className="bg-black p-4">
        <Navbar />
        <About />
        {VoyageData.voyages.map((voyage) => (
          <Voyage key={voyage.id} voyage={voyage} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
