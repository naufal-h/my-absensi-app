import { Card } from "@/components/ui/card";
import { getUserServer } from "@/lib/auth-server";

import Image from "next/image";

export const metadata = {
  title: "Dashboard - My Absensi App",
  description: "Dashboard page for My Absensi App",
};

export default async function Page() {
  const user = await getUserServer();
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
            <p className="text-sm text-gray-500">Welcome!</p>
            <h2 className="text-xl font-semibold">{user!.email}</h2>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
