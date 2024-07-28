"use client";
import TopContent from "@/components/top-content";
import TableRiwayatBahan from "./TableRiwayatBahan";
import Head from "@/components/head";

export default function Page() {
  return (
    <div className="w-full h-screen bg-slate-50 flex flex-col">
      <TopContent />
      <Head />
      <div className="flex overflow-hidden">
        <div className="flex-1  flex flex-row overflow-auto">
          <TableRiwayatBahan />
        </div>
      </div>
    </div>
  );
}
