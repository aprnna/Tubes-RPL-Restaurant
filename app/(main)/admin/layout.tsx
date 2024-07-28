import Sidebar from "@/components/sidebar";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="w-full h-auto flex items-center justify-center bg-slate-900">
        <Sidebar />
        {children}
      </section>
    </>
  );
}
