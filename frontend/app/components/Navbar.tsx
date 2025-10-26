'use client';

import Link from 'next/link';
import { useState } from 'react';
import BrandLogo from './BrandLogo';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-[hsl(var(--background))]/95 backdrop-blur-xl supports-backdrop-filter:bg-[hsl(var(--background))]/80">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition"></div>
              <div className="relative">
                <BrandLogo className="h-8 w-8" />
              </div>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              nonamenow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/reported"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              Reported Items
            </Link>
            <Link
              href="/claimed"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              Claimed
            </Link>
            {user?.isAdmin && (
              <Link
                href="/admin/dashboard"
                className="px-4 py-2 text-sm font-medium text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-colors"
              >
                Admin
              </Link>
            )}
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              About
            </Link>
            <Link
              href="/policy"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              Policy
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Report
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm font-medium hover:bg-gray-700 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800/50 py-4 space-y-1">
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/reported"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reported Items
            </Link>
            <Link
              href="/claimed"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Claimed
            </Link>
            {user?.isAdmin && (
              <Link
                href="/admin/dashboard"
                className="block px-4 py-2 text-sm font-medium text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            <Link
              href="/about"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/policy"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Policy
            </Link>
            <div className="pt-4 space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Report
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm font-medium hover:bg-gray-700 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
