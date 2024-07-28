"use client";
import { useEffect, useState } from "react";
import fetchApi from "@/utils/fetchApi";
import Table from "@/components/table";
import { useCart } from "./allContext";

export default function TablePesanan() {
  const [pesanan, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useCart();

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
    { key: "atasNama", label: "Atas Nama" },
    { key: "banyak_orang", label: "Banyak Orang" },
    { key: "createdAt", label: "Dibuat" },
    { key: "status", label: "Status" },
  ];

  const filteredPesanan = pesanan.filter(
    (item: any) =>
      item.atasNama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.createdAt.toString().includes(searchQuery)
  );

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center h-auto p-10">
          <img alt="Loading..." className="max-w-14" src="/loading1.gif" />
          <p>Loading...</p>
        </div>
      ) : (
        <Table columns={columns} data={filteredPesanan} />
      )}
    </>
  );
}
