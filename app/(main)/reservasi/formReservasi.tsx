import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
export default function FormReservasi({ initialData }: { initialData?: any }) {
  let { atasNama, jumlah, noHp, noMeja} = initialData || {};
  const [data, setData] = useState({
    atasNama: atasNama || "",
    jumlah: jumlah || "",
    noHp: noHp || "",
    noMeja: noMeja || "",
  });
  const satuanList = [
    {
      key: 1,
      label: "Meja 1",
    },
    {
      key: 2,
      label: "Meja 2",
    },
    {
      key: 3,
      label: "Meja 3",
    },
    {
      key: 4,
      label: "Meja 4",
    },
    {
      key: 5,
      label: "Meja 5",
    },
    {
      key: 6,
      label: "Meja 6",
    },
  ];

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
          defaultSelectedKeys={[`${data.noMeja}`]}
          onChange={(e) => setData({ ...data, noMeja: e.target.value })}
          placeholder="Nomor Meja"
          size="lg"
        >
          {satuanList.map((satuan) => (
            <SelectItem key={satuan.key}>{satuan.label}</SelectItem>
          ))}
        </Select>
    </>
  );
}
