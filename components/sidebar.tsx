"use client";

import React, { useState } from "react";
import {
  MenuIcon,
  OrdersIcon,
  BackIcon,
  ManageMenu,
  OngoingOrders,
  StorageIcon,
  Laporan,
  ManageKaryawan,
  ReservationIcon,
} from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  let pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { icon: <MenuIcon />, text: "Menu", href: "/pesanan/add" },
    { icon: <OrdersIcon />, text: "Pesanan", href: "/pesanan" },
    {
      icon: <OngoingOrders />,
      text: "Pesanan Berlangsung",
      href: "/pesanan/ongoing",
    },
    { icon: <ManageMenu />, text: "Manajemen Menu", href: "/menu" },
    { icon: <StorageIcon />, text: "Bahan Baku", href: "/bahan_baku" },
    { icon: <Laporan />, text: "Laporan", href: "/admin" },
    {
      icon: <ManageKaryawan />,
      text: "Kelola Karyawan",
      href: "/admin/karyawan",
    },
    {
      icon: <ReservationIcon />,
      text: "Reservasi",
      href: "/reservasi",
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (pathname === "/menu") {
      return item.href === "/menu" || item.href === "/pesanan/ongoing";
    } else if (
      pathname === "/pesanan" ||
      pathname === "/pesanan/add" ||
      pathname === "/reservasi"
    ) {
      return (
        item.href === "/pesanan/add" ||
        item.href === "/pesanan" ||
        item.href === "/reservasi"
      );
    } else if (pathname === "/pesanan/ongoing") {
      return item.href === "/menu" || item.href === "/pesanan/ongoing";
    } else if (pathname.startsWith("/bahan_baku")) {
      return item.href === "/bahan_baku";
    } else if (pathname.startsWith("/admin")) {
      return item.href === "/admin" || item.href === "/admin/karyawan";
    }

    return true;
  });

  return (
    <div
      className={`flex flex-col h-screen p-3 bg-white ${
        isExpanded ? "w-72" : "w-24"
      } transition-all duration-300 drop-shadow-md relative z-50`}
    >
      <button
        className={`mb-5 text-amber-950 hover:bg-red-100 hover:text-amber-900 transition-all duration-300 p-3.5 rounded-xl flex flex-col ${
          isExpanded ? "items-start" : "mx-auto"
        }`}
        onClick={toggleSidebar}
      >
        {isExpanded ? <BackIcon className="rotate-180" /> : <BackIcon />}
      </button>
      <div className="flex flex-col space-y-4 relative">
        {filteredMenuItems.map((item, index) => (
          <Link
            key={index}
            className={`flex flex-col ${
              isExpanded ? "items-start px-3" : "items-center"
            } cursor-pointer hover:bg-red-100 hover:text-amber-900 transition-all duration-300 p-3 py-4 rounded-xl relative ${
              pathname === item.href
                ? "bg-red-100 text-amber-900"
                : "text-amber-950"
            }`}
            href={item.href}
            onClick={() => console.log("pathnow:", pathname)}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex">
              <span className="text-2xl flex items-center">{item.icon}</span>
              {isExpanded && (
                <span className="ml-6 items-center justify-center flex text-start font-medium">
                  {item.text}
                </span>
              )}
            </div>
            {!isExpanded && (
              <div
                className={`absolute left-full top-1/2 transform -translate-y-1/2 bg-amber-900 text-white shadow-md p-2 px-4 rounded ml-2 transition-all duration-300 ${
                  hoveredItem === index ? "opacity-100 z-50" : "opacity-0 -z-50"
                }`}
              >
                {item.text}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
