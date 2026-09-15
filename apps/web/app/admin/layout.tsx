import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "ZooLearn Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-[#0a0a0f] flex text-white overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
