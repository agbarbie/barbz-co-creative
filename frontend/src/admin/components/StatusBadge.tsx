const colorMap: Record<string, string> = {
  pending_review: 'bg-amber-400/10 text-amber-300 ring-amber-400/30',
  requested: 'bg-amber-400/10 text-amber-300 ring-amber-400/30',
  new: 'bg-amber-400/10 text-amber-300 ring-amber-400/30',
  mockup_sent: 'bg-sky-400/10 text-sky-300 ring-sky-400/30',
  confirmed: 'bg-sky-400/10 text-sky-300 ring-sky-400/30',
  approved: 'bg-sky-400/10 text-sky-300 ring-sky-400/30',
  in_production: 'bg-purple-400/10 text-purple-300 ring-purple-400/30',
  completed: 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/30',
  won: 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/30',
  cancelled: 'bg-red-400/10 text-red-300 ring-red-400/30',
  lost: 'bg-red-400/10 text-red-300 ring-red-400/30',
  quoted: 'bg-sky-400/10 text-sky-300 ring-sky-400/30',
};

export default function StatusBadge({ status }: { status: string }) {
  const classes = colorMap[status] || 'bg-white/10 text-sky-200 ring-white/20';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 font-secondary text-xs font-medium ring-1 ring-inset ${classes}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}
