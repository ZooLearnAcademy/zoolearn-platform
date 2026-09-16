import { Navbar } from "@/components/navbar";

export default function TaxonomyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950">
      <Navbar />
      <main className="flex-1 overflow-hidden relative">{children}</main>
    </div>
  );
}
