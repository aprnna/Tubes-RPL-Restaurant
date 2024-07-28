import Sidebar from "@/components/sidebar";


export default function Layout({
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
