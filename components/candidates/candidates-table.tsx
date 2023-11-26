import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Chip, TablePagination } from "@mui/material";

import API_URL from "@/api/config";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import { useTranslations } from "next-intl";

type TCandidate = {
  fullname: string;
  soft_skills: { description: string; id: number; name: string }[];
  tech_skills: { description: string; id: number; name: string }[];
  user_id: string;
};

type TCandidatesTableProps = {
  selectCandidate: (candidate: TCandidate) => void;
};

export default function CandidatesTable({
  selectCandidate,
}: TCandidatesTableProps) {
  const searchParams = useSearchParams();

  const searchSoftSkills = searchParams.get("soft_skills");
  const searchTechSkills = searchParams.get("tech_skills");
  const lang = useTranslations("Candidates");

  const { data: session } = useSession();
  const [candidates, setCandidates] = useState<TCandidate[]>();
  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage + 1);
    fetchCandidates();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const fetchCandidates = async () => {
    const queryParams = new URLSearchParams();
    // Assuming soft_skills and tech_skills are variables containing values or null
    if (searchSoftSkills) {
      queryParams.append("soft_skills", searchSoftSkills);
    }
    if (searchTechSkills) {
      queryParams.append("tech_skills", searchTechSkills);
    }

    queryParams.append("page", currentPage.toString());
    queryParams.append("limit", rowsPerPage.toString());

    const url = `${API_URL}/candidate${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    fetch(`${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data: { data: TCandidate[]; total_pages: number }) => {
        setCandidates(data.data);
        setTotalPages(data.total_pages);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (session) {
      fetchCandidates();
    }
  }, [session, searchSoftSkills, searchTechSkills, rowsPerPage, currentPage]);

  if (isLoading) return <p>Cargando...</p>;
  if (!candidates) return <p>No hay candidatos para mostrar</p>;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">{lang("name")}</TableCell>
              <TableCell align="left">{lang("tech_skills")}</TableCell>
              <TableCell align="left">{lang("soft_skills")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow
                onClick={() => selectCandidate(candidate)} // Add onClick here
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                tabIndex={-1}
                key={candidate.user_id}
              >
                <TableCell align="left">{candidate.fullname}</TableCell>
                <TableCell component="th" scope="row">
                  {candidate.tech_skills.slice(0, 2).map((techSkill) => (
                    <Chip
                      key={techSkill.id}
                      label={techSkill.name}
                      sx={{ backgroundColor: "#FAE8FF" }}
                      size="small"
                    ></Chip>
                  ))}
                </TableCell>
                <TableCell component="th" scope="row">
                  {candidate.soft_skills.slice(0, 2).map((softSkill) => (
                    <Chip
                      key={softSkill.id}
                      label={softSkill.name}
                      sx={{ backgroundColor: "#FEF7E7" }}
                      size="small"
                    ></Chip>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={totalPages * rowsPerPage}
        rowsPerPage={rowsPerPage}
        page={currentPage - 1}
        labelRowsPerPage={lang("rows_page")}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
