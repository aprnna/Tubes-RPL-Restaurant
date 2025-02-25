'use client'

import { useCart } from "@/app/(main)/pesanan/allContext";
import React from "react";

export default function SearchBar(){
    const { setSearchQuery, setSearchCategory } = useCart();

    const handleSearchChange = (event: { target: { value: string; }; }) => {
        const { value } = event.target;

        setSearchQuery(value);
        setSearchCategory(value);
    };

    return(
        <div className="flex px-12 py-4">
            <div className="flex w-full bg-white rounded-lg drop-shadow-md">
                <img alt="search" src="../search-icon.svg" />
                <input className="w-full border-none outline-none rounded-lg" placeholder="Search" type="text" onChange={handleSearchChange}/>
            </div>
        </div>
    );
}