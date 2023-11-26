import { createTheme } from "@mui/material/styles";
import { outfit, philosopher } from "./fonts";

const theme = createTheme({
  typography: {
    fontFamily: [outfit.style.fontFamily, philosopher.style.fontFamily].join(
      ","
    ),
  },
  palette: {
    primary: {
      main: "#8e13c0",
      light: "#fae8ff",
      dark: "#3b0764",
    },
    secondary: {
      main: "#2D3748",
      light: "#EDF2F7",
      dark: "#171923",
    },
    success: {
      main: "#B1E5D9",
    },
    info: {
      main: "#84A1ED",
    },
    warning: {
      main: "#F3DA90",
    },
    error: {
      main: "#ED8B84",
    },
    background: {
      default: "#fff",
    },
  },
});

export { theme };
