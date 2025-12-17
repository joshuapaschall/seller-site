import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const inputRef = useRef(null);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Lazy-load Google Maps Places only when the user starts typing
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      mapsLoaded ||
      inputValue.length < 2
    ) {
      return;
    }

    const existingScript = document.querySelector(
      'script[data-google-maps]'
    );

    const initAutocomplete = () => {
      if (!inputRef.current || !window.google?.maps?.places) return;

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ['address'],
          componentRestrictions: { country: ['us'] },
        }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place?.formatted_address) {
          setInputValue(place.formatted_address);
        }
      });
    };

    if (existingScript) {
      if (window.google?.maps?.places) {
        initAutocomplete();
        setMapsLoaded(true);
      } else {
        existingScript.addEventListener('load', () => {
          initAutocomplete();
          setMapsLoaded(true);
        });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = 'true';
    script.onload = () => {
      initAutocomplete();
      setMapsLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [inputValue, mapsLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    router.push(`/address/verify?address=${encodeURIComponent(trimmed)}`);
  };

  return (
    <>
      <Head>
        <title>Get a Cash Offer | Every State House Buyers</title>
        <meta
          name="description"
          content="Get a fast, fair cash offer on your home with the click of a button. No repairs, no commissions, close on your timeline."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          as="image"
          href="/images/mobile-bg.avif"
          fetchpriority="high"
        />
      </Head>

      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        {/* Header */}
        <header className="w-full">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-28 sm:h-12 sm:w-32">
                <Image
                  src="/logo-every-state.svg"
                  alt="Every State House Buyers"
                  fill
                  sizes="112px"
                  priority
                />
              </div>
            </div>

            <a
              href="tel:18005551234"
              className="text-sm font-semibold tracking-wide text-blue-600 hover:text-blue-700 sm:text-base"
            >
              (800) 555-1234
            </a>
          </div>
        </header>

        {/* Hero – shared for mobile & desktop */}
        <main className="relative flex-1">
          <div className="relative min-h-[calc(100vh-80px)]">
            {/* Background image */}
            <Image
              src="/images/mobile-bg.avif"
              alt="Happy family in front of their home"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/75" />

            {/* Hero content */}
            <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
              <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] items-start">
                {/* Left: Copy */}
                <section className="flex flex-col items-center text-center text-white md:items-start md:text-left space-y-6">
                  <p className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-amber-300 backdrop-blur">
                    Sell your house the easy way
                  </p>

                  <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl md:leading-tight">
                    Get a cash offer for your home
                    <span className="block text-amber-300">
                      with the click of a button
                    </span>
                  </h1>

                  <p className="max-w-xl text-sm sm:text-base text-gray-100/90">
                    Skip the showings, repairs, and months of uncertainty. Tell
                    us about your property and we&apos;ll present you with a
                    fair cash offer and flexible closing date.
                  </p>

                  <ul className="grid w-full gap-3 text-sm sm:grid-cols-2 md:text-base">
                    <li className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/90 text-xs font-bold">
                        ✓
                      </span>
                      <span>No repairs or cleaning required</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/90 text-xs font-bold">
                        ✓
                      </span>
                      <span>No agent commissions or fees</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/90 text-xs font-bold">
                        ✓
                      </span>
                      <span>Pick your exact closing date</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/90 text-xs font-bold">
                        ✓
                      </span>
                      <span>Trusted, BBB A+ rated home buyers</span>
                    </li>
                  </ul>
                </section>

                {/* Right: Form card */}
                <section className="flex w-full items-start justify-center">
                  <div className="w-full max-w-md rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-md sm:p-7">
                    <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                      Step 1: What&apos;s the property address?
                    </h2>
                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      Start by telling us where the property is located. We
                      won&apos;t ever share or sell your information.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                      <label
                        htmlFor="hero-address"
                        className="block text-xs font-medium text-gray-700 sm:text-sm"
                      >
                        Property address
                      </label>
                      <input
                        id="hero-address"
                        ref={inputRef}
                        type="text"
                        autoComplete="off"
                        placeholder="123 Main St, City, ST"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/70 sm:px-4 sm:py-2.5"
                      />

                      <button
                        type="submit"
                        className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600"
                      >
                        Get my cash offer
                      </button>
                    </form>

                    <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-3 text-xs text-gray-600 sm:text-[13px]">
                      <p className="font-semibold text-gray-800">
                        As seen on &amp; trusted by homeowners nationwide
                      </p>
                      <p className="mt-1">
                        4.9★ average homeowner rating · A+ BBB Rating ·
                        Thousands of homes evaluated.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>

        {/* Simple footer */}
        <footer className="bg-white py-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Every State House Buyers. All rights
          reserved.
        </footer>
      </div>
    </>
  );
}
