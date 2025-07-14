import { cookies } from "next/headers";

export async function getUserServer(): Promise<{
  id: number;
  name: string;
  email: string;
  position: string;
  division: string;
  role: "admin" | "employee";
} | null> {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL_AUTH}/me`, {
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
