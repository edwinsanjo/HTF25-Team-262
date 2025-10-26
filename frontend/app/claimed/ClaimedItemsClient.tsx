"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

interface Item {
  _id: string;
  description: string;
  location: string;
  time: string;
  imageUrl: string;
  securityOffice?: { name?: string; phone?: string };
  claimedAt?: string;
  resolved?: boolean;
}

export default function ClaimedItemsClient() {
  const { token } = useAuth();
  const [items, setItems] = useState<Item[] | null>(null);
  const [tab, setTab] = useState<'yet' | 'claimed'>('yet');
  const [error, setError] = useState<string | null>(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products/claimed`, {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store',
        });
        if (!res.ok) throw new Error('Failed to load claimed items');
        const data = await res.json();
        setItems(data);
      } catch (e: any) {
        setError(e?.message || 'Failed to load claimed items');
      }
    })();
  }, [token]);

  const yetToCollect = useMemo(() => (items || []).filter(i => !i.resolved), [items]);
  const claimedCollected = useMemo(() => (items || []).filter(i => !!i.resolved), [items]);
  const handleDeclaim = async (id: string) => {
    if (!token) return alert('Please login');
    if (!confirm('Declaim this item? It will return to the public list.')) return;
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}/declaim`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to declaim');
      setItems(prev => (prev || []).filter(p => p._id !== id));
    } catch (e: any) {
      alert(e?.message || 'Failed to declaim');
    }
  };

  if (!token) {
    return (
      <div className="text-center py-20 text-gray-400">Please login to view your claimed items.</div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-400">{error}</div>;
  }

  if (!items) {
    return <div className="text-center py-20 text-gray-400">Loading your claimed items...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-400 mb-2">No claimed items yet</h3>
        <p className="text-gray-500">Claim an item from the Reported Items to see it here</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => setTab('yet')} className={`px-4 py-2 rounded-md text-sm border ${tab==='yet' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-[#141922] text-gray-300 border-gray-800 hover:bg-[#19202a]'}`}>Yet to Claim</button>
        <button onClick={() => setTab('claimed')} className={`px-4 py-2 rounded-md text-sm border ${tab==='claimed' ? 'bg-blue-600 text-white border-blue-500' : 'bg-[#141922] text-gray-300 border-gray-800 hover:bg-[#19202a]'}`}>Claimed Objects</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(tab==='yet' ? yetToCollect : claimedCollected).map((item) => (
        <div key={item._id} className="group relative">
          <div className="absolute -inset-0.5 bg-linear-to-r from-green-600/20 to-emerald-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-[#1a1f28] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-300">
            {item.imageUrl && (
              <div className="relative h-56 w-full bg-[#0f1419]">
                <Image
                  src={item.imageUrl}
                  alt={item.description}
                  unoptimized
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1a1f28] via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-semibold">
                  Claimed
                </div>
              </div>
            )}

            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-green-500 uppercase tracking-wider mb-2">Description</p>
                <p className="text-white font-medium leading-relaxed">{item.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-gray-300 text-sm">{item.location}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Claimed On</p>
                  <p className="text-gray-400 text-sm">{item.claimedAt ? new Date(item.claimedAt).toLocaleDateString() : '-'}</p>
                </div>
              </div>

              <div className="rounded-xl bg-[#12171d] border border-gray-800 p-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 11-4 0 2 2 0 014 0zm-6 12a6 6 0 1112 0H9z" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <p className="text-white font-medium mb-1">Collect From</p>
                    {item.securityOffice?.name || item.securityOffice?.phone ? (
                      <ul className="text-gray-300 space-y-1">
                        {item.securityOffice?.name && (
                          <li><span className="text-gray-500">Office:</span> {item.securityOffice.name}</li>
                        )}
                        {item.securityOffice?.phone && (
                          <li>
                            <span className="text-gray-500">Phone:</span> {item.securityOffice.phone}
                            <a href={`tel:${item.securityOffice.phone}`} className="ml-2 text-blue-400 hover:text-blue-300 underline">Call</a>
                          </li>
                        )}
                      </ul>
                    ) : (
                      <p className="text-gray-400">Visit campus security with this item’s details.</p>
                    )}
                  </div>
                </div>
              </div>
              {tab === 'yet' && (
                <div className="pt-4">
                  <button onClick={() => handleDeclaim(item._id)} className="w-full px-4 py-2 text-sm font-medium bg-yellow-600 text-white rounded-xl hover:bg-yellow-500 transition-colors">Declaim (Unclaim)</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );
}
