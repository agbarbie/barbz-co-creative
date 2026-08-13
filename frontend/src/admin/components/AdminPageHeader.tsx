export default function AdminPageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-primary text-2xl font-bold text-white">{title}</h1>
      {subtitle && <p className="mt-1 font-secondary text-sm text-sky-300">{subtitle}</p>}
    </div>
  );
}
