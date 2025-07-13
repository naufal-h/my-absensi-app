import { apiFetch } from "./api-absensi";

interface AbsensiResponse {
  alreadyAttended: boolean;
}

export async function cekAbsensi(user_id: number) {
  const res = (await apiFetch(
    `/absensi/me-today?user_id=${user_id}`
  )) as AbsensiResponse;
  return res.alreadyAttended as boolean;
}
