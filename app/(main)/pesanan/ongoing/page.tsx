import { title } from "@/components/primitives";
import TopContent from "@/components/top-content";
import OrderCards from "../orderCards";
import Head from "@/components/head";

export default function AboutPage() {
  
  return (
    <div className="w-full h-screen bg-slate-50 flex flex-col">
        <TopContent />
        {/* <Head/> */}
        <OrderCards/>
    </div>
  );
}
