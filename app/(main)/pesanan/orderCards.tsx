"use client";

import { useEffect, useState } from "react";
import fetchApi from "@/utils/fetchApi";
import { formatCurrency } from "@/utils/formatCurrency";
import { toast } from "react-toastify";

interface MenuItem {
  id: number;
  nama: string;
  harga: number;
  foto: string;
}

interface OrderItem {
  id_menu: number;
  jumlah: number;
}

interface Order {
  id: number;
  atasNama: string;
  banyak_orang: number;
  createdAt: string;
  id_users: string;
}

interface OrderData {
  order: Order[];
  menuDetails: MenuItem[];
  items: OrderItem[];
}

export default function OrderCards() {
  const [orders, setOrders] = useState([]);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const taxRate = 0.05;

  async function getOrders() {
    setLoading(true);
    const { data } = await fetchApi("/pesanan/ongoing", "GET");

    setOrders(data);
    setLoading(false);
  }

  async function getOrderData(orderId: number) {
    setDetailsLoading(true);
    const { data } = await fetchApi(`/pesanan/${orderId}`, "GET");

    setOrderData(data);
    setDetailsLoading(false);
  }

  async function updateOrderStatus(orderId: number) {
    setDetailsLoading(true);
    const { data, error } = await fetchApi(`/pesanan/${orderId}`, "PUT", {
      status: "selesai",
    });

    if (error) {
      toast.error("Failed to update order status");

      return;
    }
    getOrders();
    setOrderData(null);
    setDetailsLoading(false);
    toast.success("Order status updated successfully");
  }

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    if (orderData) {
      let tempSubtotal = 0;

      orderData.menuDetails.forEach((item) => {
        orderData.items.forEach((qty) => {
          if (qty.id_menu === item.id) {
            tempSubtotal += item.harga * qty.jumlah;
          }
        });
      });
      setSubtotal(tempSubtotal);
    }
  }, [orderData]);

  function formatID(id: number): string {
    const prefix = "NT";
    const paddedID = id.toString().padStart(6, "0");

    return `${prefix}${paddedID}`;
  }

  function formatToDateTimeLocal(timestamp: string) {
    const parts = timestamp.split("T");

    const datePart = parts[0].split("-");
    const year = datePart[0];
    const month = datePart[1];
    const day = datePart[2];

    const timePart = parts[1].split(".")[0].split(":");

    const hour = timePart[0];
    const minute = timePart[1];
    const second = timePart[2];

    const formattedDateTimeLocal = `${day}-${month}-${year} ${hour}:${minute}:${second}`;

    console.log(formattedDateTimeLocal);

    return formattedDateTimeLocal;
  }

  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex flex-wrap items-center justify-evenly px-12 py-12 gap-6 ${loading ? "w-full" : "w-auto"} overflow-auto`}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center p-10 w-full h-full">
            <img alt="Loading..." className="max-w-14" src="/loading1.gif" />
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {orders.map((order: any, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center min-w-72 rounded-2xl bg-white shadow-lg p-4"
              >
                <div className="flex flex-rows items-center justify-between w-full rounded-lg px-4">
                  <h1 className="text-lg font-bold text-gray-800">
                    {order.atasNama}
                  </h1>
                  <p className="text-lg font-semibold text-gray-800">
                    #{formatID(order.id)}
                  </p>
                </div>
                <div className="w-full border-t-2 border-dashed border-gray-400 my-4" />
                <button
                  className="bg-amber-950 text-slate-50 text-lg py-2 w-full rounded-xl hover:bg-amber-900 transition-all duration-300"
                  onClick={() => getOrderData(order.id)}
                >
                  Lihat Pesanan
                </button>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="w-auto">
        {detailsLoading ? (
          <div className=" mt-12 mr-12 items-center min-w-[512px] justify-center rounded-t-lg py-4 px-6">
            <div className="flex flex-col items-center justify-center h-full">
              <img alt="Loading..." className="max-w-14" src="/loading1.gif" />
              <p>Loading...</p>
            </div>
          </div>
        ) : (
          orderData && (
            <div className="flex flex-col drop-shadow-lg h-full">
              <div className="bg-white mt-2 mr-12 items-center min-w-[512px] justify-center rounded-t-lg py-4 px-6">
                <h1 className="font-bold text-2xl">Detail Pesanan</h1>
                <div className="flex flex-col gap-1 pt-1.5 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <h4>ID Pesanan</h4>
                    <input
                      disabled
                      className="text-end bg-white font-medium"
                      type="text"
                      value={formatID(orderData.order[0].id)}
                    />
                  </div>
                  <div className="flex justify-between">
                    <h4>Atas Nama</h4>
                    <input
                      disabled
                      className="text-end bg-white font-medium"
                      type="text"
                      value={orderData.order[0].atasNama}
                    />
                  </div>
                  <div className="flex justify-between">
                    <h4>Jumlah Orang</h4>
                    <input
                      disabled
                      className="text-end bg-white font-medium"
                      type="number"
                      value={orderData.order[0].banyak_orang}
                    />
                  </div>
                  <div className="flex justify-between">
                    <h4>Tanggal Pesanan</h4>
                    <input
                      disabled
                      className="text-end bg-white font-medium "
                      type="timestamp"
                      value={formatToDateTimeLocal(
                        orderData.order[0].createdAt
                      )}
                    />
                  </div>
                  <div className="flex justify-between">
                    <h4 className="w-1/2">ID Kasir</h4>
                    <input
                      disabled
                      className="text-end bg-white font-medium w-full"
                      type="text"
                      value={orderData.order[0].id_users.split("-")[0]}
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-2 min-h-48 max-h-48">
                  <h1 className="font-bold text-2xl">Produk</h1>
                  <div className="overflow-auto">
                    {orderData.menuDetails.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-row gap-4 mt-4 text-gray-600"
                      >
                        <div className="flex border rounded-lg max-w-16 max-h-16">
                          <img
                            alt={item.nama}
                            className="rounded-lg"
                            src={item.foto}
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <h1 className="font-bold">{item.nama}</h1>
                          <h2 className="text-sm font-semibold">
                            Rp. {item.harga}
                          </h2>
                        </div>
                        <div className="flex flex-row items-center text-sm font-semibold">
                          <span>
                            Qty:{" "}
                            {orderData.items.map((qty) =>
                              qty.id_menu === item.id ? qty.jumlah : null
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-white mr-12 py-6 px-6 drop-shadow-md shadow-inner gap-1 rounded-b-lg text-gray-600">
                <div className="flex justify-between">
                  <h4>Sub Total</h4>
                  <h4 className="font-medium">{formatCurrency(subtotal)}</h4>
                </div>
                <div className="flex justify-between">
                  <h4>Tax (5%)</h4>
                  <h4 className="font-medium">{formatCurrency(tax)}</h4>
                </div>
                <div className="flex justify-between text-xl text-amber-900">
                  <h4>Total</h4>
                  <h4 className="font-bold">{formatCurrency(total)}</h4>
                </div>
                <button
                  className="bg-amber-950 text-slate-50 py-3 px-5 w-full rounded-lg mt-4 hover:bg-amber-900 transition-all duration-300"
                  onClick={() => updateOrderStatus(orderData.order[0].id)}
                >
                  Selesai
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
