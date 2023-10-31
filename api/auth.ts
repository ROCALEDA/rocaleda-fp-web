import { fetchData } from "./apiService";

interface ApiResponse {
  status: number;
  data: any;
  error?: string;
}

export const login = async (email: string, password: string) => {
  return fetchData("auth", "POST", { email, password });
};

export const registerCompany = async (
  email: string,
  phone: string,
  password: string,
  name: string
): Promise<ApiResponse> => {
  return await fetchData("customer", "POST", { email, phone, password, name });
};

export const registerCandidate = async (
  email: string,
  phone: string,
  password: string,
  fullname: string,
  soft_skills: string[],
  tech_skills: string[]
): Promise<ApiResponse> => {
  return await fetchData("candidate", "POST", {
    email,
    phone,
    password,
    fullname,
    soft_skills,
    tech_skills,
  });
};