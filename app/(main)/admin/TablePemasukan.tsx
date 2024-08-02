"use client";
import { useEffect, useState } from "react";
import fetchApi from "@/utils/fetchApi";
import Table from "@/components/table";
import { Loading } from "@/components/loading";

export default function TablePemasukan() {
  const [pesanan, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getMenu() {
    setLoading(true);
    const { data } = await fetchApi("/pesanan", "GET");

    setMenu(data);
    setLoading(false);
  }

  useEffect(() => {
    getMenu();
  }, []);

  const columns = [
    { key: "id", label: "Id Nota" },
    { key: "atas_nama", label: "Atas Nama" },
    { key: "banyak_orang", label: "Banyak Orang" },
    { key: "total_harga", label: "Total Harga" },
    { key: "createdAt", label: "Dibuat" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="h-auto">
      {loading ? <Loading /> : <Table columns={columns} data={pesanan} />}
    </div>
  );
}
