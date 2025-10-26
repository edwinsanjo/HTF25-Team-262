'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Item {
  _id: string;
  description: string;
  location: string;
  time: string;
  imageUrl: string;
  securityOffice?: {
    name?: string;
    phone?: string;
  };
}

export default function ReportedItemsClient({ items }: { items: Item[] }) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [claimedId, setClaimedId] = useState<string | null>(null);
  const { token } = useAuth();
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-400 mb-2">No items found yet</h3>
        <p className="text-gray-500">Check back later for reported items</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item._id} className="group relative">
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
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
              </div>
            )}
            
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">Description</p>
                <p className="text-white font-medium leading-relaxed">{item.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-gray-300 text-sm">{item.location}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date</p>
                  <p className="text-gray-400 text-sm">{new Date(item.time).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                {claimedId === item._id ? (
                  <div className="rounded-xl bg-[#12171d] border border-gray-800 p-4">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 11-4 0 2 2 0 014 0zm-6 12a6 6 0 1112 0H9z" />
                        </svg>
                      </div>
                      <div className="text-sm">
                        <p className="text-white font-medium mb-1">Contact Security Office</p>
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
                          <p className="text-gray-400">Please visit the campus security office with details of this item to proceed with verification.</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : confirmingId === item._id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setConfirmingId(null)}
                      className="flex-1 px-4 py-2.5 text-sm font-medium bg-gray-800 text-gray-200 rounded-xl hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        if (!token) {
                          alert('Please login to claim an item.');
                          return;
                        }
                        try {
                          const res = await fetch(`${API_BASE}/api/products/${item._id}/claim`, {
                            method: 'PATCH',
                            headers: { 'Authorization': `Bearer ${token}` },
                          });
                          if (!res.ok) {
                            const data = await res.json().catch(() => ({}));
                            throw new Error(data.message || 'Failed to claim item');
                          }
                          setConfirmingId(null);
                          setClaimedId(item._id);
                        } catch (e: any) {
                          alert(e?.message || 'Failed to claim item');
                        }
                      }}
                      className="flex-1 px-4 py-2.5 text-sm font-medium bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-600/20"
                    >
                      Confirm
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmingId(item._id)}
                    className="w-full px-4 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40"
                  >
                    Claim This Item
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
