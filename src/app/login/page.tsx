import { LoginForm } from "@/components/form/login-form";

export const metadata = {
  title: "Login | My Absensi App",
  description: "Login to My Absensi App to manage your attendance.",
};

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
