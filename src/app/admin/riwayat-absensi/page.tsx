import { AbsensiTable } from "@/components/dashboard/absensi-table";
import { getUserServer } from "@/lib/auth-server";

export const metadata = {
  title: "Riwayat Absensi - My Absensi App",
  description: "Dashboard page for My Absensi App",
};

export default async function Page() {
  const user = await getUserServer();

  return (
    <div className="flex flex-1 flex-col gap-4 p-6 pt-0">
      <h1 className="text-2xl font-bold">Riwayat Absensi</h1>
      <AbsensiTable
        variant={user?.role === "employee" ? "employee" : "admin"}
        userId={user?.id}
      />
    </div>
  );
}
