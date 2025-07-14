"use client";

import { Card } from "@/components/ui/card";
import { getUserClient } from "@/lib/auth-client";
import { cekAbsensi } from "@/lib/cek-absensi";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
    division: string;
    position: string;
    role: "admin" | "employee";
  } | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const user = await getUserClient();
        setUser(user);
        const sudah = await cekAbsensi(user!.id);
        setSubmitted(sudah);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Card className="p-6">
        <div className="flex gap-4 items-center">
          {loading ? (
            <>
              <Skeleton className="w-16 h-16 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </>
          ) : (
            <>
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
                <p className="text-sm text-gray-500">{user?.division}</p>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.position}</p>
              </div>
            </>
          )}
        </div>

        {!loading && (
          <p
            className={`mt-4 ${submitted ? "text-green-500" : "text-red-500"}`}
          >
            {submitted
              ? "Anda sudah melakukan absensi hari ini"
              : "Anda belum melakukan absensi hari ini"}
          </p>
        )}
      </Card>
    </div>
  );
}
