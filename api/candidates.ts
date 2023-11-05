import { Session } from "next-auth";
import { fetchData } from "./apiService";

export const getCandidates = async (
  tech_skills: string,
  soft_skills: string,
  session: Session | null
) => {
  return fetchData("candidate", "GET", null, session);
};
