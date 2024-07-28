"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import fetchApi from "@/utils/fetchApi";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const roles = [
    {
      label: "Karyawan",
      value: "karyawan",
    },
    {
      label: "Koki",
      value: "koki",
    },
    {
      label: "Pelayan",
      value: "pelayan",
    },
  ];

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      nama: formData.get("nama"),
      umur: formData.get("umur"),
      no_hp: formData.get("no_hp"),
      role: formData.get("role"),
    };

    const { data: dataUser } = await fetchApi("/auth/register", "POST", data);

    if (dataUser.status == 400) return toast.error("GAGAL REGISTER");

    return toast.success("BERHASIL REGISTER");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input required label="Email" name="email" type="email" />
        <Input required label="Password" name="password" type="password" />
        <Input required label="Nama Lengkap" name="nama" type="text" />
        <Input required label="Umur" name="umur" type="number" />
        <Input required label="Nomor Handphone" name="no_hp" type="number" />
        <Select className="max-w-xs" items={roles} label="Roles" name="role">
          {(role) => <SelectItem key={role.value}>{role.label}</SelectItem>}
        </Select>
        <Button color="primary" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}
