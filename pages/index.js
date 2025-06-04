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
    // router.push('/address/verify') optional
  };

  return (
    <div>
      <Head>
        <title>Get a Cash Offer | Every State House Buyers</title>
        <meta
          name="description"
          content="Sell your house with the click of a button. Get your free cash offer now from Every State House Buyers."
        />
        {/* Optional: preload fonts */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        />

        {/* Preload hero background image */}
        <link
          rel="preload"
          as="image"
          href="/images/mobile-bg.avif"
          imagesrcset="/images/mobile-bg.avif"
          imagesizes="100vw"
          type="image/avif"
        />
        {/* Preload logo */}
        <link
          rel="preload"
          as="image"
          href="/images/logo.webp"
          imagesrcset="/images/logo.webp"
          imagesizes="180px"
          type="image/webp"
        />
      </Head>

      {/* Logo Header */}
      <header className="w-full bg-white flex flex-col items-center py-4 shadow-sm">
        <Image
          src="/images/logo.webp"
          alt="Every State House Buyers logo"
          width={180}
          height={48}
          priority
          style={{ width: '180px', height: '48px' }}
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
          src="/images/mobile-bg.avif"
          alt="Aerial neighborhood view"
          fill
          sizes="100vw"
          priority
          placeholder="blur"
          blurDataURL="/images/mobile-bg-blur.webp"
          fetchPriority="high"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        />
        <div className="absolute inset-0 bg-black/30 z-0" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-24 px-4 text-white text-center min-h-[60vh]">
          <h1 className="text-2xl font-bold mb-2 drop-shadow-sm">
            Get a cash offer for your home<br />with the click of a button
          </h1>
          <p className="text-white/90 text-sm mb-4">
            Enter your address to get your instant offer.
          </p>

          <form
            className="w-full max-w-sm sticky top-4 min-h-[120px]"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
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
              style={{ width: '140px', height: '30px' }}
            />
            <p>Rated 4.9 out of 5 by 387+ sellers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
