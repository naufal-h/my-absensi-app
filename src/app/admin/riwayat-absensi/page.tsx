import { AbsensiTable } from "@/components/dashboard/absensi-table";

export const metadata = {
  title: "Riwayat Absensi - My Absensi App",
  description: "Dashboard page for My Absensi App",
};

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6 pt-0">
      <h1 className="text-2xl font-bold">Riwayat Absensi</h1>
      <AbsensiTable />
    </div>
  );
}
