import { Button } from '@/components/Button'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'


export default function TableDetails({table, onClear}:any) {
  return (
    <AnimatePresence>
       <>
       <motion.div
            key={table.id}
            animate={{ x: 0 }}
            // className="w-[420px] h-full relative"
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
                  <div className="flex justify-between">
                    <h4>Atas Nama</h4>
                    <input
                      // disabled
                      className="text-end bg-white font-medium"
                      type="text"
                    />
                  </div>
                  <div className="flex justify-between">
                    <h4>Jumlah Orang</h4>
                    <input
                      // disabled
                      className="text-end bg-white font-medium"
                      type="number"
                    />
                  </div>
                  <div className="flex justify-between">
                    <h4>Tanggal Reservasi</h4>
                    <input
                      disabled
                      className="text-end bg-white font-medium"
                      type="datetime-local"
                    />
                  </div>
                  <div className="flex justify-between">
                    <h4>ID Pelayan</h4>
                    <input
                      disabled
                      className="text-end bg-white font-medium"
                      type="text"
                    />
                  </div>
              </div>
              <div className="w-full border-t-2 border-dashed border-gray-400 my-4" />
                {table.status == 'Full'?(
                  <Button className='w-full' onPress={onClear}>Kosongkan</Button>
                ):(
                  <></>
                )}
            </div>
          </div>
          </motion.div>
       </>
    </AnimatePresence>
    // <div className='bg-green-500'>tableDetails</div>
  )
}
