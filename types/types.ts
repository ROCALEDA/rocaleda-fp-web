export interface Candidate {
  user_id: number;
  fullname: string;
}

export interface Position {
  id: number;
  is_open: boolean;
  name: string;
  candidates: Candidate[];
}

export type TSimpleProject = {
  id: number;
  name: string;
  is_team_complete: boolean;
  total_positions: number;
  positions: {
    id: number;
    is_open: boolean;
    name: string;
  }[];
};

export interface PositionComplete {
  position_id: number;
  position_name: string;
  candidate_id: number;
  candidate_name: string;
}

export interface FormErrors {
  project_id: string;
  name: string;
  candidate_id: string;
  score: string;
  observations: string;
}

export type TTechnicalTestPayload = {
  candidate_id: number;
  name: string;
  score: number;
  observations: string;
};
