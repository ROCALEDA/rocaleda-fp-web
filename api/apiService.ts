import API_URL from "./config";

const fetchData = async (
  endpoint: string,
  method: string = "GET",
  body?: any
) => {
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}/${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    console.log("data", data);
    const errorMessage = data.detail?.[0].msg || data.detail || "Error occurred";
    throw new Error(errorMessage);
  }

  return { status: response.status, data };
};

export const getSomeData = async () => {
  return fetchData("users?page=2");
};

export const getOtherData = async () => {
  return fetchData("other-endpoint");
};

export const login = async (email: string, password: string) => {
  return fetchData("auth", "POST", { email, password });
};

interface ApiResponse {
  status: number;
  data: any; 
  error?: string; 
}

export const registerCompany = async (email: string, phone: string, password: string, name: string): Promise<ApiResponse> => {
  try {
    return await fetchData("customer", "POST", { email, phone, password, name });
  } catch (error) {
    return { status: 500, data: null, error: (error as Error).message }; 
  }
};


export const registerCandidate = async (email: string, phone: string, password: string, fullname: string, soft_skills: string[], tech_skills: string[]): Promise<ApiResponse> => {

  try {
    return await fetchData("candidate", "POST", {
      email,
      phone,
      password,
      fullname,
      soft_skills,
      tech_skills
    });
  } catch (error) {
    return { status: 500, data: null, error: (error as Error).message };
  }
};
