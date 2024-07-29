import { Button } from '@/components/Button';
import { ReservationIcon } from '@/components/icons';
import fetchApi from '@/utils/fetchApi';
import React, { useEffect, useState } from 'react'

export default function TableCards({querySearch, onTableClick }:any) {
    const [table, setTable] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState<any>([]);

    const getTableData = async () =>{
      setLoading(true);
      const {data} = await fetchApi('/meja', "GET");

      const sortedData = data.sort((a: any, b: any) => a.no_meja - b.no_meja);

      setTable(sortedData);
      setSearchData(sortedData);
      setLoading(false);
    }

  const handleClick = (table: any) => {
    onTableClick(table);
  };

  useEffect(()=>{
    getTableData();
  },[]);

  useEffect(() => {
    if(querySearch){
      const filteredData = table.filter((item: any) =>
          item.no_meja == querySearch
      );

      setSearchData(filteredData);
    }else{
      setSearchData(table);
    }

    }, [querySearch]);


  return (
    <div className='flex flex-wrap justify-between px-12 gap-8 pb-6 h-max w-full mt-2'>
        {/* <div className="flex drop-shadow-md gap-4"> */}
        {searchData.map((table: any) => (
          <div 
            key={table.no_meja}
            className='bg-white rounded-xl min-w-[200px] flex flex-col p-4 items-center drop-shadow-md'
            >
                <div className='flex flex-col items-center gap-1'>
                  <svg className='fill-amber-950' width="76" height="65" viewBox="0 0 76 65" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.9359 10C15.5895 10 13.6788 11.9107 13.6788 14.2571C13.6788 16.6035 15.5895 18.5141 17.9359 18.5141C20.2823 18.5141 22.193 16.6035 22.193 14.2571C22.193 11.9107 20.2823 10 17.9359 10ZM58.0692 10C55.7228 10 53.8121 11.9107 53.8121 14.2571C53.8121 16.6035 55.7228 18.5141 58.0692 18.5141C60.4156 18.5141 62.3263 16.6035 62.3263 14.2571C62.3263 11.9107 60.4156 10 58.0692 10ZM17.9359 19.7304C15.5895 19.7304 13.6788 21.6363 13.6788 23.9827L13.698 36.5001C13.88 38.6885 15.7331 40.4029 17.9359 40.4029H21.5465L22.4563 34.3213H22.193L22.1882 23.9205C21.9104 21.4543 20.1674 19.7304 17.9359 19.7304ZM58.0692 19.7304C55.8329 19.7304 54.0899 21.4543 53.8169 23.9205L53.8121 34.3213H53.544L54.4586 40.4029H58.0692C60.2672 40.4029 62.1252 38.6885 62.3071 36.5001L62.3263 23.9827C62.3263 21.6363 60.4156 19.7304 58.0692 19.7304ZM11.2271 20.9276C10.5567 20.942 10.0203 21.4927 10.0299 22.1583V39.4787C10.0299 39.4978 10.0299 39.5218 10.0299 39.5457C10.1305 41.1882 11.0595 42.5865 12.3955 43.3766L11.2558 53.6481C11.1792 54.3138 11.658 54.9171 12.3284 54.989C12.9941 55.0608 13.5974 54.5819 13.6693 53.9115L14.7706 44.047C14.7802 44.047 14.7946 44.0518 14.8089 44.0518H23.4572L22.2073 52.3839C22.169 52.6617 22.2217 52.9394 22.3558 53.1789C22.6048 53.605 23.7253 54.9985 27.6855 54.9985C29.9218 54.9985 31.1908 54.5005 31.9186 54.06V45.2681C31.9186 44.5977 32.4597 44.0518 33.1349 44.0518C33.8101 44.0518 34.3512 44.5977 34.3512 45.2681V54.1462C35.0695 54.5771 36.214 54.9985 38.0002 54.9985C39.7863 54.9985 40.9308 54.5771 41.6491 54.1462V47.7007C41.6491 47.0303 42.1902 46.4844 42.8654 46.4844C43.5406 46.4844 44.0817 47.0303 44.0817 47.7007V54.0121C44.891 54.4622 46.2988 54.9985 48.4202 54.9985C51.8632 54.9985 53.3237 53.5667 53.4721 53.3991C53.7355 53.131 53.8552 52.7527 53.7978 52.3839L52.5479 44.0518H61.1914C61.2057 44.0518 61.2201 44.047 61.2345 44.047L62.3311 53.9115C62.4029 54.5819 63.0063 55.0608 63.6767 54.9937C64.3423 54.9171 64.8211 54.3138 64.7541 53.6481L63.6096 43.3766C64.9409 42.5865 65.8746 41.1882 65.9704 39.5457C65.9704 39.5218 65.9704 39.4978 65.9704 39.4787V22.1583C65.9752 21.8326 65.8507 21.5166 65.6161 21.282C65.3814 21.0473 65.0654 20.9228 64.7397 20.9276C64.0693 20.942 63.533 21.4927 63.5426 22.1583V39.4116C63.466 40.6662 62.446 41.6192 61.1914 41.6192H52.184L50.1489 28.0626C50.0579 27.4688 49.5503 27.0235 48.9469 27.0235H27.0534C26.45 27.0235 25.9425 27.4688 25.8563 28.0626L23.8211 41.6192H14.8089C13.5543 41.6192 12.5391 40.6662 12.4625 39.4116V22.1583C12.4673 21.8326 12.338 21.5166 12.1034 21.282C11.8735 21.0473 11.5527 20.9228 11.2271 20.9276Z"/>
                  </svg>
                  <h1>Table {table.no_meja}</h1>
                  <p>Max {table.kapasitas}</p>
                </div>
                <div className="w-full border-t-2 border-dashed border-gray-400 my-4" />
                <Button 
                  className={`w-full ${table.status == 'Available'? 'bg-amber-700': 'bg-amber-900'}`}
                  onClick={() => handleClick(table)} 
                  >
                    {table.status}
                </Button>
              </div>
        ))}
        {/* </div> */}
    </div>
  )
}
