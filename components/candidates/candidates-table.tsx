import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Chip, TablePagination } from "@mui/material";

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

export default function CandidatesTable() {
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
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">{lang("tech_skills")}</TableCell>
              <TableCell align="left">{lang("soft_skills")}</TableCell>
              <TableCell align="left">{lang("languages")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow
                tabIndex={-1}
                key={candidate.user_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{candidate.user_id}</TableCell>
                <TableCell component="th" scope="row">
                  {candidate.tech_skills.map((techSkill) => (
                    <Chip
                      key={techSkill.id}
                      label={techSkill.name}
                      sx={{ backgroundColor: "#FAE8FF" }}
                    ></Chip>
                  ))}
                </TableCell>
                <TableCell component="th" scope="row">
                  {candidate.soft_skills.map((softSkill) => (
                    <Chip
                      key={softSkill.id}
                      label={softSkill.name}
                      sx={{ backgroundColor: "#FEF7E7" }}
                    ></Chip>
                  ))}
                </TableCell>
                <TableCell align="left">{lang("spanish")}</TableCell>
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
