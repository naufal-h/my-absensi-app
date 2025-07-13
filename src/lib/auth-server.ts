import { cookies } from "next/headers";

export async function getUserServer(): Promise<{
  id: number;
  name: string;
  email: string;
  role: "admin" | "employee";
} | null> {
  try {
    const cookieStore = await cookies();
    const res = await fetch("http://localhost:3001/api/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}
