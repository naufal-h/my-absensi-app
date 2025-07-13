import { apiFetch } from "./api-karyawan";

export interface Karyawan {
  id: number;
  name: string;
  email: string;
  position: string;
  division: string;
}

export async function getAllKaryawan(): Promise<Karyawan[]> {
  return apiFetch("/karyawan");
}

export async function createKaryawan(input: {
  email: string;
  name: string;
  division?: string;
  position?: string;
}) {
  return apiFetch("/karyawan", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateKaryawan(input: {
  email: string;
  name: string;
  division?: string;
  position?: string;
}) {
  return apiFetch("/karyawan", {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteKaryawan(user_id: number) {
  return apiFetch(`/karyawan/${user_id}`, {
    method: "DELETE",
  });
}
