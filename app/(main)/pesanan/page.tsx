import { title } from "@/components/primitives";
import TopContent from "@/components/top-content";
import TablePesanan from "./tablePesanan";
import { CartProvider } from "./allContext";
import SearchBar from "@/components/searchBar";
import Head from "@/components/head";
// import Sidebar from "@/components/sidebar";

export default function AboutPage() {
  return (
    <div className="w-full h-screen bg-slate-50 flex flex-col">
        <TopContent/>
        <CartProvider>
          {/* <Head/> */}
          <SearchBar/>
          <TablePesanan/>
        </CartProvider>
    </div>
  );
}
