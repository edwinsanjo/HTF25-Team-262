"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import securityOfficesRaw from "../../data/securityOffices.json";
const securityOffices = securityOfficesRaw as { name: string; phone: string }[];

type FormType = "product" | "complaint" | null;

export default function DashboardPage() {
  const [formType, setFormType] = useState<FormType>(null);
  const [showThanks, setShowThanks] = useState(false);
  const [thanksType, setThanksType] = useState<FormType>(null);
  const [selectedOfficeIndex, setSelectedOfficeIndex] = useState<number>(-1);
  const router = useRouter();
  const { token } = useAuth();

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const endpoint = formType === 'product'
      ? `${API_BASE}/api/products`
      : `${API_BASE}/api/complaints`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        // Close the form modal
        const submittedComplaint = formType === 'complaint';
        setFormType(null);

        if (submittedComplaint) {
          // Show thank-you modal and automatically redirect to reported items
          setThanksType('complaint');
          setShowThanks(true);
          setTimeout(() => {
            setShowThanks(false);
            setThanksType(null);
            router.push('/reported');
          }, 1200);
        } else {
          // For found item reports, show an inline thank-you modal (no auto-redirect)
          setThanksType('product');
          setShowThanks(true);
        }
      } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  const renderModal = () => {
    if (!formType) return null;

    const isProduct = formType === "product";
    const title = isProduct
      ? "Report a Found Item"
      : "Make a Missing Complaint";

    return (
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
        <div className="bg-[hsl(var(--card))] border border-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="image" className="block text-sm font-medium label-muted">
                Picture
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="mt-1 block w-full input-dark text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
              />
              {!isProduct && (
                <p className="mt-1 text-xs text-gray-400">
                  Please upload a proper image as proof of ownership.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium label-muted">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                required
                className="mt-1 block w-full input-dark sm:text-sm"
                placeholder={
                  isProduct
                    ? "Describe the item you found."
                    : "Describe the item, including any unique markings or tears for identification."
                }
              ></textarea>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium label-muted">
                {isProduct ? "Location (where it was found)" : "Location (where it went missing)"}
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                className="mt-1 block w-full input-dark sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium label-muted">
                {isProduct ? "Time (when it was found)" : "Time (when it went missing)"}
              </label>
              <input
                type="datetime-local"
                id="time"
                name="time"
                required
                className="mt-1 block w-full input-dark sm:text-sm"
              />
            </div>
            {isProduct && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="securityOfficeName" className="block text-sm font-medium label-muted">
                    Which security office
                  </label>
                  <select
                    id="securityOfficeName"
                    name="securityOfficeName"
                    className="mt-1 block w-full input-dark sm:text-sm"
                    value={selectedOfficeIndex}
                    onChange={(e) => setSelectedOfficeIndex(parseInt(e.target.value, 10))}
                    required
                  >
                    <option value={-1}>Select an office...</option>
                    {securityOffices.map((o, idx) => (
                      <option key={o.name} value={idx}>{o.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="securityOfficePhone" className="block text-sm font-medium label-muted">
                    Security office phone number
                  </label>
                  <input
                    type="tel"
                    id="securityOfficePhone"
                    name="securityOfficePhone"
                    value={selectedOfficeIndex >= 0 ? securityOffices[selectedOfficeIndex].phone : ""}
                    readOnly
                    className="mt-1 block w-full input-dark sm:text-sm"
                    placeholder="Select an office to autofill"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setFormType(null)}
                className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderThanksModal = () => {
    if (!showThanks) return null;
    const isComplaint = thanksType === 'complaint';
    const title = 'Thank you!';
    const message = isComplaint
      ? 'Your missing item complaint has been submitted. You can now view reported items and claim if any match yours.'
      : 'Your found item has been submitted. Thank you for helping reunite items with their owners.';
    return (
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
        <div className="bg-[hsl(var(--card))] border border-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md text-white text-center">
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-400 mb-6">{message}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => { setShowThanks(false); setThanksType(null); }}
              className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700"
            >
              Close
            </button>
            {isComplaint ? (
              <button
                onClick={() => { setShowThanks(false); setThanksType(null); router.push('/reported'); }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                View Reported Items
              </button>
            ) : (
              <button
                onClick={() => { setShowThanks(false); setThanksType(null); }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Got it
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--background))]">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-gray-800/50">
          <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 via-transparent to-purple-600/5"></div>
          <div className="relative mx-auto w-full max-w-7xl px-6 py-16">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Welcome Back
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Report found items or file a missing complaint. Help reunite belongings with their owners.
              </p>
            </div>
          </div>
        </section>

        {/* Action Cards */}
        <section className="mx-auto w-full max-w-5xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Report Found Item Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-[#1a1f28] border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">
                    Found
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Report Found Item</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Upload a photo and provide details to help reunite items with their rightful owners.
                </p>
                <button
                  onClick={() => setFormType("product")}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40"
                >
                  Report Found
                </button>
              </div>
            </div>

            {/* File Missing Complaint Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-[#1a1f28] border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-purple-600/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-purple-500 bg-purple-500/10 px-3 py-1 rounded-full">
                    Missing
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">File Missing Complaint</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Provide proof of ownership and detailed information to verify and track your missing item.
                </p>
                <button
                  onClick={() => setFormType("complaint")}
                  className="w-full px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40"
                >
                  File Complaint
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="bg-[#1a1f28]/50 border border-gray-800/50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-1">Fast</div>
              <div className="text-sm text-gray-500">Quick Reporting</div>
            </div>
            <div className="bg-[#1a1f28]/50 border border-gray-800/50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-1">Secure</div>
              <div className="text-sm text-gray-500">Protected Data</div>
            </div>
            <div className="bg-[#1a1f28]/50 border border-gray-800/50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-1">Easy</div>
              <div className="text-sm text-gray-500">Simple Process</div>
            </div>
          </div>
        </section>

        {renderModal()}
        {renderThanksModal()}
      </main>
    </>
  );
}
