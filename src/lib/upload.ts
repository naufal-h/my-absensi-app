export async function uploadFotoAbsen(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("photo", file);

  const res = await fetch("http://localhost:3003/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload gagal");

  const json = await res.json();
  return json.url;
}
