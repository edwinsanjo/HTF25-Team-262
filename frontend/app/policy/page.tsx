import Navbar from "../components/Navbar";

export default function PolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--background))]">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-gray-800/50">
          <div className="absolute inset-0 bg-linear-to-br from-purple-600/5 via-transparent to-pink-600/5"></div>
          <div className="relative mx-auto w-full max-w-4xl px-6 py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-purple-400">Policies & Terms</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Transparency, Privacy, and Trust
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              This page outlines how we handle your data, your rights, and the rules for using this platform.
            </p>
          </div>
        </section>

        {/* Content Layout */}
        <section className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16 grid md:grid-cols-[280px_1fr] gap-8">
          {/* Table of Contents */}
          <aside className="hidden md:block">
            <div className="sticky top-24">
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-b from-purple-600/30 to-pink-600/30 rounded-2xl blur opacity-10" />
                <nav className="relative bg-[#131820] border border-gray-800 rounded-2xl p-4">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">On this page</h3>
                  <ul className="space-y-1 text-sm">
                    {[{id: 'privacy', label: 'Privacy Policy'}, {id: 'terms', label: 'Terms of Use'}, {id: 'data', label: 'Data Handling'}, {id: 'cookies', label: 'Cookies'}, {id: 'guidelines', label: 'Community Guidelines'}, {id: 'contact', label: 'Contact'}].map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="block px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </aside>

          {/* Sections */}
          <div className="space-y-10">
            {/* Placeholder callout */}
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20" />
              <div className="relative bg-[#1a1f28] border border-gray-800 rounded-2xl p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-white font-semibold text-lg mb-2">Content coming soon</h2>
                    <p className="text-gray-400 text-sm">We’ve set up the structure and design. Share your policy text, and we’ll drop it into the sections below.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Policy */}
            <section id="privacy" className="relative scroll-mt-24">
              <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-10" />
              <div className="relative bg-[#141922] border border-gray-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-3">Privacy Policy</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Placeholder. Describe what data you collect (e.g., name, register number, item details), why you collect it, and how long you retain it.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>What we collect</li>
                  <li>How we use your data</li>
                  <li>Retention and deletion</li>
                  <li>Your rights and choices</li>
                </ul>
              </div>
            </section>

            {/* Terms of Use */}
            <section id="terms" className="relative scroll-mt-24">
              <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-10" />
              <div className="relative bg-[#141922] border border-gray-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-3">Terms of Use</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Placeholder. Outline acceptable use, prohibited activities, and consequences for misuse.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Eligibility and account security</li>
                  <li>Posting found and missing items</li>
                  <li>Prohibited content and behavior</li>
                  <li>Enforcement and appeals</li>
                </ul>
              </div>
            </section>

            {/* Data Handling */}
            <section id="data" className="relative scroll-mt-24">
              <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-10" />
              <div className="relative bg-[#141922] border border-gray-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-3">Data Handling</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Placeholder. Explain storage (e.g., MongoDB Atlas), security measures, and admin access controls.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Storage and encryption</li>
                  <li>Access controls and auditing</li>
                  <li>Third-party services</li>
                  <li>Incident response</li>
                </ul>
              </div>
            </section>

            {/* Cookies */}
            <section id="cookies" className="relative scroll-mt-24">
              <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-10" />
              <div className="relative bg-[#141922] border border-gray-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-3">Cookies</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Placeholder. Describe what cookies or tokens are used (e.g., JWT in localStorage) and how to opt out.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Essential cookies</li>
                  <li>Analytics (if any)</li>
                  <li>Managing preferences</li>
                </ul>
              </div>
            </section>

            {/* Community Guidelines */}
            <section id="guidelines" className="relative scroll-mt-24">
              <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-10" />
              <div className="relative bg-[#141922] border border-gray-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-3">Community Guidelines</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Placeholder. Share best practices for reporting accurately and claiming items responsibly.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Be honest and respectful</li>
                  <li>Provide clear item descriptions</li>
                  <li>Do not share sensitive information publicly</li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <section id="contact" className="relative scroll-mt-24">
              <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-10" />
              <div className="relative bg-[#141922] border border-gray-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-3">Contact</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Placeholder. Add your official contact email or campus helpdesk information here.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0l-4-4m4 4l-4 4M4 6h16v12H4z" />
                    </svg>
                    Email Us
                  </a>
                  <a href="/about" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Learn More
                  </a>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
