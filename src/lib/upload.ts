export async function uploadFotoAbsen(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("photo", file);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_ABSENSI}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Upload gagal");

  const json = await res.json();
  return json.url;
}
