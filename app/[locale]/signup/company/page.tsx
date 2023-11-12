import AuthLayout from "@/components/layout/auth-layout";
import Register from "@/components/signup/signup-company";

export default function LoginPage() {
  return (
    <AuthLayout text="Empresas" textColor="#FF0099">
      <Register />
    </AuthLayout>
  );
}
