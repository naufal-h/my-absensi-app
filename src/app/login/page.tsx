import { LoginForm } from "@/components/form/login-form";
import { getUserServer } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login | My Absensi App",
  description: "Login to My Absensi App to manage your attendance.",
};

export default async function LoginPage() {
  const user = await getUserServer();

  if (user?.role === "admin") redirect("/admin");
  if (user?.role === "employee") redirect("/employee");

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
