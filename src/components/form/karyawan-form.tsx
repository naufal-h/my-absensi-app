"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createKaryawan, updateKaryawan } from "@/lib/karyawan";
import { useState } from "react";

interface KaryawanFormProps {
  onSuccess?: () => void;
  mode?: "create" | "edit";
  defaultValues?: {
    name: string;
    email: string;
    position?: string;
    division?: string;
  };
}

export function KaryawanForm({
  onSuccess,
  mode = "create",
  defaultValues,
}: KaryawanFormProps) {
  const [nama, setNama] = useState(defaultValues?.name || "");
  const [email, setEmail] = useState(defaultValues?.email || "");
  const [jabatan, setJabatan] = useState(defaultValues?.position || "");
  const [departemen, setDepartemen] = useState(defaultValues?.division || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === "create") {
        await createKaryawan({
          email,
          name: nama,
          division: departemen,
          position: jabatan,
        });
        alert("Karyawan berhasil ditambahkan ✅");
      } else {
        await updateKaryawan({
          email,
          name: nama,
          division: departemen,
          position: jabatan,
        });
        alert("Data karyawan berhasil diupdate ✅");
      }

      onSuccess?.();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-3">
        <Label>Nama</Label>
        <Input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-3">
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-3">
        <Label>Jabatan</Label>
        <Input value={jabatan} onChange={(e) => setJabatan(e.target.value)} />
      </div>
      <div className="grid gap-3">
        <Label>Departemen</Label>
        <Input
          value={departemen}
          onChange={(e) => setDepartemen(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full">
        {mode === "create" ? "Simpan" : "Update"}
      </Button>
    </form>
  );
}
