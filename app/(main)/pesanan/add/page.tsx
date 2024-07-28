import { title } from "@/components/primitives";
import TopContent from "@/components/top-content";
import MenuCards from "../menuCards";
import { OrderDetails } from "../ordersDetails";
import { CartProvider } from "../allContext";
import SearchBar from "@/components/searchBar";
import Head from "@/components/head";

export default function Page() {
  return (
    <div className="w-full h-screen bg-slate-50 flex flex-col">
      <CartProvider>
        <TopContent />
        {/* <TableMenu /> */}
        {/* <Head/> */}
        <SearchBar />
        <div className="flex overflow-hidden">
          <div className="flex-1  flex flex-row overflow-auto">
            <MenuCards />
          </div>
          <div className="flex flex-col">
            <OrderDetails />
          </div>
        </div>
      </CartProvider>
    </div>
  );
}
