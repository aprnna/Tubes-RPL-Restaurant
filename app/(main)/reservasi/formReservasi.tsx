import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { get } from "http";
import fetchApi from "@/utils/fetchApi";
export default function FormReservasi({ initialData }: { initialData?: any }) {
  let { atasNama, jumlah, noHp, noMeja} = initialData || {};
  const [data, setData] = useState({
    atasNama: atasNama || "",
    jumlah: jumlah || "",
    noHp: noHp || "",
    noMeja: noMeja || null,
  });

  const [meja, setMeja] = useState([]);

  const getMeja = async () => {
    const {data} = await fetchApi("/meja", "GET");

    const filteredData = data.filter((item: any) =>
      item.status == "Available"
    );

    const sortedData = filteredData.sort((a: any, b: any) => a.no_meja - b.no_meja);

    setMeja(sortedData);
  }

  useEffect(()=>{
    getMeja();
  },[])


  const handleSelectChange = (key: any) => {
    setData(prevData => ({
      ...prevData,
      noMeja: key,
    }));
  };

  return (
    <>
      <Input
        label="Atas Nama"
        labelPlacement="outside"
        name="atasNama"
        value={data.atasNama}
        onChange={(e) => setData({ ...data, atasNama: e.target.value })}
        placeholder="Masukan Nama Anda"
        size="lg"
      />
      <div className="flex gap-5">
        <Input
          label="Jumlah Orang"
          labelPlacement="outside"
          name="jumlahOrang"
          value={data.jumlah}
          onChange={(e) => setData({ ...data, jumlah: e.target.value })}
          placeholder="Masukan Jumlah Orang"
          size="lg"
          type="number"
        />
        <Input
          label="Nomor HandPhone"
          labelPlacement="outside"
          name="nomorHp"
          value={data.noHp}
          onChange={(e) => setData({ ...data, noHp: e.target.value })}
          placeholder="Nomor Handphone"
          size="lg"
          />
      </div>
        <Select
          // className="max-w-xs"
          label="Nomor Meja"
          labelPlacement="outside"
          name="noMeja"
          // defaultSelectedKeys={[data.noMeja]}
          selectedKeys={data.noMeja}
          onChange={()=>handleSelectChange}
          placeholder="Nomor Meja"
          size="lg"
        >
          {meja.map((item:any) => (
            <SelectItem key={item.no_meja} textValue={item.no_meja}>{item.no_meja}</SelectItem>
          ))}
        </Select>
    </>
  );
}
