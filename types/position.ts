export type TPosition = {
  open_position: {
    candidate_id: number | null;
    id: number;
    is_open: boolean;
    position_name: string;
    project_id: number;
  };
  project: {
    customer_id: number;
    description: string;
    id: number;
    is_team_complete: boolean;
    name: string;
  };
  soft_skill_ids: number[];
  technology_ids: number[];
};
