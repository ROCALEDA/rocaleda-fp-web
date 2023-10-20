import Register from "@/components/candidate-register/register";
import AuthLayout from "@/components/layout/auth-layout";

export default function RegisterPage() {
    return (
      <AuthLayout text="Candidatos" textColor='#009EF8'>
        <Register />
      </AuthLayout>
    );
  }