import API_URL from "./config";

export const getProjects = async ({ token }: { token: string }) => {
  return await fetch(`${API_URL}/customer/projects`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
