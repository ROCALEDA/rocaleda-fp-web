import React from 'react';
import { Button } from '@mui/material';

interface OpenModalButtonProps {
    onOpen: () => void; 
  }

  const OpenModalButton: React.FC<OpenModalButtonProps> = ({ onOpen }) => {
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