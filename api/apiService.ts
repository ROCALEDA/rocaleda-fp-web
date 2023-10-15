import API_URL from "./config";

const fetchData = async (endpoint: string) => {
  const response = await fetch(`${API_URL}/${endpoint}`);
  const data = await response.json();
  return { status: response.status, data };
};

export const getSomeData = async () => {
  return fetchData("users?page=2");
};

export const getOtherData = async () => {
  return fetchData("other-endpoint");
};
