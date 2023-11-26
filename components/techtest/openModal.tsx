import React from "react";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { TSimpleProject } from "@/types/types";

interface OpenModalButtonProps {
  onOpen: () => void;
  project: TSimpleProject | null;
}

const OpenModalButton: React.FC<OpenModalButtonProps> = ({
  onOpen,
  project,
}) => {
  const lang = useTranslations("TechTest");
  return (
    <Button
      data-cy="modal_techtest"
      type="submit"
      variant="contained"
      onClick={onOpen}
      sx={{
        backgroundColor: "#A15CAC",
        "&:hover": { backgroundColor: "#864D8F" },
      }}
    >
      {lang("title")}
    </Button>
  );
};

export default OpenModalButton;
