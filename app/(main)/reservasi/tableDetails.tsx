import { Button } from '@/components/Button'
import fetchApi from '@/utils/fetchApi';
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'


export default function TableDetails({table, onClear}:any) {

  const [data, setData] = useState<any>([]);

  const getData = async () => {
    const {data} = await fetchApi(`/meja/${table.no_meja}`, "GET")

    setData(data);
  };

  const formatDateTimeLocal = (timestamp:string) => {
      const date = new Date(timestamp);
      const pad = (num:any) => num.toString().padStart(2, '0');

      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());

      return `${year}-${month}-${day}T${hours}:${minutes}`;
  };


  useEffect(()=>{
    getData();
  },[table.no_meja]);
  

  return (
    <AnimatePresence>
       <>
       <motion.div
            key={table.id}
            animate={{ x: 0 }}
            className="w-[420px] h-full relative"
            exit={{ x: "100%" }}
            initial={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
           >
          <div className="flex flex-col drop-shadow-lg h-full mt-2">
            <div className="bg-white mr-12 items-center justify-center rounded-lg py-4 px-6">
              <h1 className="font-bold text-2xl">Detail Meja</h1>
              <div className="flex flex-col gap-1 pt-1.5 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <h4>No Meja</h4>
                    <input
                      disabled
                      className="text-end bg-white font-medium"
                      type="text"
                      value={table.no_meja}
                    />
                  </div>
                  <div className="flex justify-between">
                    <h4>Kapasitas Meja</h4>
                    <input
                      disabled
                      className="text-end bg-white font-medium"
                      type="text"
                      value={table.kapasitas}
                    />
                  </div>
                  {data.reservasi ? (
                    <>
                      {data.reservasi.map((reservasi: any) => (
                        <div key={reservasi.id}>
                          <div className="flex justify-between">
                            <h4>Atas Nama</h4>
                            <input
                              disabled
                              className="text-end bg-white font-medium"
                              type="text"
                              value={reservasi.atas_nama}
                            />
                          </div>
                          <div className="flex justify-between">
                            <h4>Jumlah Orang</h4>
                            <input
                              disabled
                              className="text-end bg-white font-medium"
                              type="text"
                              value={reservasi.banyak_orang}
                            />
                          </div>
                          <div className="flex justify-between">
                            <h4>Tanggal Reservasi</h4>
                            <input
                              disabled
                              className="text-end bg-white w-[200px] font-medium"
                              type="text"
                              value={formatDateTimeLocal(reservasi.tanggal)}
                            />
                          </div>
                          <div className="flex justify-between">
                            <h4>ID Pelayan</h4>
                            <input
                              disabled
                              className="text-end bg-white font-medium"
                              type="text"
                              value={reservasi.id_user}
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  ):(
                    <></>
                  )}
              </div>
              <div className="w-full border-t-2 border-dashed border-gray-400 my-4" />
                {table.status == 'Full'?(
                  <Button className='w-full' onPress={onClear}>Kosongkan</Button>
                ):(
                  <p>Tidak Ada Reservasi di Meja Ini</p>
                )}
            </div>
          </div>
          </motion.div>
       </>
    </AnimatePresence>
    // <div className='bg-green-500'>tableDetails</div>
  )
}
