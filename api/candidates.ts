import { Session } from "next-auth";
import { fetchData } from "./apiService";

export const getCandidates = async (
  tech_skills: string,
  soft_skills: string,
  session: Session
) => {
  return fetchData(
    "candidate" +
      new URLSearchParams({
        tech_skills,
        soft_skills,
      }),
    "GET",
    null,
    session
  );
};
