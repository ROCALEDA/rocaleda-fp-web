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
  
  export interface Project {
    id: number;
    name: string;
    is_team_complete: boolean;
    total_positions: number;
    positions: {
        id: number;
        is_open: boolean;
        name: string;
      }[];
  }


  export interface PositionComplete {
    position_id: number;
    position_name: string;
    candidate_id: number;
    candidate_name: string;
}