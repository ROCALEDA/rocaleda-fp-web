import { Card, CardContent, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PersonIcon from "@mui/icons-material/AccountCircleOutlined";

interface EmployeesProps {
  name: string;
  role: string;
  onEditClick: (data: { name: string; role: string }) => void;
  onDeleteClick: (employeeName: string) => void;
}

const EmployeeCard: React.FC<EmployeesProps> = ({
  name,
  role,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <Card elevation={1} style={{ marginBottom: "10px", marginTop: "20px" }}>
      <CardContent
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <PersonIcon color="secondary" style={{ marginRight: "10px" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h6" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {role}
            </Typography>
          </div>
        </div>

        <div>
          <IconButton
            aria-label="edit"
            onClick={() => onEditClick({ name, role })}
          >
            <EditIcon color="primary" />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => onDeleteClick(name)}>
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
