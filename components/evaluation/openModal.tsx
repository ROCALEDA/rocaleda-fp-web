import React from 'react';
import { Button } from '@mui/material';

interface OpenModalButtonProps {
    onOpen: () => void; 
    label: string;
  }

  const OpenModalButton: React.FC<OpenModalButtonProps> = ({ onOpen, label }) => {
  return (
    <Button 
      type="submit"
      variant="contained"
      onClick={onOpen}
    >
      {label}
    </Button>
  );
}

export default OpenModalButton;