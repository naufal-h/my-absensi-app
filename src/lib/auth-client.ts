export async function getUserClient(): Promise<{
  id: number;
  name: string;
  email: string;
  position: string;
  division: string;
  role: "admin" | "employee";
} | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL_AUTH}/me`, {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
