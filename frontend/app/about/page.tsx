import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--background))]">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-gray-800/50">
          <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 via-transparent to-purple-600/5"></div>
          <div className="relative mx-auto w-full max-w-4xl px-6 py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-blue-500">About Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Reuniting Lost Items<br />with Their Owners
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              A campus-wide platform designed to make lost and found simple, fast, and secure.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We believe losing personal belongings shouldn't be a stressful experience. 
                nonamenow was created to bridge the gap between those who find items and 
                those who've lost them, making the reunion process seamless and efficient.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                By leveraging modern technology and a user-friendly interface, we're building 
                a community where honesty is rewarded and lost items find their way home.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-[#1a1f28] border border-gray-800 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Fast & Easy</h3>
                      <p className="text-gray-400 text-sm">Report found items or file missing complaints in seconds</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Secure</h3>
                      <p className="text-gray-400 text-sm">Protected data with verification for ownership claims</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-green-600/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Community</h3>
                      <p className="text-gray-400 text-sm">Building trust and helping each other on campus</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t border-gray-800/50 bg-[#0f1419]/50">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-gray-400 text-lg">
                Three simple steps to reunite with your belongings
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-[#1a1f28] border border-gray-800 rounded-2xl p-8 text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold mb-6">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Report or Search</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Found an item? Report it with a photo and details. Lost something? Search through reported items.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-[#1a1f28] border border-gray-800 rounded-2xl p-8 text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600 text-white text-2xl font-bold mb-6">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Verify & Claim</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Provide proof of ownership when claiming an item. Our system ensures secure verification.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-[#1a1f28] border border-gray-800 rounded-2xl p-8 text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white text-2xl font-bold mb-6">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Reunite</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Connect with the finder through our admin team and get your belongings back safely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/CTA Section */}
        <section className="mx-auto w-full max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Join our community and help make campus a better place for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Report an Item
            </a>
            <a
              href="/reported"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Found Items
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
