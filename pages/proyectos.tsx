// pages/protectedPage.js

import { GetServerSidePropsContext } from "next";
import withAuth from "@/utils/withAuth";

function ProjectsPage() {
  return <div>ProjectsPage</div>;
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default withAuth(ProjectsPage);
