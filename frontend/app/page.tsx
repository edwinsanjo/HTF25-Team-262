"use client";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import BrandLogo from "./components/BrandLogo";

export default function Home() {
  const [registerNumber, setRegisterNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";
      const response = await fetch(`${apiBase}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registerNumber, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setIsLoading(false);
        return;
      }

      // Login will handle routing
      login(data.token, data.user);
    } catch (err) {
      setError("Connection error. Please ensure the server is running.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--background))]">
      <main className="grow flex items-center">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Hero / Design side */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <BrandLogo className="h-12 w-12 logo-bounce" />
              <div>
                <div className="text-sm text-gray-500">Campus</div>
                <div className="text-2xl font-bold brand-gradient">
                  nonamenow
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
              Find it. Report it. Reunite fast.
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              A simple, fast platform to report and manage lost & found items on
              campus. Login to access your dashboard or head to admin tools if
              you are staff.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-3 glass-card p-4 rounded-lg soft-glow w-full sm:w-auto">
                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                  F
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Report Found</div>
                  <div className="text-xs text-gray-400">
                    Upload images & details
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 glass-card p-4 rounded-lg soft-glow w-full sm:w-auto">
                <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Report Missing</div>
                  <div className="text-xs text-gray-400">
                    File a complaint quickly
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Login card */}
          <form onSubmit={handleLogin} className="mx-auto w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-800 bg-[hsl(var(--card))]">
            <div className="flex items-center justify-center mb-4">
              <BrandLogo className="h-10 w-10" />
            </div>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-white">
                Sign in to your account
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Use your register number and password
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
                {error}
              </div>
            )}

            <label
              htmlFor="registerNumber"
              className="block text-sm font-medium label-muted"
            >
              Register Number
            </label>
            <input
              id="registerNumber"
              name="registerNumber"
              type="text"
              required
              value={registerNumber}
              onChange={(e) => setRegisterNumber(e.target.value)}
              className="mt-1 mb-4 w-full input-dark"
              disabled={isLoading}
            />

            <label
              htmlFor="password"
              className="block text-sm font-medium label-muted"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 mb-4 w-full input-dark"
              disabled={isLoading}
            />

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4 text-blue-600" />
                <span className="text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <div className="mt-6 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Contact admin
              </a>
            </div>
          </form>
        </div>
        </div>
      </main>
    </div>
  );
}
