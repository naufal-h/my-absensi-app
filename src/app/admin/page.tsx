import { AbsensiTable } from "@/components/dashboard/absensi-table";

import { Card } from "@/components/ui/card";

import Image from "next/image";

export const metadata = {
  title: "Dashboard - My Absensi App",
  description: "Dashboard page for My Absensi App",
};

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Card className=" p-6">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 overflow-hidden rounded">
            <Image
              src="/pfp.jpg"
              alt="Avatar"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Corp. Information Technology
            </p>
            <h2 className="text-xl font-semibold">Nama</h2>
            <p className="text-sm text-gray-500">Software Engineer</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold">Absensi Terbaru</h3>
        <AbsensiTable />
      </Card>
    </div>
  );
}
