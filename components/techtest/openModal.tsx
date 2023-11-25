import React from 'react';
import { Button } from '@mui/material';
import { Project} from "@/types/types";
import { useTranslations } from "next-intl";

interface OpenModalButtonProps {
    onOpen: () => void; 
    project: Project | null;
  }

  const OpenModalButton: React.FC<OpenModalButtonProps> = ({ onOpen , project }) => {
    const lang = useTranslations("TechTest");
  return (
    <Button 
      type="submit"
      variant="contained"
      onClick={onOpen}
      sx={{ backgroundColor: "#A15CAC", "&:hover": { backgroundColor: "#864D8F" } }}
    >
      {lang("title")}
    </Button>
  );
}

export default OpenModalButton;