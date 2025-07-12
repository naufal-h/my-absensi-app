import { AbsensiForm } from "@/components/form/absensi-form";

export const metadata = {
  title: "Absensi | My Absensi App",
  description: "Form absensi karyawan WFH",
};

export default function AbsenPage() {
  return (
    <main className="flex justify-center p-6">
      <div className="w-full max-w-md">
        <AbsensiForm />
      </div>
    </main>
  );
}
