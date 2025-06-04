// pages/index.js
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const inputRef = useRef(null);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [inputValue, setInputValue] = useState('');

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
        script.defer = true;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted address:', inputValue);
  };

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>Get a Cash Offer | Every State House Buyers</title>
        <meta
          name="description"
          content="Sell your house with the click of a button. Get your free cash offer now from Every State House Buyers."
        />
      </Head>

      {/* 🔴 Top Red Banner */}
      <div className="bg-red-700 text-white text-xs sm:text-sm font-semibold text-center px-4 py-2">
        NO FEES. NO REPAIRS. NO AGENTS. JUST A FAST CASH OFFER.
      </div>

      {/* 🏠 Logo + Call */}
      <div className="bg-white flex flex-col items-center justify-center pt-3 pb-4 shadow-sm space-y-2">
        <Image
          src="/images/logo.webp"
          alt="Every State House Buyers logo"
          width={200}
          height={64}
          className="w-[160px] h-auto"
          priority
        />
        <a
          href="tel:1-800-555-1234"
          className="bg-blue-600 text-white text-sm font-semibold px-5 py-1.5 rounded"
        >
          (800) 555-1234
        </a>
      </div>

      {/* 🖼️ Hero Background */}
      <div className="relative min-h-[80vh] sm:min-h-[90vh]">
        <Image
          src="/images/mobile-bg.avif"
          alt="Neighborhood aerial"
          fill
          sizes="100vw"
          priority
          placeholder="blur"
          blurDataURL="/images/mobile-bg-blur.webp"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-black/30 z-0" />

        {/* Hero Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-white text-center">
          <h1 className="text-2xl font-bold mb-3 drop-shadow-sm leading-tight">
            Get a cash offer for your home<br />with the click of a button
          </h1>

          {/* 📝 Address Form */}
          <form
            className="flex w-full max-w-md bg-white rounded-md overflow-hidden shadow-md"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Enter your home address"
              className="flex-grow px-4 py-3 text-black text-sm outline-none"
              aria-label="Enter your home address"
              id="address-input"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-3 text-sm font-semibold"
            >
              Get Offer
            </button>
          </form>

          {/* 💬 Subheadline */}
          <p className="text-white/90 text-xs mt-3 max-w-xs">
            Our team will review your address and send you a no-obligation cash offer.
          </p>

          {/* ⭐ Reviews Badge */}
          <div className="bg-white mt-6 rounded-xl p-3 shadow-sm w-full max-w-xs">
            <Image
              src="/images/reviews-badge.webp"
              alt="4.9 out of 5 stars"
              width={240}
              height={40}
              className="mx-auto"
            />
            <p className="text-center text-xs text-black mt-1">
              4.9 out of 5 rating from 387+ sellers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
