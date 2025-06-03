import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Get a Cash Offer | Blitz Cash Offer</title>
        <meta name="description" content="We buy homes in any condition. Get your offer today!" />
      </Head>
      <header className="bg-red-600 text-white py-2 text-center text-sm font-semibold">
        COVID-19 UPDATE: WE ARE NOW PURCHASING HOMES IN ANY CONDITION 100% VIRTUALLY.
      </header>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Get a Cash Offer for Your Home</h1>
        <p className="text-center text-gray-600 mb-6">You’ll receive a call back ASAP from a home buying specialist.</p>
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <p className="text-center font-medium text-lg mb-2">Thank you for submitting your info.</p>
          <p className="text-center text-sm text-gray-500">Sit tight—we're reviewing your property and will reach out shortly.</p>
        </div>
        <footer className="text-xs text-center text-gray-500 mt-10">
          © 2025 Blitz Cash Offer<br />
          <a href="/privacy" className="underline">Privacy Policy</a> | <a href="/terms" className="underline">Terms</a>
        </footer>
      </main>
    </div>
  )
}
