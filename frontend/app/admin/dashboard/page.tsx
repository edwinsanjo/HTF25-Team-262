import AdminDashboardClient from "./AdminDashboardClient";

interface Submission {
  _id: string;
  description: string;
  location: string;
  time: string;
  imageUrl: string;
}

export default async function AdminDashboardPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
  const [products, complaints]: [Submission[], Submission[]] = await Promise.all([
    fetch(`${API_BASE}/api/products`, { cache: 'no-store' }).then(r => r.json()).catch(() => []),
    fetch(`${API_BASE}/api/complaints`, { cache: 'no-store' }).then(r => r.json()).catch(() => []),
  ]);

  return <AdminDashboardClient products={products} complaints={complaints} />;
}
