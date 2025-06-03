import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

export default function Home() {
  const inputRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us' },
      });
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Get a Cash Offer | Every State House Buyers</title>
        <meta
          name="description"
          content="Sell your house with the click of a button. Get your free cash offer now from Every State House Buyers."
        />
      </Head>

      {/* Google Maps Autocomplete */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCm96dFKB74A2Sg0dtpKTyJIZ9BXEkLZug&libraries=places`}
        strategy="beforeInteractive"
      />

      {/* Mobile Hero Section */}
      <div className="relative min-h-screen md:hidden">
        <Image
          src="/images/mobile-bg.webp"
          alt="Aerial neighborhood view"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/30 z-0" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-8 px-4 text-white text-center">
          <div className="mb-4">
            <Image src="/logo.png" alt="Every State House Buyers" width={160} height={40} />
          </div>

          <a href="tel:1-800-555-1234" className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-full mb-6">
            📞 (800) 555-1234
          </a>

          <h1 className="text-2xl font-bold mb-2 drop-shadow-sm leading-tight">
            Get a cash offer for your home<br />with the click of a button
          </h1>
          <p className="text-white/90 text-sm mb-4">
            Enter your address to get your instant offer.
          </p>

          <form className="w-full max-w-sm sticky top-4">
            <input
              type="text"
              ref={inputRef}
              placeholder="Enter your home address"
              className="w-full px-4 py-3 rounded-t-md text-black text-sm border border-gray-200"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-b-md text-sm"
            >
              Get Offer
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center text-xs text-white/80">
            <Image
              src="/reviews-badge.png"
              alt="Rated 4.9 out of 5 stars"
              width={120}
              height={20}
            />
            <p>Rated 4.9 out of 5 by 387+ sellers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
