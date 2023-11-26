"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Stack,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { philosopher } from "@/app/[locale]/theme/fonts";
import { useSession } from "next-auth/react";
import { TCandidate } from "@/types/users";
import { getPositions } from "@/api/positions";
import { getPositionCandidates } from "@/api/candidates";
import { TPosition } from "@/types/position";
import { scheduleInterview } from "@/api/interviews";
import { enqueueSnackbar } from "notistack";

type ScheduleInterviewProps = {
  triggerInterviews: () => void;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ScheduleInterview({
  triggerInterviews,
}: ScheduleInterviewProps) {
  const lang = useTranslations("Interviews");

  const [open, setOpen] = useState(false);
  const [candidates, setCandidates] = useState<TCandidate[] | null>(null);
  const [positions, setPositions] = useState<TPosition[]>([]);

  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [selectedPositionId, setSelectedPositionId] = useState("");

  const handleCandidateChange = (event: SelectChangeEvent) => {
    setSelectedCandidateId(event.target.value);
    setFormData({ ...formData, candidate_id: event.target.value });
  };

  const handlePositionChange = (event: SelectChangeEvent) => {
    setSelectedPositionId(event.target.value);
    setFormData({ ...formData, open_position_id: event.target.value });
  };

  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    interviewer_id: "",
    candidate_id: "",
    subject: "",
    scheduled_date: "",
    open_position_id: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (session) {
      const response = await scheduleInterview({
        token: session.user.token,
        interview: {
          customer_id: Number(session.user.user_id),
          candidate_id: Number(formData.candidate_id),
          subject: formData.subject,
          realization_date: formData.scheduled_date,
          open_position_id: Number(formData.open_position_id),
          score: null,
        },
      });
      if (response.ok && response.status === 200) {
        enqueueSnackbar("Entrevista agendada", { variant: "success" });
        triggerInterviews();
      }
    }

    handleClose();
  };

  const getCandidates = async () => {
    if (session && selectedPositionId) {
      const candidatesResponse = await getPositionCandidates({
        token: session.user?.token,
        positionId: selectedPositionId,
      });
      const candidatesData = await candidatesResponse.json();
      setCandidates(candidatesData);
    }
  };

  const getInterviewPositions = async () => {
    if (session) {
      const positionsResponse = await getPositions({
        token: session.user?.token,
      });
      const positionsData = await positionsResponse.json();
      setPositions(positionsData);
    }
  };

  useEffect(() => {
    if (selectedPositionId) {
      getCandidates();
    }
  }, [selectedPositionId]);

  useEffect(() => {
    if (session) {
      getInterviewPositions();
    }
  }, [session]);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        {lang("schedule")}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            fontFamily={philosopher.style.fontFamily}
          >
            {lang("schedule_interview")}
          </Typography>

          <Stack spacing={2} mt={2}>
            <TextField
              required
              label={lang("form.name")}
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="candidate-selector-label">Posición</InputLabel>
              <Select
                required
                labelId="candidate-selector-label"
                id="candidate-selector"
                value={selectedPositionId}
                label={lang("form.position")}
                onChange={handlePositionChange}
              >
                {positions?.map((position) => (
                  <MenuItem
                    key={position.open_position.id}
                    value={position.open_position.id}
                  >
                    {position.open_position.position_name} -{" "}
                    {position.project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {candidates && candidates.length == 0 && (
              <Box>No hay candidatos en esta posición</Box>
            )}
            {candidates && candidates.length > 0 && (
              <>
                <FormControl fullWidth>
                  <InputLabel id="candidate-selector-label">
                    Candidate
                  </InputLabel>
                  <Select
                    required
                    labelId="candidate-selector-label"
                    id="candidate-selector"
                    value={selectedCandidateId}
                    label={lang("form.candidate")}
                    onChange={handleCandidateChange}
                  >
                    {candidates?.map((candidate) => (
                      <MenuItem
                        key={candidate.user_id}
                        value={candidate.user_id}
                      >
                        {candidate.fullname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  required
                  label={lang("form.date")}
                  name="scheduled_date"
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  value={formData.scheduled_date}
                  onChange={handleChange}
                />
                <Stack direction="row" justifyContent="space-between">
                  <Button variant="outlined" onClick={() => handleClose()}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained">
                    {lang("form.schedule")}
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
