'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ActionCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
}

export default function ActionCard({ icon, title, description, href, className = '', ...props }: ActionCardProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href}
      className={`
        flex items-center gap-3 glass-card p-4 rounded-lg soft-glow w-full sm:w-auto
        transition-all duration-200 hover:scale-102 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
        ${isActive ? 'ring-2 ring-indigo-400 ring-offset-2' : ''}
        ${className}
      `}
      role="button"
      aria-current={isActive ? 'page' : undefined}
    >
      {icon}
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </Link>
  );
}