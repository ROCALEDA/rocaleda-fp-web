// hoc/withAuth.tsx
import { useRouter } from "next/router";
import { useEffect } from "react";
import { NextPage } from "next";

const withAuth = (WrappedComponent: NextPage) => {
  const AuthComponent: NextPage = (props) => {
    const Router = useRouter();

    // Check if token is present in cookies/localStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
      if (!token) {
        Router.replace("/login"); // Redirect to login page if no token found
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
