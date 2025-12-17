import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const inputRef = useRef(null);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Load Google Maps script only after the user starts typing
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
      } else {
        setMapsLoaded(true);
      }
    }
  }, [inputValue, mapsLoaded]);

  // Initialize Google Places Autocomplete once the script is loaded
  useEffect(() => {
    if (
      mapsLoaded &&
      typeof window !== 'undefined' &&
      window.google &&
      inputRef.current
    ) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ['address'],
          componentRestrictions: { country: 'us' },
        }
      );

      return () => {
        if (autocomplete && autocomplete.unbindAll) {
          autocomplete.unbindAll();
        }
      };
    }
  }, [mapsLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later we can wire this up to /address/verify
    console.log('Submitted address:', inputValue);
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Get a Cash Offer | Every State House Buyers</title>
        <meta
          name="description"
          content="Sell your house with the click of a button. Get your free cash offer now from Every State House Buyers."
        />
        {/* Preload mobile hero (LCP on phones) */}
        <link
          rel="preload"
          as="image"
          href="/images/mobile-bg.avif"
          imagesrcset="/images/mobile-bg.avif"
          imagesizes="100vw"
          type="image/avif"
        />
        {/* Preload desktop hero with couple */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-couple.webp"
          imagesrcset="/images/hero-couple.webp"
          imagesizes="100vw"
          type="image/webp"
        />
        {/* Preload logo to avoid CLS */}
        <link
          rel="preload"
          as="image"
          href="/images/logo.webp"
          imagesrcset="/images/logo.webp"
          imagesizes="180px"
          type="image/webp"
        />
      </Head>

      {/* Logo header */}
      <header className="w-full bg-white flex flex-col items-center py-4 shadow-sm">
        <Image
          src="/images/logo.webp"
          alt="Every State House Buyers logo"
          width={180}
          height={48}
          priority
        />
        <a
          href="tel:1-800-555-1234"
          className="mt-2 text-base font-medium text-blue-700"
          aria-label="Call Every State House Buyers"
        >
          (800) 555-1234
        </a>
      </header>

      {/* Unified hero section (mobile + desktop) */}
      <main>
        <section className="relative min-h-[calc(100vh-88px)] overflow-hidden">
          {/* Mobile background image */}
          <div className="absolute inset-0 md:hidden">
            <Image
              src="/images/mobile-bg.avif"
              alt="Aerial neighborhood view"
              fill
              sizes="100vw"
              priority
              placeholder="blur"
              blurDataURL="/images/mobile-bg-blur.webp"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>

          {/* Desktop background image with couple */}
          <div className="absolute inset-0 hidden md:block">
            <Image
              src="/images/hero-couple.webp"
              alt="Happy couple standing in front of their home"
              fill
              sizes="100vw"
              priority
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

          {/* Hero content – SAME layout you had before, now visible on desktop too */}
          <div className="relative z-10 flex flex-col items-center justify-start md:justify-center text-center text-white px-4 pt-24 pb-16 md:pt-28">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 drop-shadow-sm max-w-3xl">
              Get a cash offer for your home
              <br />
              with the click of a button
            </h1>

            <p className="text-white/90 text-sm md:text-base mb-5 max-w-xl">
              Enter your address to get your instant cash offer. No repairs. No
              fees. No obligation.
            </p>

            <form
              className="w-full max-w-sm md:max-w-md"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter your home address"
                className="w-full px-4 py-3 rounded-t-md text-black text-sm md:text-base border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Enter your home address"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-b-md text-sm md:text-base shadow-md"
              >
                Get my cash offer
              </button>
            </form>

            {/* Reviews badge – same as before */}
            <div className="mt-6 flex flex-col items-center text-xs md:text-sm text-white/90">
              <Image
                src="/images/reviews-badge.webp"
                alt="Rated 4.9 out of 5 stars by 387+ sellers"
                width={160}
                height={34}
                loading="lazy"
              />
              <p className="mt-1">
                Rated 4.9 out of 5 by 387+ homeowners who sold to us.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
