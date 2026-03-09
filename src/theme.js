import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette: {

    mode: "dark",

    primary: {
      main: "#2563eb"
    },

    background: {
      default: "#1a1a1a",
      paper: "#212121"
    },

    text: {
      primary: "#ffffff",
      secondary: "#64748b"
    },

    divider: "#e5e7eb"

  },

  shape: {
    borderRadius: 12
  },

  typography: {
    fontFamily: "Inter, sans-serif",
    h1: { fontFamily: "Poppins, sans-serif", fontWeight: 100 },
    h2: { fontFamily: "Poppins, sans-serif", fontWeight: 100 },
    h3: { fontFamily: "Poppins, sans-serif", fontWeight: 100 }
  }

});

export default theme;