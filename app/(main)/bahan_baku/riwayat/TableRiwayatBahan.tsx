"use client";
import { useEffect, useState } from "react";
import fetchApi from "@/utils/fetchApi";
import Table from "@/components/table";
import { Loading } from "@/components/loading";

export default function TableRiwayatBahan() {
  const [bahan, setBahan] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getBahan() {
    setLoading(true);
    const { data } = await fetchApi("/bahan/riwayat", "GET");

    setBahan(data);
    setLoading(false);
  }
  useEffect(() => {
    getBahan();
  }, []);

  const columns = [
    { key: "nama_user", label: "Nama Karyawan" },
    { key: "nama_bahan", label: "Nama Bahan" },
    { key: "jumlah", label: "Jumlah" },
    { key: "createdAt", label: "Tanggal" },
    { key: "proses", label: "Proses" },
  ];

  return (
    <div className="w-full h-auto">
      {/* <h1 className="text-2xl font-bold">Menu</h1> */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <Table columns={columns} data={bahan} />
        </>
      )}
    </div>
  );
}
