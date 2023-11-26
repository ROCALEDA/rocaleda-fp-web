import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Slider,
  FormControl,
  InputLabel,
  Skeleton,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Image from "next/image";
import { philosopher } from "@/app/[locale]/theme/fonts";
import { useSession } from "next-auth/react";
import API_URL from "@/api/config";
import * as yup from "yup";
import { enqueueSnackbar } from "notistack";
import { useTranslations } from "next-intl";
import { TSimpleProject } from "@/types/types";

interface TechTestModalProps {
  open: boolean;
  onClose: () => void;
  project: TSimpleProject | null;
}

const TechTestModal: React.FC<TechTestModalProps> = ({
  open,
  onClose,
  project,
}) => {
  const { data: session } = useSession();
  const [selectedTest, setSelectedTest] = useState<string | "">("");
  const [selectedPosition, setSelectedPosition] = useState<number | "">("");
  const [selectedCandidate, setSelectedCandidate] = useState<number | "">("");
  const [candidates, setCandidates] = useState([]);
  const [score, setScore] = useState(30);
  const [observations, setObservations] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formErrors, setFormErrors] = useState({
    position: "",
    candidate: "",
    observations: "",
  });
  const lang = useTranslations("TechTest");

  const validationSchema = yup.object().shape({
    position: yup.string().nullable().required(lang("position_required")),
    candidate: yup.string().required(lang("candidate_required")).nullable(),
    observations: yup
      .string()
      .trim()
      .min(1, lang("observation_required"))
      .required(lang("observation_required")),
  });

  const handleTestChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedTest(event.target.value);
  };

  const handlePositionChange = (event: SelectChangeEvent<number>) => {
    const newPosition =
      event.target.value === "" ? null : Number(event.target.value);
    setSelectedPosition(+event.target.value);
    validateField("position", newPosition);
  };

  const validateField = (field: string, value: any) => {
    const fieldSchema = yup.reach(validationSchema, field) as yup.StringSchema;

    fieldSchema
      .validate(value)
      .then(() => {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "",
        }));
      })
      .catch((error: yup.ValidationError) => {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [field]: error.message,
        }));
      });
  };

  const handleCandidateChange = (event: SelectChangeEvent<number>) => {
    const newCandidate =
      event.target.value === "" ? null : Number(event.target.value);
    setSelectedCandidate(+event.target.value);
    validateField("candidate", newCandidate);
  };

  const handleClose = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    setSelectedTest("");
    setSelectedPosition("");
    setSelectedCandidate("");
    setScore(30);
    setObservations("");
    setFormErrors({
      position: "",
      candidate: "",
      observations: "",
    });
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      onClose();
    }
  };

  useEffect(() => {
    if (session) {
      const fetchCandidates = async () => {
        if (selectedPosition) {
          setIsLoading(true);
          try {
            const response = await fetch(
              `${API_URL}/positions/${selectedPosition}/candidates`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${session?.user?.token}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setCandidates(data);
          } catch (error) {
            console.error("Error al cargar los candidatos:", error);
          } finally {
            setIsLoading(false);
          }
        }
      };

      fetchCandidates();
    }
  }, [selectedPosition, session]);

  const sendTechnicalTest = async (technicalTestPayload: any) => {
    try {
      const response = await fetch(
        `${API_URL}/positions/${technicalTestPayload.position}/tests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify(technicalTestPayload),
        }
      );

      if (response.ok) {
        enqueueSnackbar("Prueba técnica guardada con éxito.", {
          variant: "success",
        });
      } else {
        enqueueSnackbar(
          `Error al enviar prueba técnica: ${response.statusText}`,
          { variant: "error" }
        );
      }
    } catch (error) {
      enqueueSnackbar("Error al enviar prueba técnica.", { variant: "error" });
      console.error("Error al enviar la prueba técnica:", error);
    }
  };

  const handleReset = () => {
    setSelectedTest("");
    setSelectedPosition("");
    setSelectedCandidate("");
    setScore(30);
    setObservations("");
    setFormErrors({
      position: "",
      candidate: "",
      observations: "",
    });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const technicalTestPayload = {
      position: selectedPosition,
      candidate_id: selectedCandidate,
      name: selectedTest,
      score: score,
      observations: observations,
    };

    try {
      await validationSchema.validate(technicalTestPayload, {
        abortEarly: false,
      });
      await sendTechnicalTest(technicalTestPayload);
      handleReset();
      onClose();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors = err.inner.reduce(
          (acc, currentError) => {
            const errorPath = currentError.path || "unknown";
            if (
              errorPath === "position" ||
              errorPath === "candidate" ||
              errorPath === "observations"
            ) {
              acc[errorPath] = currentError.message;
            }
            return acc;
          },
          {
            position: "",
            candidate: "",
            observations: "",
          }
        );
        setFormErrors(newErrors);
      }
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: "50px",
    borderRadius: 2,
    width: 600,
    maxWidth: "calc(100% - 40px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  };
  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 100,
      label: "100",
    },
  ];
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="tech-test-modal-title"
      aria-describedby="tech-test-modal-description"
    >
      <Box sx={style}>
        {/* Título */}
        <Box sx={{ position: "relative", width: "100%", height: "80px" }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ width: "100%", textAlign: "center" }}
            fontFamily={philosopher.style.fontFamily}
          >
            {lang("title")}
          </Typography>
        </Box>
        {/* Contenedor principal */}
        <Box sx={{ display: "flex", width: "100%" }}>
          {/* Contenedor para los Selects */}
          <Box sx={{ flexGrow: 1, mr: 2 }}>
            <FormControl
              variant="standard"
              sx={{ m: 1, width: "90%" }}
              size="small"
            >
              <TextField
                label={lang("name")}
                variant="standard"
                value={selectedTest}
                onChange={handleTestChange}
                id="name-test"
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ m: 1, width: "90%" }}
              size="small"
            >
              <InputLabel id="position">{lang("position")}</InputLabel>
              <Select
                labelId="position"
                id="position-select"
                value={selectedPosition}
                onChange={handlePositionChange}
              >
                {project &&
                  project.positions.map((position) => (
                    <MenuItem key={position.id} value={position.id}>
                      {position.name}
                    </MenuItem>
                  ))}
              </Select>
              <Typography color="error">{formErrors.position}</Typography>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ m: 1, width: "90%" }}
              size="small"
            >
              <InputLabel id="name_candidate">{lang("role")}</InputLabel>
              {isLoading ? (
                <Skeleton variant="rectangular" height={40} />
              ) : (
                <Select
                  labelId="name_candidate"
                  id="candidate-select"
                  value={selectedCandidate}
                  onChange={handleCandidateChange}
                >
                  {candidates.map((candidate: any) => (
                    <MenuItem key={candidate.user_id} value={candidate.user_id}>
                      {candidate.fullname}
                    </MenuItem>
                  ))}
                </Select>
              )}
              <Typography color="error">{formErrors.candidate}</Typography>
            </FormControl>
          </Box>

          {/* Contenedor para la imagen */}
          <Box>
            <Image
              src="/images/figures.png"
              alt="Figure"
              width={180}
              height={180}
            />
          </Box>
        </Box>
        <FormControl fullWidth sx={{ m: 1, mt: 4 }}>
          <TextField
            id="standard-basic"
            label={lang("description")}
            variant="standard"
            multiline
            maxRows={4}
            value={observations}
            onChange={(e) => {
              setObservations(e.target.value);
              validateField("observations", e.target.value);
            }}
            error={!!formErrors.observations}
            helperText={formErrors.observations}
          />
        </FormControl>
        <Slider
          defaultValue={30}
          aria-label="Default"
          valueLabelDisplay="auto"
          value={score}
          onChange={(e, value) => setScore(value as number)}
          step={1}
          sx={{ mb: 2, mt: 4 }}
          marks={marks}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mt: 8,
            mb: 4,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ flexGrow: 1, mr: 1 }}
          >
            {lang("cancel")}
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              flexGrow: 1,
              ml: 1,
              backgroundColor: "#A15CAC",
              "&:hover": { backgroundColor: "#864D8F" },
            }}
          >
            {lang("save")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TechTestModal;
