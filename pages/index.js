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
        script.async = false;
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
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        />
      </Head>

      {/* 🔴 Red Top Banner */}
      <div className="bg-red-700 text-white text-xs sm:text-sm font-semibold text-center px-4 py-2">
        NO FEES. NO REPAIRS. NO AGENTS. JUST A FAST CASH OFFER.
      </div>

      {/* 🏠 Logo + Phone (Desktop: Left/Right | Mobile: Centered) */}
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-sm">
        <div className="w-full flex justify-center md:justify-start">
          <Image
            src="/images/logo.webp"
            alt="Every State House Buyers logo"
            width={160}
            height={160}
            className="w-[120px] h-auto"
            priority
          />
        </div>
        <div className="hidden md:block">
          <a
            href="tel:1-800-555-1234"
            className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded"
          >
            (800) 555-1234
          </a>
        </div>
      </div>

      {/* Mobile call button */}
      <div className="md:hidden text-center mt-2">
        <a
          href="tel:1-800-555-1234"
          className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded"
        >
          (800) 555-1234
        </a>
      </div>

      {/* 🖼️ Hero Section */}
      <div className="relative min-h-screen md:min-h-[90vh]">
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

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-white text-center">
          <h1 className="text-2xl font-bold mb-3 drop-shadow-sm">
            Get a cash offer for your home<br />with the click of a button
          </h1>

          {/* 📝 Horizontal Form */}
          <form
            className="flex w-full max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md"
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
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-3 text-sm font-semibold"
            >
              Get Offer
            </button>
          </form>

          {/* 💬 Subheadline */}
          <p className="text-white/90 text-xs mt-3">
            Our team will review your address and send you a no-obligation cash offer.
          </p>

          {/* ⭐ Reviews Section */}
          <div className="mt-5 bg-white px-4 py-3 rounded-md shadow-md text-black text-sm">
            <div className="flex items-center justify-center space-x-2">
              <Image
                src="/images/stars.webp"
                alt="5-star rating"
                width={100}
                height={20}
                className="h-auto"
              />
              <span>4.9 out of 5 rating from 387+ sellers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
