import Navbar from "../components/Navbar";
import ClaimedItemsClient from "./ClaimedItemsClient";

export default function ClaimedPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--background))]">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-gray-800/50">
          <div className="absolute inset-0 bg-linear-to-br from-emerald-600/5 via-transparent to-green-600/5"></div>
          <div className="relative mx-auto w-full max-w-7xl px-6 py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-emerald-500">My Claimed Items</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Items You Claimed
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                View items you've claimed and where to collect them.
              </p>
            </div>
          </div>
        </section>

        {/* Items Grid */}
        <section className="mx-auto w-full max-w-7xl px-6 py-16">
          <ClaimedItemsClient />
        </section>
      </main>
    </>
  );
}
