"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

interface Submission {
  _id: string;
  description: string;
  location: string;
  time: string;
  imageUrl: string;
  claimed?: boolean;
  claimedBy?: { registerNumber: string } | null;
}

export default function AdminDashboardClient({
  products: initialProducts,
  complaints: initialComplaints,
}: {
  products: Submission[];
  complaints: Submission[];
}) {
  const [tab, setTab] = useState<"found" | "missing">("found");
  const [products, setProducts] = useState(initialProducts);
  const [complaints, setComplaints] = useState(initialComplaints);
  const [editingItem, setEditingItem] = useState<Submission | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { token } = useAuth();
  const [showClaimed, setShowClaimed] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

  // Fetch admin view with claimed items included
  async function refreshProductsAdmin() {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/products/admin`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    refreshProductsAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleDelete = async (id: string, type: "product" | "complaint") => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const endpoint = type === "product" ? "products" : "complaints";
      const response = await fetch(`${API_BASE}/api/${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        if (type === "product") {
          setProducts(products.filter((p) => p._id !== id));
        } else {
          setComplaints(complaints.filter((c) => c._id !== id));
        }
        alert("Item deleted successfully");
      } else {
        const data = await response.json();
        alert(`Failed to delete: ${data.message}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the item.");
    }
  };

  const handleDeclaim = async (id: string) => {
    if (!confirm("Unclaim this item so it returns to the public list?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}/declaim`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        // Update local list: set claimed=false on the item
        setProducts((prev) => prev.map((p) => p._id === id ? { ...p, claimed: false } : p));
        alert('Item unclaimed');
      } else {
        const data = await res.json();
        alert(`Failed to unclaim: ${data.message}`);
      }
    } catch (e) {
      alert('Failed to unclaim item');
    }
  };

  const handleEdit = (item: Submission) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;

    const formData = new FormData(e.currentTarget);
    const type = tab === "found" ? "products" : "complaints";

    try {
      const response = await fetch(`${API_BASE}/api/${type}/${editingItem._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedItem = await response.json();
        
        if (tab === "found") {
          setProducts(products.map((p) => (p._id === updatedItem._id ? updatedItem : p)));
        } else {
          setComplaints(complaints.map((c) => (c._id === updatedItem._id ? updatedItem : c)));
        }
        
        setShowEditModal(false);
        setEditingItem(null);
        alert("Item updated successfully");
      } else {
        const data = await response.json();
        alert(`Failed to update: ${data.message}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating the item.");
    }
  };

  const handleMarkResolved = async (id: string, type: "product" | "complaint") => {
    if (!confirm("Mark this item as resolved? It will be removed from the active list.")) return;

    try {
      const endpoint = type === "product" ? "products" : "complaints";
      const response = await fetch(`${API_BASE}/api/${endpoint}/${id}/resolve`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Remove from current list since it's now resolved
        if (type === "product") {
          setProducts(products.filter((p) => p._id !== id));
        } else {
          setComplaints(complaints.filter((c) => c._id !== id));
        }
        alert("Item marked as resolved successfully");
      } else {
        const data = await response.json();
        alert(`Failed to mark as resolved: ${data.message}`);
      }
    } catch (error) {
      console.error("Resolve error:", error);
      alert("An error occurred while marking the item as resolved.");
    }
  };

  const TabButton = ({
    id,
    label,
    active,
    count,
    onClick,
  }: {
    id: "found" | "missing";
    label: string;
    active: boolean;
    count: number;
    onClick: () => void;
  }) => (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm transition-colors border ${
        active
          ? "bg-blue-600 text-white border-blue-500"
          : "bg-[#141922] text-gray-300 border-gray-800 hover:bg-[#19202a]"
      }`}
    >
      <span className="mr-2">{label}</span>
      <span className={`inline-flex items-center justify-center text-xs px-2 py-0.5 rounded ${
        active ? "bg-white/20" : "bg-gray-800"
      }`}>{count}</span>
    </button>
  );

  const List = ({ items, type }: { items: Submission[]; type: "product" | "complaint" }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item._id} className="group relative">
          <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
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
              {type === 'product' && item.claimed && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-7 4h4M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Claimed{item.claimedBy?.registerNumber ? ` by ${item.claimedBy.registerNumber}` : ''}
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-purple-500 uppercase tracking-wider mb-2">Description</p>
                <p className="text-white font-medium leading-relaxed line-clamp-2">{item.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-gray-300 text-sm">{item.location}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(item.time).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-4 border-t border-gray-800">
                <button
                  onClick={() => handleMarkResolved(item._id, type)}
                  className="w-full px-4 py-2.5 text-sm font-medium bg-green-600 text-white rounded-xl hover:bg-green-500 transition-all shadow-lg shadow-green-600/20 hover:shadow-green-600/40 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mark as Resolved
                </button>
                {type === 'product' && item.claimed && (
                  <button
                    onClick={() => handleDeclaim(item._id)}
                    className="w-full px-4 py-2.5 text-sm font-medium bg-yellow-600 text-white rounded-xl hover:bg-yellow-500 transition-colors"
                  >
                    Declaim (Unclaim)
                  </button>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, type)}
                    className="flex-1 px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--background))]">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-gray-800/50">
          <div className="absolute inset-0 bg-linear-to-br from-purple-600/5 via-transparent to-blue-600/5"></div>
          <div className="relative mx-auto w-full max-w-7xl px-6 py-16">
            <div className="flex items-center justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                  <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm font-medium text-purple-500">Admin Panel</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                  Dashboard
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Manage all submissions, review items, and mark cases as resolved.
                </p>
              </div>
              
              {/* Stats */}
              <div className="hidden lg:flex gap-6">
                <div className="text-center px-6 py-4 bg-[#1a1f28]/50 border border-gray-800/50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-500">{products.length}</div>
                  <div className="text-sm text-gray-500 mt-1">Found</div>
                </div>
                <div className="text-center px-6 py-4 bg-[#1a1f28]/50 border border-gray-800/50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-500">{complaints.length}</div>
                  <div className="text-sm text-gray-500 mt-1">Missing</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="mx-auto w-full max-w-7xl px-6 py-12">
          <div role="tablist" aria-label="Submissions" className="flex items-center gap-3 mb-8">
            <TabButton
              id="found"
              label="Found Items"
              active={tab === "found"}
              count={products.length}
              onClick={() => setTab("found")}
            />
            <TabButton
              id="missing"
              label="Missing Items"
              active={tab === "missing"}
              count={complaints.length}
              onClick={() => setTab("missing")}
            />
            {tab === 'found' && (
              <button
                onClick={() => setShowClaimed((s) => !s)}
                className={`ml-auto px-4 py-2 rounded-md text-sm border ${showClaimed ? 'bg-yellow-600 text-white border-yellow-500' : 'bg-[#141922] text-gray-300 border-gray-800 hover:bg-[#19202a]'}`}
              >
                {showClaimed ? 'Showing Claimed' : 'Hide Claimed'}
              </button>
            )}
          </div>

          <div className="mt-6">
            {tab === "found" ? (
              products.length ? (
                <List items={products.filter(p => showClaimed || !p.claimed)} type="product" />
              ) : (
                <div className="text-center py-20 bg-[#1a1f28]/30 border border-gray-800/50 rounded-2xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/10 mb-4">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-lg">No found items yet</p>
                </div>
              )
            ) : complaints.length ? (
              <List items={complaints} type="complaint" />
            ) : (
              <div className="text-center py-20 bg-[#1a1f28]/30 border border-gray-800/50 rounded-2xl">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/10 mb-4">
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-lg">No missing complaints yet</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Edit Modal */}
      {showEditModal && editingItem && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-[hsl(var(--card))] border border-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Edit {tab === "found" ? "Found Item" : "Missing Item"}
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium label-muted">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  defaultValue={editingItem.description}
                  required
                  rows={3}
                  className="mt-1 block w-full input-dark"
                />
              </div>

              <div>
                <label htmlFor="edit-location" className="block text-sm font-medium label-muted">
                  Location
                </label>
                <input
                  id="edit-location"
                  name="location"
                  type="text"
                  defaultValue={editingItem.location}
                  required
                  className="mt-1 block w-full input-dark"
                />
              </div>

              <div>
                <label htmlFor="edit-time" className="block text-sm font-medium label-muted">
                  Date & Time
                </label>
                <input
                  id="edit-time"
                  name="time"
                  type="datetime-local"
                  defaultValue={new Date(editingItem.time).toISOString().slice(0, 16)}
                  required
                  className="mt-1 block w-full input-dark"
                />
              </div>

              <div>
                <label htmlFor="edit-image" className="block text-sm font-medium label-muted">
                  Update Picture (optional)
                </label>
                <input
                  type="file"
                  id="edit-image"
                  name="image"
                  accept="image/*"
                  className="mt-1 block w-full input-dark text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingItem(null);
                  }}
                  className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
