"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

import { postAbsensi } from "@/lib/absensi";
import { getUserClient } from "@/lib/auth-client";
import { cekAbsensi } from "@/lib/cek-absensi";
import { uploadFotoAbsen } from "@/lib/upload";

export function AbsensiForm() {
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const today = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Jakarta",
  });
  console.log("Today:", today);

  useEffect(() => {
    const fetch = async () => {
      try {
        const user = await getUserClient();
        const sudah = await cekAbsensi(user!.id);
        setSubmitted(sudah);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Gagal cek status absensi");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return alert("Silakan upload foto");

    setLoading(true);

    try {
      const user = await getUserClient();

      const photoUrl = await uploadFotoAbsen(file);

      await postAbsensi({
        user_id: user!.id,
        timestamp: new Date().toISOString(),
        photo: photoUrl,
      });

      setSubmitted(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message || "Gagal submit absensi");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center">Memuat form...</p>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center font-medium">⚠️ {error}</div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center space-y-4">
        <p className="text-xl font-semibold">✅ Kamu sudah absen hari ini</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-3">
        <Label htmlFor="date">Tanggal</Label>
        <Input id="date" type="date-time" value={today} disabled />
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

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Mengirim..." : "Submit Absen"}
      </Button>
    </form>
  );
}
