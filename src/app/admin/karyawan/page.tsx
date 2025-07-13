"use client";

import { KaryawanTable } from "@/components/dashboard/karyawan-table";
import { KaryawanFormModal } from "@/components/form/karyawan-form-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AdminKaryawanPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Data Karyawan</h1>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Tambah
        </Button>
      </div>

      <KaryawanTable />

      <KaryawanFormModal open={open} onOpenChange={setOpen} mode="create" />
    </div>
  );
}
