import Link from 'next/link';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="mt-auto bg-linear-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <BrandLogo className="h-8 w-8" />
              <div className="text-white font-semibold">nonamenow</div>
            </div>
            <p className="text-slate-400 text-sm">
              Your campus lost & found platform. Making item recovery simple and efficient.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/report-found" className="text-slate-400 hover:text-white text-sm">
                  Report Found Item
                </Link>
              </li>
              <li>
                <Link href="/report-missing" className="text-slate-400 hover:text-white text-sm">
                  Report Missing Item
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-slate-400 hover:text-white text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white text-sm">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-slate-400 hover:text-white text-sm">
                  Campus Rules
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>support@nonamenow.edu</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Campus Security Office</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © 2025 nonamenow. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-slate-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-white text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}