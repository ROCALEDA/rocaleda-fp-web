export type TInterview = {
  subject: string;
  client_name: string;
  realization_date: string;
  score: number | null;
};

export type TInterviewPayload = {
  customer_id: number;
  candidate_id: number;
  subject: string;
  realization_date: string;
  open_position_id: number;
  score: null;
};
