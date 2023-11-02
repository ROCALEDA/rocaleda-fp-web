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

  const { data: session } = useSession();
  const [candidates, setCandidates] = useState<TCandidate[]>();
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (session) {
      const queryParams = new URLSearchParams();
      // Assuming soft_skills and tech_skills are variables containing values or null
      if (searchSoftSkills) {
        queryParams.append("soft_skills", searchSoftSkills);
      }
      if (searchTechSkills) {
        queryParams.append("tech_skills", searchTechSkills);
      }

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
        .then((data: { data: TCandidate[] }) => {
          setCandidates(data.data);
          setLoading(false);
        });
    }
  }, [session, searchSoftSkills, searchTechSkills]);

  if (isLoading) return <p>Loading...</p>;
  if (!candidates) return <p>No profile data</p>;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Habilidades tecnicas</TableCell>
              <TableCell align="left">Habilidades blandas</TableCell>
              <TableCell align="left">Idiomas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((candidate) => (
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
                  <TableCell align="left">Español</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={candidates.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
