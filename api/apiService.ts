import { Session } from "next-auth";
import API_URL from "./config";

export const fetchData = async (
  endpoint: string,
  method: string = "GET",
  body?: any,
  session?: Session
) => {
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.user?.token}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}/${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    const errorMessage =
      data.detail?.[0].msg || data.detail || "Error occurred";
    throw new Error(errorMessage);
  }

  return { status: response.status, data };
};
