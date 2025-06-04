import Image from 'next/image';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const inputRef = useRef(null);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Load Google Maps script only after 2+ characters are typed
  useEffect(() => {
    if (
      !mapsLoaded &&
      typeof window !== 'undefined' &&
      inputRef.current &&
      inputValue.length >= 2
    ) {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.onload = () => setMapsLoaded(true);
        document.body.appendChild(script);
      }
    }
  }, [inputValue, mapsLoaded]);

  useEffect(() => {
    if (mapsLoaded && window.google && inputRef.current) {
      new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us' },
      });
    }
  }, [mapsLoaded]);

  return (
    <div>
      <Head>
        <title>Get a Cash Offer | Every State House Buyers</title>
        <meta
          name="description"
          content="Sell your house with the click of a button. Get your free cash offer now from Every State House Buyers."
        />
        {/* Preload hero image for LCP */}
        <link
          rel="preload"
          as="image"
          href="/images/mobile-bg.webp"
          imagesrcset="/images/mobile-bg.webp"
          imagesizes="100vw"
        />
      </Head>

      {/* Logo Header */}
      <header className="w-full bg-white flex flex-col items-center py-4 shadow-sm">
        <Image
          src="/images/logo.webp"
          alt="Every State House Buyers logo"
          width={180}
          height={48}
          priority={false}
        />
        <a
          href="tel:1-800-555-1234"
          className="mt-2 text-base font-medium text-blue-700"
          aria-label="Call Every State House Buyers"
        >
          (800) 555-1234
        </a>
      </header>

      {/* Mobile Hero Section */}
      <div className="relative min-h-screen md:hidden">
        <Image
          src="/images/mobile-bg.webp"
          alt="Aerial neighborhood view"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          placeholder="blur"
          blurDataURL="/images/mobile-bg-blur.webp"
        />
        <div className="absolute inset-0 bg-black/30 z-0" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-24 px-4 text-white text-center">
          {/* Headline & Subtext */}
          <h1 className="text-2xl font-bold mb-2 drop-shadow-sm">
            Get a cash offer for your home<br />with the click of a button
          </h1>
          <p className="text-white/90 text-sm mb-4">
            Enter your address to get your instant offer.
          </p>

          {/* Address Form */}
          <form className="w-full max-w-sm sticky top-4" autoComplete="off">
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Enter your home address"
              className="w-full px-4 py-3 rounded-t-md text-black text-sm border border-gray-200"
              aria-label="Enter your home address"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-b-md text-sm"
            >
              Get Offer
            </button>
          </form>

          {/* Reviews Badge */}
          <div className="mt-6 flex flex-col items-center text-xs text-white/80">
            <Image
              src="/images/reviews-badge.webp"
              alt="Rated 4.9 out of 5 stars by 387+ sellers"
              width={140}
              height={30}
              loading="lazy"
            />
            <p>Rated 4.9 out of 5 by 387+ sellers</p>
          </div>
        </div>
      </div>
    </div>
  );
}