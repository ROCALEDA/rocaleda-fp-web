import API_URL from "./config";

export const getCandidates = async ({ token }: { token: string }) => {
  return await fetch(`${API_URL}/candidate`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPositionCandidates = async ({
  token,
  positionId,
}: {
  token: string;
  positionId: string;
}) => {
  return await fetch(`${API_URL}/positions/${positionId}/candidates`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const assignCandidateToPosition = async ({
  token,
  candidateId,
  positionId,
}: {
  token: string;
  candidateId: string;
  positionId: number;
}) => {
  return await fetch(
    `${API_URL}/positions/${positionId}/candidates/${candidateId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    }
  );
};
