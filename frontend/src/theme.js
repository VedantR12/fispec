import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4ade80",
      dark: "#22c55e",
      contrastText: "#0a0c0b"
    },
    secondary: {
      main: "#fbbf24"
    },
    background: {
      default: "#0a0c0b",
      paper: "#1c2119"
    },
    text: {
      primary: "#f0f4ee",
      secondary: "#7d9070"
    },
    divider: "rgba(255,255,255,0.08)",
    error: { main: "#f87171" },
    warning: { main: "#fbbf24" },
    success: { main: "#4ade80" }
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    h1: { fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 },
    h2: { fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 },
    h3: { fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 },
    h4: { fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 },
    h5: { fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 },
    h6: { fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 },
    button: { textTransform: "none", fontWeight: 500 }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
          fontWeight: 500,
          fontFamily: "'DM Sans', system-ui, sans-serif"
        },
        containedPrimary: {
          background: "#4ade80",
          color: "#0a0c0b",
          "&:hover": {
            background: "#22c55e",
            boxShadow: "0 0 20px rgba(74,222,128,0.3)"
          }
        },
        outlinedPrimary: {
          borderColor: "rgba(74,222,128,0.4)",
          color: "#4ade80",
          "&:hover": {
            borderColor: "#4ade80",
            background: "rgba(74,222,128,0.06)"
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#1c2119",
          border: "1px solid rgba(255,255,255,0.08)"
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none"
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#7d9070",
          "&:hover": {
            color: "#f0f4ee",
            background: "rgba(255,255,255,0.06)"
          }
        }
      }
    }
  }
});

export default theme;
