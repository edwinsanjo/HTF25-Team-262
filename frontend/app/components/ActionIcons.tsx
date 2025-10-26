interface IconProps {
  className?: string;
}

export function ReportFoundIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <div className={`rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold ${className}`}>
      F
    </div>
  );
}

export function ReportMissingIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <div className={`rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold ${className}`}>
      M
    </div>
  );
}