import Image from 'next/image';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Get a Cash Offer | Blitz Cash Offer</title>
        <meta
          name="description"
          content="We buy homes in any condition. Get your offer today!"
        />
      </Head>

      <header className="bg-red-600 text-white py-2 text-center text-sm font-semibold">
        COVID-19 UPDATE: WE ARE NOW PURCHASING HOMES IN ANY CONDITION 100% VIRTUALLY. NO HOME VISITS NECESSARY!
      </header>

      <div className="relative min-h-screen">
        <Image
          src="/images/hero-couple.jpg"
          alt="Happy couple hugging at home"
          layout="fill"
          objectFit="cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />

        <main className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 text-white">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 drop-shadow">
            Get a Cash Offer for Your Home
          </h1>
          <p className="text-center text-white/90 mb-6 max-w-md drop-shadow">
            You’ll receive a call back ASAP from a home buying specialist.
          </p>
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-black">
            <p className="text-center font-medium text-lg mb-2">
              Thank you for submitting your info.
            </p>
            <p className="text-center text-sm text-gray-500">
              Sit tight—we're reviewing your property and will reach out shortly.
            </p>
          </div>
        </main>
      </div>

      <footer className="text-xs text-center text-gray-500 mt-10 p-4">
        © 2025 Blitz Cash Offer | Get a Fair Cash Offer in 7 Minutes!<br />
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>{' '}
        |{' '}
        <a href="/terms" className="underline">
          Terms and Conditions
        </a>
      </footer>
    </div>
  );
}
