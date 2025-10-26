export default function BrandLogo({
  className = "h-8 w-8",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect width="48" height="48" rx="10" fill="url(#g)" />
      <path
        d="M14 28c2.5-4 7-9 12-9 5 0 9 5 11 9"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.98"
      />
      <path
        d="M16 33c3-2 7-4 12-4s9 2 12 4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
