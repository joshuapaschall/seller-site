import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const desktopInputRef = useRef(null);
  const mobileInputRef = useRef(null);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Dynamically load Google Maps Places API after the user starts typing
  useEffect(() => {
    if (
      !mapsLoaded &&
      typeof window !== 'undefined' &&
      (desktopInputRef.current || mobileInputRef.current) &&
      inputValue.length >= 2
    ) {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.defer = true;
        script.async = true;
        script.onload = () => setMapsLoaded(true);
        document.body.appendChild(script);
      } else {
        setMapsLoaded(true);
      }
    }
  }, [inputValue, mapsLoaded]);

  // Attach Google Places Autocomplete to both desktop + mobile inputs
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!mapsLoaded || !window.google || !window.google.maps || !window.google.maps.places) return;

    const inputs = [desktopInputRef.current, mobileInputRef.current].filter(Boolean);

    inputs.forEach((input) => {
      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ['address'],
        componentRestrictions: { country: 'us' },
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          setInputValue(place.formatted_address);
        }
      });
    });
  }, [mapsLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    // Go to the next step with the address in the query string
    router.push({
      pathname: '/address/verify',
      query: { address: trimmed },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Get a Cash Offer | Every State House Buyers</title>
        <meta
          name="description"
          content="Sell your house with the click of a button. Get your free cash offer now from Every State House Buyers."
        />
        {/* Preload desktop hero + logo for best LCP/CLS on larger screens */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-couple.webp"
          imagesrcset="/images/hero-couple.webp"
          imagesizes="100vw"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/images/logo.webp"
          imagesrcset="/images/logo.webp"
          imagesizes="180px"
          type="image/webp"
        />
      </Head>

      {/* Top red announcement bar (non-COVID message) */}
      <div className="w-full bg-red-700 text-white text-xs sm:text-sm text-center py-2 px-4">
        We&apos;re now purchasing homes in any condition nationwide — no repairs, no commissions,
        pick your exact closing date.
      </div>

      {/* Logo + phone + BBB style header */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo.webp"
              alt="Every State House Buyers"
              width={180}
              height={48}
              priority
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col items-end text-xs leading-tight text-gray-600 mr-4">
              <span className="font-semibold text-gray-900">Trusted home buyers</span>
              <span>BBB A+ Rating</span>
            </div>
            <a
              href="tel:1-800-555-1234"
              className="text-sm sm:text-base font-semibold text-blue-700"
              aria-label="Call Every State House Buyers"
            >
              (800) 555-1234
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* === Desktop Hero (md and up) === */}
        <section className="relative hidden md:block">
          <div className="relative h-[calc(100vh-112px)] min-h-[620px]">
            <Image
              src="/images/hero-couple.webp"
              alt="Happy couple after selling their home"
              fill
              sizes="100vw"
              priority
              style={{ objectFit: 'cover', objectPosition: 'center right' }}
            />

            {/* Left gradient overlay to create the gray panel effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-transparent" />

            <div className="absolute inset-0 flex items-center">
              <div className="w-full max-w-6xl mx-auto flex">
                <div className="max-w-md text-left text-white">
                  <p className="uppercase tracking-[0.2em] text-xs mb-4 text-white/70">
                    Sell your house the easy way
                  </p>
                  <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                    Get a cash offer for your home
                    <br />
                    with the click of a button
                  </h1>
                  <p className="text-sm text-white/85 mb-6">
                    Enter your address to get your instant cash offer. No repairs. No fees. No
                    obligation.
                  </p>

                  {/* Horizontal address form */}
                  <form
                    className="w-full max-w-lg bg-white rounded-md shadow-lg overflow-hidden flex"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      ref={desktopInputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter your home address"
                      className="flex-1 px-4 py-3 text-sm text-gray-900 outline-none"
                      aria-label="Enter your home address"
                    />
                    <button
                      type="submit"
                      className="px-6 bg-blue-600 text-white text-sm font-semibold whitespace-nowrap hover:bg-blue-700 transition-colors"
                    >
                      Get my cash offer
                    </button>
                  </form>

                  {/* Stars + social proof */}
                  <div className="mt-6 flex items-center space-x-3 text-xs text-white/80">
                    <Image
                      src="/images/reviews-badge.webp"
                      alt="Rated 4.9 out of 5 stars"
                      width={130}
                      height={26}
                    />
                    <p>Rated 4.9 out of 5 by 387+ homeowners who sold to us.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === Mobile Hero (below md) === */}
        <section className="relative md:hidden">
          <div className="relative min-h-[520px]">
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
            <div className="absolute inset-0 bg-black/35" />

            <div className="absolute inset-0 flex flex-col items-center justify-start pt-16 px-4 text-white text-center">
              <h1 className="text-2xl font-bold mb-2 leading-snug">
                Get a cash offer for your home
                <br />
                with the click of a button
              </h1>
              <p className="text-sm text-white/90 mb-4">
                Enter your address to get your instant cash offer.
              </p>

              <form
                className="w-full max-w-sm bg-white rounded-md shadow-md overflow-hidden"
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  ref={mobileInputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter your home address"
                  className="w-full px-4 py-3 text-sm text-gray-900 border-b border-gray-200"
                  aria-label="Enter your home address"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-3 text-sm"
                >
                  Get my cash offer
                </button>
              </form>

              <div className="mt-4 flex flex-col items-center text-xs text-white/80">
                <Image
                  src="/images/reviews-badge.webp"
                  alt="Rated 4.9 out of 5 stars"
                  width={140}
                  height={30}
                  loading="lazy"
                />
                <p className="mt-1">Rated 4.9 out of 5 by 387+ sellers</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
