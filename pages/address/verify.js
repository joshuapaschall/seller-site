// pages/address/verify.js
import Link from 'next/link';

export default function AddressVerify() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">What's the property address?</h1>
      <p className="text-gray-600 text-center mb-6">Enter the property address you want to sell below.</p>

      <form className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <label className="block mb-2 font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          placeholder="123 Main St, City, State"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />

        <Link href="/user/details">
          <button
            type="button"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Next
          </button>
        </Link>
      </form>

      <footer className="text-xs text-center text-gray-500 mt-10">
        © 2025 Every State House Buyers
      </footer>
    </div>
  );
}
