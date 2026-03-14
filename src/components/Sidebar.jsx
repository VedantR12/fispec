import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";
import GroupsIcon from "@mui/icons-material/Groups";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, IconButton } from "@mui/material";

function Sidebar({ close }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const name    = user?.displayName || user?.email?.split("@")[0] || "User";
  const initial = name.charAt(0).toUpperCase();

  const navLinks = [
    { icon: <HistoryIcon sx={{ fontSize: 18 }} />, label: "History",  action: () => { navigate("/history"); close(); } },
    { icon: <GroupsIcon  sx={{ fontSize: 18 }} />, label: "Team",     action: () => { document.getElementById("team")?.scrollIntoView({ behavior: "smooth" }); close(); } },
    { icon: <InfoOutlinedIcon sx={{ fontSize: 18 }} />, label: "About", action: () => { document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); close(); } },
    { icon: <MailOutlineIcon  sx={{ fontSize: 18 }} />, label: "Contact", action: () => { document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); close(); } }
  ];

  return (
    <>
      {/* BACKDROP */}
      <Box
        onClick={close}
        sx={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 1200,
          animation: "fadeIn 0.2s ease"
        }}
      />

      {/* PANEL */}
      <Box
        sx={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "280px",
          height: "100vh",
          background: "var(--bg-card)",
          borderRight: "1px solid var(--border-default)",
          display: "flex",
          flexDirection: "column",
          zIndex: 1300,
          animation: "slideInLeft 0.28s var(--ease-out)"
        }}
      >

        {/* ── HEADER ── */}
        <Box
          sx={{
            px: 3,
            pt: 3,
            pb: 2.5,
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* Logomark */}
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "8px",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M2 10V4.5L6 2L10 4.5V10" stroke="#0a0c0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.5 10V7H7.5V10" stroke="#0a0c0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Box>
            <Typography
              sx={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.1em",
                color: "var(--text-secondary)"
              }}
            >
              FISPEC
            </Typography>
          </Box>

          <IconButton size="small" onClick={close} sx={{ color: "var(--text-tertiary)", mt: -0.5 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* ── USER INFO ── */}
        <Box
          sx={{
            px: 3,
            py: 3,
            borderBottom: "1px solid var(--border-subtle)"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "var(--accent-dim)",
                border: "1px solid rgba(74,222,128,0.2)",
                color: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                flexShrink: 0
              }}
            >
              {initial}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: "var(--text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {name}
              </Typography>
              {user?.email && (
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "var(--text-tertiary)",
                    mt: 0.25,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {user.email}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        {/* ── NAV LINKS ── */}
        <Box sx={{ flex: 1, px: 1.5, py: 2, overflowY: "auto" }}>
          {navLinks.map((link, i) => (
            <Box
              key={i}
              onClick={link.action}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: 1.5,
                py: 1.25,
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
                color: "var(--text-secondary)",
                transition: "all 0.15s ease",
                mb: 0.25,
                "&:hover": {
                  background: "var(--bg-hover)",
                  color: "var(--text-primary)"
                }
              }}
            >
              {link.icon}
              <Typography sx={{ fontSize: "0.9rem", fontWeight: 400, fontFamily: "var(--font-body)" }}>
                {link.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* ── BOTTOM ── */}
        <Box
          sx={{
            px: 3,
            py: 3,
            borderTop: "1px solid var(--border-subtle)"
          }}
        >
          {user ? (
            <Box
              component="button"
              onClick={async () => {
                await logout();
                close();
                navigate("/");
              }}
              sx={{
                width: "100%",
                py: 1,
                px: 2,
                borderRadius: "var(--radius-pill)",
                border: "1px solid rgba(248,113,113,0.3)",
                background: "transparent",
                color: "#f87171",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  background: "rgba(248,113,113,0.08)",
                  borderColor: "#f87171"
                }
              }}
            >
              Logout
            </Box>
          ) : (
            <Box
              component="button"
              onClick={() => { close(); navigate("/login"); }}
              sx={{
                width: "100%",
                py: 1,
                px: 2,
                borderRadius: "var(--radius-pill)",
                border: "none",
                background: "var(--accent)",
                color: "var(--text-inverse)",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  background: "var(--accent-dark)",
                  boxShadow: "var(--shadow-glow)"
                }
              }}
            >
              Get Started
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Sidebar;
