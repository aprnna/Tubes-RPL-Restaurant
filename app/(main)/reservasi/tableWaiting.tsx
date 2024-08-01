"use client"

import Table from '@/components/table';
import React, { useEffect, useState } from 'react'
import Modal from "@/components/modal2";
import { useDisclosure } from "@nextui-org/modal";
import FormReservasi from './formReservasi';
import fetchApi from '@/utils/fetchApi';
import { toast } from 'react-toastify';
import { Loading } from '@/components/loading';

// interface EditDataWaiting {
//     id: number;
//     atasNama: string;
//     jumlah: number;
//     tanggal: Date;
//     idPelayan: number;
//     noHp: string;
//     status: string;
// }

export default function TableWaiting({querySearch}:any) {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [idWaiting, setIdBahan] = useState(0);
    const [editData, setEditData] = useState<any>();
    const modal = useDisclosure();


    const columns = [
        { key: "atas_nama", label: "Atas Nama" },
        { key: "banyak_orang", label: "Jumlah Orang" },
        { key: "tanggal", label: "Tanggal Reservasi" },
        { key: "id_user", label: "ID Pelayan" },
        { key: "no_telp", label: "Nomor Handphone" },
        { key: "action", label: "Action" },
      ];

    const getDataWaiting = async () => {
        setLoading(true);
        const {data} = await fetchApi("/reservasi", "GET");

        const filteredData = data.filter((item:any)=>
            item.status === "waiting"
        );

        setData(filteredData);
        setLoading(false);
    };

    const handleEdit = async (id: number) => {
        console.log("Edit item with id:", id);
        const dataEdit = data.find((item: any) => item.id === id);
    
        if (dataEdit) {
            const mappedData = {
              id: id,
              atasNama: dataEdit.atas_nama,
              jumlah: dataEdit.banyak_orang.toString(),
              noHp: dataEdit.no_telp,
              noMeja: dataEdit.no_meja,
            };

            setEditData(mappedData);
        }
        modal.onOpen();
      };

      async function handleEditSubmit(e: any) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
          atasNama: formData.get("atasNama"),
          jumlahOrang: formData.get("jumlahOrang"),
          nomorHp: formData.get("nomorHp"),
          noMeja: formData.get("noMeja"),
        };
    
        setLoading(true);
            const response = await fetchApi(`/reservasi/${editData.id}`, "PUT", data);
            
            
            if (response.status == 201)
                toast.success("Berhasil update reservasi");
            else if (response.status == 400)
                toast.error(response.message);
            else toast.error("Gagal update reservasi");
        setLoading(false);
        if (response.status == 201){
            modal.onClose();
            window.location.reload();
        }
      }


    useEffect(()=>{
        getDataWaiting();
    },[])

    useEffect(() => {
    const filteredData = data.filter((item: any) =>
        item.atas_nama.toLowerCase().includes(querySearch.toLowerCase())
    );

    setSearchData(filteredData);
    }, [querySearch]);

    return (
        <div className='w-full h-auto'>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Table
                        columns={columns}
                        data={querySearch == "" ? data : searchData}
                        // onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                    <Modal
                        btnActionTitle="Edit Bahan Baku"
                        isOpen={modal.isOpen}
                        loading={loading}
                        submit={handleEditSubmit}
                        title="Edit Bahan Baku"
                        onOpenChange={modal.onOpenChange}
                        sizeModal="xl"
                    >
                        <FormReservasi initialData={editData} />
                    </Modal>
                </>
            )}
        </div>
    )
}
