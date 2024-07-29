"use client"

import Table from '@/components/table';
import React, { useEffect, useState } from 'react'
import Modal from "@/components/modal2";
import { useDisclosure } from "@nextui-org/modal";
import FormReservasi from './formReservasi';
import fetchApi from '@/utils/fetchApi';

interface EditDataWaiting {
    id: number;
    atasNama: string;
    jumlah: number;
    tanggal: Date;
    idPelayan: number;
    noHp: string;
    status: string;
}

export default function TableWaiting({querySearch}:any) {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [idWaiting, setIdBahan] = useState(0);
    const [editData, setEditData] = useState<EditDataWaiting>({
        id: 0,
        atasNama: '',
        jumlah: 0,
        tanggal: new Date(),
        idPelayan: 0,
        status: '',
        noHp: ''
      });
    const modal = useDisclosure();


    const columns = [
        { key: "atas_nama", label: "Atas Nama" },
        { key: "banyak_orang", label: "Jumlah Orang" },
        { key: "tanggal", label: "Tanggal Reservasi" },
        { key: "id_user", label: "ID Pelayan" },
        { key: "no_telp", label: "Nomor Handphone" },
        { key: "action", label: "Action" },
      ];

    const dataReservasi = [
        {
            "id": 1,
            "atasNama": "Rizky",
            "jumlah": 2,
            "tanggal": "2022-12-12",
            "idPelayan": 1,
            "status": "waiting",
            "noHp": "0123412341"
        },
        {
            "id": 2,
            "atasNama": "Rizky",
            "jumlah": 2,
            "tanggal": "2022-12-12",
            "idPelayan": 1,
            "status": "waiting",
            "noHp": "0123412341"
        },
        {
            "id": 3,
            "atasNama": "Rizky",
            "jumlah": 2,
            "tanggal": "2022-12-12",
            "idPelayan": 1,
            "status": "waiting",
            "noHp": "0123412341"
        },
        {
            "id": 4,
            "atasNama": "Rizky",
            "jumlah": 2,
            "tanggal": "2022-12-12",
            "idPelayan": 1,
            "status": "ontable",
            "noHp": "0123412341"
        }
    ];

    const getDataWaiting = async () => {
        const {data} = await fetchApi("/reservasi", "GET");

        const filteredData = data.filter((item:any)=>
            item.status === "waiting"
        );

        setData(filteredData);
    };

    const handleEdit = async (id: number) => {
        console.log("Edit item with id:", id);
        const dataEdit = data.find((item: any) => item.id === id);
    
        if (dataEdit) setEditData(dataEdit);
        modal.onOpen();
      };

    // useEffect(() => {
    //     const waitingData = dataReservasi.filter((item: any) =>
    //         item.status === "waiting"
    //     );

    //     setData(waitingData);
    // }, [])

    useEffect(()=>{
        getDataWaiting();
    },[])

    useEffect(() => {
    const filteredData = data.filter((item: any) =>
        item.atasNama.toLowerCase().includes(querySearch.toLowerCase())
    );

    setSearchData(filteredData);
    }, [querySearch]);

    return (
        <div className='w-full h-auto'>
            <Table
                columns={columns}
                data={querySearch == "" ? data : searchData}
                // onDelete={handleDelete}
                onEdit={handleEdit}
              />
            <Modal
                btnActionTitle="Edit Bahan Baku"
                isOpen={modal.isOpen}
                // loading={loadingUpdate}
                // submit={handleEditSubmit}
                title="Edit Bahan Baku"
                onOpenChange={modal.onOpenChange}
                sizeModal="xl"
           >
                <FormReservasi initialData={editData} />
           </Modal>
           
        </div>
    )
}
