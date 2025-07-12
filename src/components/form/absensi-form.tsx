"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function AbsensiForm() {
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return alert("Silakan upload foto");

    console.log("Absen submitted:", { date: today, file });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center space-y-4">
        <p className="text-xl font-semibold">✅ Kamu sudah absen hari ini</p>
        <Button onClick={() => setSubmitted(false)}>
          Absen Ulang (Simulasi)
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-3">
        <Label htmlFor="date">Tanggal</Label>
        <Input id="date" type="date" value={today} disabled />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="photo">Upload Foto Bukti</Label>
        <Input
          id="photo"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>

      <Button type="submit" className="w-full hover:cursor-pointer">
        Submit Absen
      </Button>
    </form>
  );
}
