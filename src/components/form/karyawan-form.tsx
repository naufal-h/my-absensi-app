"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface KaryawanFormProps {
  onSuccess?: () => void;
  mode?: "create" | "edit";
  defaultValues?: {
    nama: string;
    email: string;
    jabatan?: string;
    departemen?: string;
  };
}

export function KaryawanForm({
  onSuccess,
  mode = "create",
  defaultValues,
}: KaryawanFormProps) {
  const [nama, setNama] = useState(defaultValues?.nama || "");
  const [email, setEmail] = useState(defaultValues?.email || "");
  const [jabatan, setJabatan] = useState(defaultValues?.jabatan || "");
  const [departemen, setDepartemen] = useState(defaultValues?.departemen || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "create") {
      console.log("CREATE:", { nama, email, jabatan, departemen });
    } else {
      console.log("UPDATE:", { nama, email, jabatan, departemen });
    }

    setTimeout(() => {
      alert(
        `${mode === "create" ? "Karyawan ditambahkan" : "Data diupdate"} ✅`
      );
      onSuccess?.();
    }, 300);
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
