import Navbar from "../components/Navbar";
import ReportedItemsClient from "./ReportedItemsClient";

export default async function ReportedPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
  const products = await fetch(`${API_BASE}/api/products`, { cache: 'no-store' })
    .then(r => r.json())
    .catch(() => []);
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--background))]">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-gray-800/50">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-600/5 via-transparent to-blue-600/5"></div>
          <div className="relative mx-auto w-full max-w-7xl px-6 py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm font-medium text-cyan-500">Found Items</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Reported Items
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                Browse through items that have been found and reported. If you recognize something as yours, click "Claim" to initiate the verification process.
              </p>
            </div>
          </div>
        </section>

        {/* Items Grid */}
        <section className="mx-auto w-full max-w-7xl px-6 py-16">
          <ReportedItemsClient items={products} />
        </section>
      </main>
    </>
  );
}
