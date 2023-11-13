export interface Candidate {
    user_id: number;
    fullname: string;
    // ... cualquier otra propiedad de Candidate
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
