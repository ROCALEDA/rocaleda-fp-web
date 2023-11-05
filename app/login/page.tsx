import AuthLayout from "@/components/layout/auth-layout";
import Login from "@/components/login/login";
import { GetServerSidePropsContext } from "next";

export default function LoginPage() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}
