import { apiFetch } from "./api-absensi";

export type Absensi = {
  name: string;
  email: string;
  timestamp: string;
  photo: string;
};

export async function getAbsensiSaya(user_id: number): Promise<Absensi[]> {
  return apiFetch(`/absensi/me?user_id=${user_id}`);
}

export async function getAbsensiAdmin(): Promise<Absensi[]> {
  return apiFetch("/absensi/all");
}

export async function postAbsensi({
  user_id,
  timestamp,
  photo,
}: {
  user_id: number;
  timestamp: string;
  photo?: string;
}) {
  return apiFetch("/absensi", {
    method: "POST",
    body: JSON.stringify({ user_id, timestamp, photo }),
  });
}
