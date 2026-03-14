import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Stack } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]         = useState("");
  const [loading, setLoading]   = useState(false);
  const [mode, setMode]         = useState("login"); // "login" | "register"

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await register(email, password, name);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      position: "relative",
      overflow: "hidden"
    }}>

      {/* Background decoration */}
      <Box sx={{
        position: "absolute", top: -100, right: -100,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />
      <Box sx={{
        position: "absolute", bottom: -80, left: -80,
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      {/* Grid lines */}
      <Box sx={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(74,222,128,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74,222,128,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        pointerEvents: "none"
      }} />

      {/* ── FORM PANEL ── */}
      <Box sx={{
        width: "100%",
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "center",
        pt: { xs: 10, md: 0 },
        px: 2,
        position: "relative",
        zIndex: 1
      }}>
        <Box sx={{
          width: "100%", maxWidth: 400,
          animation: "fadeUp 0.5s var(--ease-out)"
        }}>

          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 6 }}>
            <Box sx={{
              width: 36, height: 36, borderRadius: "10px",
              background: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <svg width="18" height="18" viewBox="0 0 12 12" fill="none">
                <path d="M2 10V4.5L6 2L10 4.5V10" stroke="#0a0c0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.5 10V7H7.5V10" stroke="#0a0c0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Box>
            <Typography sx={{
              fontFamily: "var(--font-body)", fontWeight: 700,
              fontSize: "1rem", letterSpacing: "0.1em", color: "var(--text-primary)"
            }}>
              FISPEC
            </Typography>
          </Box>

          {/* Headline */}
          <Typography variant="h2" sx={{
            fontSize: { xs: "2rem", sm: "2.5rem" }, mb: 1
          }}>
            {mode === "login" ? "Welcome back" : "Create account"}
          </Typography>
          <Typography sx={{
            color: "var(--text-secondary)", fontSize: "0.9rem", mb: 4
          }}>
            {mode === "login"
              ? "Sign in to access your scans and history."
              : "Start analyzing food products for free."}
          </Typography>

          {/* Mode toggle */}
          <Box sx={{
            display: "flex", gap: 0.5,
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-pill)",
            p: 0.5, mb: 3.5
          }}>
            {["login", "register"].map((m) => (
              <Box
                key={m}
                onClick={() => setMode(m)}
                sx={{
                  flex: 1, py: 0.75, textAlign: "center",
                  borderRadius: "var(--radius-pill)",
                  cursor: "pointer", transition: "all 0.2s ease",
                  background: mode === m ? "var(--accent)" : "transparent",
                  color: mode === m ? "var(--text-inverse)" : "var(--text-secondary)",
                  fontFamily: "var(--font-body)", fontWeight: mode === m ? 600 : 400,
                  fontSize: "0.875rem",
                  userSelect: "none"
                }}
              >
                {m === "login" ? "Sign In" : "Register"}
              </Box>
            ))}
          </Box>

          {/* Fields */}
          <Stack spacing={2}>
            {mode === "register" && (
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              size="small"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && mode === "login") handleLogin(); }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") mode === "login" ? handleLogin() : handleRegister(); }}
            />
          </Stack>

          {/* Submit */}
          <Box
            component="button"
            onClick={mode === "login" ? handleLogin : handleRegister}
            disabled={loading}
            sx={{
              width: "100%", mt: 3, py: 1.25,
              borderRadius: "var(--radius-pill)", border: "none",
              background: loading ? "var(--accent-dim)" : "var(--accent)",
              color: loading ? "var(--accent)" : "var(--text-inverse)",
              fontFamily: "var(--font-body)", fontWeight: 600,
              fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s var(--ease-out)",
              "&:hover:not(:disabled)": {
                background: "var(--accent-dark)",
                boxShadow: "0 8px 24px rgba(74,222,128,0.25)"
              }
            }}
          >
            {loading ? "Loading..." : mode === "login" ? "Sign In" : "Create Account"}
          </Box>

          {/* Footer note */}
          <Typography sx={{
            textAlign: "center", mt: 3,
            fontFamily: "var(--font-mono)", fontSize: "0.68rem",
            color: "var(--text-tertiary)", letterSpacing: "0.05em"
          }}>
            Free forever · No credit card required
          </Typography>

        </Box>
      </Box>

    </Box>
  );
}

export default Login;
