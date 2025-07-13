export async function getUserClient(): Promise<{
  id: number;
  name: string;
  email: string;
  role: "admin" | "employee";
} | null> {
  try {
    const res = await fetch("http://localhost:3001/api/me", {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
