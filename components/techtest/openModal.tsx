import React from 'react';
import { Button } from '@mui/material';
import { Project} from "@/types/types";

interface OpenModalButtonProps {
    onOpen: () => void; 
    project: Project | null;
  }

  const OpenModalButton: React.FC<OpenModalButtonProps> = ({ onOpen , project }) => {
  return (
    <Button 
      type="submit"
      variant="contained"
      onClick={onOpen}
      sx={{ backgroundColor: "#A15CAC", "&:hover": { backgroundColor: "#864D8F" } }}
    >
      REGISTRAR PRUEBA TÉCNICA
    </Button>
  );
}

export default OpenModalButton;