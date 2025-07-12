import { AbsensiTable } from "@/components/dashboard/absensi-table";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Riwayat Absensi - My Absensi App",
  description: "Dashboard page for My Absensi App",
};

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Card className="p-4">
        <h3 className="text-lg font-semibold">Riwayat Absensi</h3>
        <AbsensiTable />
      </Card>
    </div>
  );
}
