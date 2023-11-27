import React, { useState } from "react";
import {
  Box,
  Stack,
  Modal,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useTranslations } from "next-intl";

import { TCandidate } from "@/types/users";
import { useSession } from "next-auth/react";
import { TSimpleProject } from "@/types/types";
import { philosopher } from "@/app/[locale]/theme/fonts";
import { assignCandidateToPosition } from "@/api/candidates";

type AsignCandidateProps = {
  projects: TSimpleProject[];
  candidate: TCandidate;
};

const AssignCandidateModal = ({ projects, candidate }: AsignCandidateProps) => {
  const lang = useTranslations("Candidates");
  const { data: session } = useSession();

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<
    TSimpleProject | undefined
  >(undefined);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedPositionId, setSelectedPositionId] = useState("");

  const [formData, setFormData] = useState({
    projectId: "",
    positionId: "",
  });

  const handleProjectChange = (event: SelectChangeEvent) => {
    setSelectedProjectId(event.target.value);
    const foundProject = projects.find(
      (project) => Number(project.id) === Number(event.target.value)
    );

    setSelectedProject(foundProject);
    setFormData({ ...formData, projectId: event.target.value });
  };

  const handlePositionChange = (event: SelectChangeEvent) => {
    setSelectedPositionId(event.target.value);
    setFormData({ ...formData, positionId: event.target.value });
  };

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (session) {
      const response = await assignCandidateToPosition({
        token: session.user.token,
        positionId: Number(formData.positionId),
        candidateId: candidate.user_id,
      });
      if (response.ok && response.status === 200) {
        enqueueSnackbar(
          `${candidate.fullname} asignado a ${selectedProject?.name}`,
          {
            variant: "success",
          }
        );
      }
    }
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        {lang("assignPosition")}
      </Button>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            fontFamily={philosopher.style.fontFamily}
          >
            {lang("form.assign_candidate")}
          </Typography>
          <Stack spacing={2} mt={2}>
            <FormControl fullWidth>
              <InputLabel id="project-selector-label">
                {lang("form.project")}
              </InputLabel>
              <Select
                required
                labelId="project-selector-label"
                id="project-selector"
                value={selectedProjectId}
                label={lang("form.project")}
                onChange={handleProjectChange}
              >
                {projects?.map((project: TSimpleProject) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedProject && (
              <>
                <FormControl fullWidth>
                  <InputLabel id="position-selector-label">
                    {lang("form.position")}
                  </InputLabel>
                  <Select
                    required
                    labelId="position-selector-label"
                    id="position-selector"
                    value={selectedPositionId}
                    label={lang("form.position")}
                    onChange={handlePositionChange}
                  >
                    {selectedProject.positions
                      ?.filter((position) => position.is_open)
                      .map((position) => (
                        <MenuItem key={position.id} value={position.id}>
                          {position.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <Stack direction="row" justifyContent="space-between">
                  <Button variant="outlined" onClick={() => handleClose()}>
                    {lang("form.cancel")}
                  </Button>
                  <Button type="submit" variant="contained" data-cy="preasignar-candidato">
                    {lang("form.assign")}
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default AssignCandidateModal;
