"use client"
import TopContent from '@/components/top-content'
import React, {useState} from 'react'
import { useDisclosure } from "@nextui-org/modal";
import Head from '@/components/head';
import { Button } from '@/components/Button';
import SearchBar2 from '@/components/SearchBar2';
import Modal from '@/components/modal2';
import FormReservasi from './formReservasi';
import TableCards from './tableCards';
import TableDetails from './tableDetails';
import TableWaiting from './tableWaiting';


export default function Page() {
    const modal = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [querySearch, setQuerySearch] = useState("");
    const [selectedTable, setSelectedTable] = useState<any>(null);

    const handleTableClick = (table: any) => {
        setSelectedTable(table);
      };


    return (
        <div className="w-full h-screen bg-slate-50 flex flex-col">
            <TopContent/>
            <Head>
                <Button onPress={modal.onOpen}>Tambah Reservasi</Button>
            </Head>
            <Modal
                btnActionTitle="Tambah Reservasi"
                isOpen={modal.isOpen}
                loading={loading}
                // submit={handleSubmit}
                title="Penambahan Reservasi"
                onOpenChange={modal.onOpenChange}
                sizeModal="xl"
            >
                <FormReservasi />
            </Modal>
            <SearchBar2 setSearchQuery={setQuerySearch}/>
            <div className='flex flex-col overflow-auto'>
                    <div className='flex'>
                        <div className="flex-1 flex flex-row overflow-auto">
                            <TableCards onTableClick={handleTableClick}/>
                        </div>
                        <div className="flex flex-col">
                            {selectedTable && <TableDetails table={selectedTable} onClear={() => setSelectedTable(null)}/>}
                        </div>
                    </div>
                <h1 className='font-semibold text-3xl pl-12 my-3'>Waiting List</h1>
                <TableWaiting querySearch={querySearch} />
            </div>
        </div>
    )
}
