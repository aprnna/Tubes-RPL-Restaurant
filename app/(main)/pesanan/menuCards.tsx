"use client";
import { useEffect, useState } from "react";
import fetchApi from "@/utils/fetchApi";
import { useCart} from "./allContext";
import { getDateTimeLocal } from "@/utils/getDateTimeLocal";

export default function MenuCards(){
    const [menu, setMenu] = useState([]);
    // const [cart, setCart] = useState<{ [key: number]: number }>({});
    const { cart, searchQuery, searchCategory, addToCart, increaseQuantity, decreaseQuantity, updateDateTime} = useCart();
    const [loading, setLoading] = useState(true);

    async function getMenu() {
        setLoading(true);
        const {data} = await fetchApi("/menu", "GET");

        setMenu(data);
        setLoading(false);
    }

    useEffect(() => {
        getMenu();
    }, []);

    useEffect(() => {
        console.log("Cart updated:", cart);
    }, [cart]);

    const handleAddToCart = (item:any) => {
      addToCart(item);
      updateDateTime(getDateTimeLocal());
    };

    const handleDecreaseQuantity = (id:number) => {
      decreaseQuantity(id);
      updateDateTime(getDateTimeLocal());
    };

    const handleIncreaseQuantity = (id:number) => {
      increaseQuantity(id);
      updateDateTime(getDateTimeLocal());
    };

    const filteredMenu = menu.filter((item:any) =>
      // console.log(item)
      ((item.nama.toLowerCase().includes(searchQuery.toLowerCase()) || item.kategori.toLowerCase().includes(searchCategory.toLowerCase())) && item.tersedia == true)
    );

    // const addToCart = (id: number) => {
    //     console.log("Added menu id:", id);
    //     setCart((prevCart) => ({
    //       ...prevCart,
    //       [id]: 1,
    //     }));
        
    //   };
    
    //   const increaseQuantity = (id: number) => {
    //     setCart((prevCart) => ({
    //         ...prevCart,
    //         [id]: prevCart[id] + 1,
    //     }));
    //     console.log("Added menu id:", cart);
    //   };
    
    //   const decreaseQuantity = (id: number) => {
    //     setCart((prevCart) => {
    //       const newQuantity = prevCart[id] - 1;

    //       if (newQuantity > 0) {
    //         return { ...prevCart, [id]: newQuantity };
    //       } else {
    //         const { [id]: _, ...rest } = prevCart;

    //         return rest;
    //       }
    //     });
    //     console.log("Added menu id:", cart);
    //   };

    return (
      <div className={`flex flex-wrap ${cart.length > 0?"justify-around":"justify-between"} px-12 gap-8 pb-6 h-max ${loading?'w-full':'w-auto'}`}>
        {loading ? (
            <div className="flex flex-col items-center justify-center p-10 w-full h-full">
            <img alt="Loading..." className="max-w-14" src="/loading1.gif" />
            <p>Loading...</p>
            </div>
        ) : (
          <>
          {filteredMenu.map((item: any) => (
            <div key={item.id} className="flex drop-shadow-md">
              <div className={`flex flex-col bg-white ${cart.length > 0?"w-[260px]":"w-[285px]"} h-auto p-6 rounded-lg items-center gap-4 hover:bg-red-100 transition-all duration-300`}>
                <img alt={item.nama} className={`border w-full h-auto ${cart.length > 0?"max-h-[250px] min-h-[250px]":"max-h-[270px] min-h-[270px]"} rounded-xl`} src={item.foto} />
                <div className="flex flex-col justify-center items-center gap-1">
                  <h1>{item.nama}</h1>
                  <p className="text-2xl font-bold">Rp. {item.harga}</p>
                </div>
                {cart.find(cartItem => cartItem.id === item.id) ? (
                  <div className="flex items-center gap-3 w-max justify-center bg-white rounded-full">
                    <button
                      className="bg-amber-950 hover:bg-amber-900 text-white p-2 rounded-full"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      <img alt="minus" src="../minus.svg" />    
                    </button>
                    <span className="w-max min-w-10 p-2 px-4 text-center">
                      {cart.find(cartItem => cartItem.id === item.id)?.quantity}
                    </span>
                    <button
                      className="bg-amber-950 hover:bg-amber-900 text-white p-2 rounded-full"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      <img alt="plus" src="../add.svg" />
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-amber-950 hover:bg-amber-900 text-slate-50 py-3 rounded-xl cursor-pointer transition-all duration-300 w-full"
                    onClick={() => handleAddToCart({ id: item.id, nama: item.nama, harga: item.harga, foto: item.foto, quantity: 1 })}
                  >
                    Tambahkan Menu
                  </button>
                )}
              </div>
            </div>
          ))}
          </>
        )}
        </div>
      );
}