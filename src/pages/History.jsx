import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../api/client";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, CircularProgress } from "@mui/material";

function getScoreColor(score) {
  if (score >= 7) return "var(--score-good)";
  if (score >= 4) return "var(--score-mid)";
  return "var(--score-bad)";
}

function getScoreBgColor(score) {
  if (score >= 7) return "rgba(74,222,128,0.12)";
  if (score >= 4) return "rgba(251,191,36,0.12)";
  return "rgba(248,113,113,0.12)";
}

function History() {
  const { user }   = useAuth();
  const navigate   = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      if (!user) return;
      try {
        const token  = await user.getIdToken();
        const result = await fetchWithAuth("/history", token);
        setHistory(result.history || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, [user]);

  if (!user) return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <Typography sx={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>Please login first.</Typography>
    </Box>
  );

  if (loading) return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 2 }}>
      <CircularProgress size={32} thickness={3} />
      <Typography sx={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-tertiary)", letterSpacing: "0.08em" }}>
        Loading history...
      </Typography>
    </Box>
  );

  if (history.length === 0) return (
    <Container maxWidth="lg" sx={{ pt: 8, textAlign: "center" }}>
      <Box sx={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 64, height: 64, borderRadius: "var(--radius-lg)",
        background: "var(--bg-card)", border: "1px solid var(--border-default)",
        mb: 3, fontSize: "1.8rem"
      }}>
        🕐
      </Box>
      <Typography sx={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--text-secondary)", mb: 1 }}>
        No history yet
      </Typography>
      <Typography sx={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--text-tertiary)" }}>
        Scan a product to get started
      </Typography>
    </Container>
  );

  return (
    <Container maxWidth="xl" sx={{ pt: 6, pb: 8, px: { xs: 2, sm: 3 } }}>

      {/* Header */}
      <Box sx={{ mb: 6, animation: "fadeUp 0.4s var(--ease-out)" }}>
        <Typography sx={{
          fontFamily: "var(--font-mono)", fontSize: "0.7rem",
          color: "var(--accent)", letterSpacing: "0.1em", mb: 1.5,
          display: "flex", alignItems: "center", gap: 1
        }}>
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
          {history.length} SCAN{history.length !== 1 ? "S" : ""}
        </Typography>
        <Typography variant="h3" sx={{ fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" } }}>
          Your Scan{" "}
          <Box component="span" sx={{ fontStyle: "italic", color: "var(--accent)" }}>History</Box>
        </Typography>
      </Box>

      {/* Grid */}
      <Box sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 2
      }}>
        {history.map((item, index) => (
          <Box
            key={item.barcode}
            onClick={() => navigate(`/product/${item.barcode}`)}
            sx={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)",
              p: 2,
              cursor: "pointer",
              position: "relative",
              transition: "all 0.25s var(--ease-out)",
              display: "flex", flexDirection: "column",
              minHeight: 220,
              animation: `fadeUp 0.3s ${index * 0.04}s var(--ease-out) both`,
              "&:hover": {
                transform: "translateY(-6px)",
                borderColor: "rgba(74,222,128,0.25)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(74,222,128,0.08)"
              }
            }}
          >
            {/* Score badge */}
            <Box sx={{
              position: "absolute", top: 10, right: 10,
              width: 28, height: 28, borderRadius: "var(--radius-sm)",
              background: getScoreBgColor(item.score),
              border: `1px solid ${getScoreColor(item.score)}40`,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Typography sx={{
                fontFamily: "var(--font-mono)", fontWeight: 500,
                fontSize: "0.7rem", color: getScoreColor(item.score), lineHeight: 1
              }}>
                {item.score}
              </Typography>
            </Box>

            {/* Image */}
            <Box sx={{
              width: "100%", aspectRatio: "1/1",
              background: "var(--bg-elevated)", borderRadius: "var(--radius-md)",
              mb: 2, overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Box
                component="img"
                src={item.image}
                alt={item.product_name}
                sx={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }}
              />
            </Box>

            {/* Name */}
            <Typography sx={{
              fontWeight: 500, fontSize: "0.85rem",
              color: "var(--text-primary)", mb: 0.5, flexGrow: 1,
              fontFamily: "var(--font-body)",
              overflow: "hidden", textOverflow: "ellipsis",
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
              lineHeight: 1.4
            }}>
              {item.product_name}
            </Typography>

            {/* Brand */}
            <Typography sx={{
              fontFamily: "var(--font-mono)", fontSize: "0.68rem",
              color: "var(--text-tertiary)", letterSpacing: "0.04em", mt: "auto"
            }}>
              {item.brand || "Unknown Brand"}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default History;
