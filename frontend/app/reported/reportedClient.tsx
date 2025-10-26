'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Item {
  id: number;
  description: string;
  location: string;
  time: string;
  imageUrl: string;
}

export default function ReportedItemsClient({ items }: { items: Item[] }) {
  const [confirmingId, setConfirmingId] = useState<number | null>(null);

  if (!items || items.length === 0) {
    return (
      <div className="bg-[#1a1f28] border border-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-500">No reported items yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="bg-[#1a1f28] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
          {item.imageUrl && (
            <div className="relative h-48 w-full mb-3 rounded overflow-hidden bg-[#0f1419]">
              <Image src={item.imageUrl} alt={item.description} layout="fill" objectFit="cover" />
            </div>
          )}
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Description</p>
              <p className="text-white">{item.description}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Location</p>
              <p className="text-gray-300">{item.location}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Time</p>
              <p className="text-gray-400 text-sm">{new Date(item.time).toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-4">
            {confirmingId === item.id ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setConfirmingId(null)}
                  className="px-3 py-1.5 text-sm bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {/* Placeholder for next step */}}
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500"
                >
                  Confirm Claim
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmingId(item.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Claim
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
