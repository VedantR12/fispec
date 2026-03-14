import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../api/client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container, Typography, Box, CircularProgress } from "@mui/material";

/* ── Helpers ── */
function getScoreColor(score) {
  if (score >= 7) return "var(--score-good)";
  if (score >= 4) return "var(--score-mid)";
  return "var(--score-bad)";
}

function getScoreBg(score) {
  if (score >= 7) return "rgba(74,222,128,0.08)";
  if (score >= 4) return "rgba(251,191,36,0.08)";
  return "rgba(248,113,113,0.08)";
}

function getScoreLabel(score) {
  if (score >= 7) return "Good";
  if (score >= 4) return "Moderate";
  return "Poor";
}

/* ── Score Ring ── */
function ScoreRing({ score }) {
  const size = 96;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = score / 10;
  const dash = circ * pct;
  const color = getScoreColor(score);

  return (
    <Box sx={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.8s var(--ease-out)" }}
        />
      </svg>
      <Box sx={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 0
      }}>
        <Typography sx={{
          fontFamily: "var(--font-mono)", fontWeight: 500,
          fontSize: "1.4rem", color, lineHeight: 1
        }}>
          {score}
        </Typography>
        <Typography sx={{
          fontFamily: "var(--font-mono)", fontSize: "0.55rem",
          color: "var(--text-tertiary)", letterSpacing: "0.08em"
        }}>
          /10
        </Typography>
      </Box>
    </Box>
  );
}

/* ── Expandable Row ── */
function ExpandRow({ label, meta, isOpen, onToggle, children }) {
  return (
    <Box
      onClick={onToggle}
      sx={{
        borderTop: "1px solid var(--border-subtle)",
        py: 2, cursor: "pointer",
        transition: "background 0.15s ease",
        mx: -3, px: 3,
        "&:hover": { background: "rgba(255,255,255,0.02)" }
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{
          fontWeight: 500, fontSize: "0.9rem",
          color: "var(--text-primary)", fontFamily: "var(--font-body)"
        }}>
          {label}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {meta && (
            <Typography sx={{
              fontFamily: "var(--font-mono)", fontSize: "0.8rem",
              color: "var(--text-secondary)"
            }}>
              {meta}
            </Typography>
          )}
          <ExpandMoreIcon sx={{
            fontSize: 18, color: "var(--text-tertiary)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s var(--ease-out)"
          }} />
        </Box>
      </Box>
      {isOpen && (
        <Box sx={{ mt: 1.5, animation: "fadeUp 0.2s var(--ease-out)" }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

/* ── Card wrapper ── */
function Card({ children, sx = {} }) {
  return (
    <Box sx={{
      background: "var(--bg-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      px: 3, py: 2.5,
      mb: 2,
      ...sx
    }}>
      {children}
    </Box>
  );
}

/* ── Section label ── */
function CardLabel({ children }) {
  return (
    <Typography sx={{
      fontFamily: "var(--font-mono)", fontSize: "0.65rem",
      color: "var(--text-tertiary)", letterSpacing: "0.1em",
      mb: 2
    }}>
      {children}
    </Typography>
  );
}

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
function Product() {
  const { barcode } = useParams();
  const { user } = useAuth();
  const [openNutrition, setOpenNutrition] = useState(null);
  const [openAdditive, setOpenAdditive]   = useState(null);
  const [openScoreNotes, setOpenScoreNotes] = useState(false);
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");
  const productRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const result = await fetchWithAuth(`/search?q=${barcode}`, token);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [barcode, user]);

  const toggleNutrition = (key) => { setOpenNutrition(openNutrition === key ? null : key); setOpenAdditive(null); };
  const toggleAdditive  = (i)   => { setOpenAdditive(openAdditive === i ? null : i); setOpenNutrition(null); };
  const toggleScoreNotes = ()   => { setOpenScoreNotes(!openScoreNotes); setOpenNutrition(null); setOpenAdditive(null); };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productRef.current && !productRef.current.contains(event.target)) {
        setOpenNutrition(null);
        setOpenAdditive(null);
        setOpenScoreNotes(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ── States ── */
  if (!user) return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <Typography sx={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
        Please login first.
      </Typography>
    </Box>
  );

  if (loading) return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 2 }}>
      <CircularProgress size={32} thickness={3} />
      <Typography sx={{
        fontFamily: "var(--font-mono)", fontSize: "0.75rem",
        color: "var(--text-tertiary)", letterSpacing: "0.08em"
      }}>
        Analyzing product...
      </Typography>
    </Box>
  );

  if (error) return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <Typography sx={{ color: "var(--score-bad)", fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
        Error: {error}
      </Typography>
    </Box>
  );

  if (!data) return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <Typography sx={{ color: "var(--text-secondary)" }}>No product found</Typography>
    </Box>
  );

  const product   = data.product_details;
  const nutrition = data.analysis.nutrition_breakdown;
  const additives = data.analysis.additives_analysis;
  const score     = data.final_fispec_score;

  return (
    <Container ref={productRef} maxWidth="sm" sx={{ pt: 4, pb: 8, px: { xs: 2, sm: 3 } }}>

      {/* ── PRODUCT IMAGE ── */}
      <Box sx={{
        width: "100%", height: 200,
        display: "flex", justifyContent: "center", alignItems: "center",
        mb: 3,
        background: "var(--bg-card)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-subtle)",
        overflow: "hidden",
        position: "relative",
        animation: "fadeIn 0.4s ease"
      }}>
        {/* Subtle radial bg */}
        <Box sx={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(74,222,128,0.04) 0%, transparent 70%)"
        }} />
        <img
          src={product.image_url || product.image_small_url}
          alt={product.product_name}
          loading="lazy"
          style={{ maxHeight: "85%", maxWidth: "85%", objectFit: "contain", position: "relative" }}
        />
      </Box>

      {/* ── PRODUCT HEADER ── */}
      <Box sx={{ mb: 3, animation: "fadeUp 0.4s 0.05s var(--ease-out) both" }}>
        <Typography variant="h4" sx={{
          fontSize: { xs: "1.4rem", sm: "1.75rem" },
          color: "var(--text-primary)", mb: 0.5
        }}>
          {product.product_name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text-tertiary)" }} />
          <Typography sx={{
            fontFamily: "var(--font-mono)", fontSize: "0.75rem",
            color: "var(--text-secondary)", letterSpacing: "0.04em"
          }}>
            {product.brand || "Unknown Brand"}
          </Typography>
        </Box>
      </Box>

      {/* ── SCORE CARD ── */}
      <Card sx={{
        background: getScoreBg(score),
        border: `1px solid ${getScoreColor(score)}30`,
        animation: "fadeUp 0.4s 0.1s var(--ease-out) both"
      }}>
        <CardLabel>FISPEC SCORE</CardLabel>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 1 }}>
          <ScoreRing score={score} />
          <Box>
            <Typography sx={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              color: getScoreColor(score),
              lineHeight: 1.1,
              mb: 0.5
            }}>
              {getScoreLabel(score)}
            </Typography>
            <Typography sx={{
              fontSize: "0.8rem", color: "var(--text-secondary)",
              fontFamily: "var(--font-body)"
            }}>
              Overall product quality rating
            </Typography>
          </Box>
        </Box>

        {/* Score explanation dropdown */}
        <ExpandRow
          label="Score Explanation"
          isOpen={openScoreNotes}
          onToggle={toggleScoreNotes}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            {data.engine_notes.map((note, i) => (
              <Box key={i} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                <Box sx={{
                  width: 4, height: 4, borderRadius: "50%",
                  background: "var(--text-tertiary)", mt: "8px", flexShrink: 0
                }} />
                <Typography sx={{
                  fontSize: "0.83rem", color: "var(--text-secondary)",
                  lineHeight: 1.65, fontFamily: "var(--font-body)"
                }}>
                  {note}
                </Typography>
              </Box>
            ))}
          </Box>
        </ExpandRow>
      </Card>

      {/* ── QUICK INSIGHT ── */}
      <Card sx={{ animation: "fadeUp 0.4s 0.15s var(--ease-out) both" }}>
        <CardLabel>QUICK INSIGHT</CardLabel>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <Box sx={{
            width: 32, height: 32, borderRadius: "var(--radius-sm)",
            background: "var(--amber-dim)", color: "var(--amber)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, fontSize: "1rem"
          }}>
            ⚡
          </Box>
          <Typography sx={{
            fontSize: "0.9rem", color: "var(--text-secondary)",
            lineHeight: 1.75, fontFamily: "var(--font-body)", pt: 0.5
          }}>
            {data.analysis.summary.one_line}
          </Typography>
        </Box>
      </Card>

      {/* ── NUTRITION BREAKDOWN ── */}
      <Card sx={{ animation: "fadeUp 0.4s 0.2s var(--ease-out) both" }}>
        <CardLabel>NUTRITION BREAKDOWN</CardLabel>
        <Typography variant="h6" sx={{
          fontSize: "1rem", mb: 0, color: "var(--text-primary)"
        }}>
          Per serving values
        </Typography>

        {Object.entries(nutrition).map(([key, value]) => (
          <ExpandRow
            key={key}
            label={key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
            meta={`${value.value} ${value.unit}`}
            isOpen={openNutrition === key}
            onToggle={() => toggleNutrition(key)}
          >
            <Typography sx={{
              fontSize: "0.83rem", color: "var(--text-secondary)",
              lineHeight: 1.7, fontFamily: "var(--font-body)"
            }}>
              {value.impact}
            </Typography>
          </ExpandRow>
        ))}
      </Card>

      {/* ── ADDITIVES ── */}
      <Card sx={{ animation: "fadeUp 0.4s 0.25s var(--ease-out) both" }}>
        <CardLabel>ADDITIVES DETECTED</CardLabel>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0 }}>
          <Typography variant="h6" sx={{ fontSize: "1rem", color: "var(--text-primary)" }}>
            {additives.length} additive{additives.length !== 1 ? "s" : ""} found
          </Typography>
          <Box sx={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            color: additives.length === 0 ? "var(--score-good)" : "var(--score-mid)",
            background: additives.length === 0 ? "rgba(74,222,128,0.1)" : "rgba(251,191,36,0.1)",
            border: `1px solid ${additives.length === 0 ? "rgba(74,222,128,0.2)" : "rgba(251,191,36,0.2)"}`,
            borderRadius: "var(--radius-pill)", px: 1.25, py: 0.3, letterSpacing: "0.06em"
          }}>
            {additives.length === 0 ? "CLEAN" : "REVIEW"}
          </Box>
        </Box>

        {additives.map((a, i) => (
          <ExpandRow
            key={i}
            label={`${a.name}${a.code ? ` (E${a.code})` : ""}`}
            isOpen={openAdditive === i}
            onToggle={() => toggleAdditive(i)}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography sx={{
                fontSize: "0.83rem", color: "var(--text-secondary)",
                lineHeight: 1.7, fontFamily: "var(--font-body)"
              }}>
                {a.general_note}
              </Typography>
              <Box sx={{
                display: "flex", gap: 1, alignItems: "flex-start",
                p: 1.5, borderRadius: "var(--radius-sm)",
                background: "var(--bg-elevated)"
              }}>
                <Typography sx={{
                  fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                  color: "var(--accent)", letterSpacing: "0.06em", mt: 0.1, flexShrink: 0
                }}>
                  USED FOR
                </Typography>
                <Typography sx={{
                  fontSize: "0.8rem", color: "var(--text-secondary)",
                  fontFamily: "var(--font-body)", lineHeight: 1.5
                }}>
                  {a.why_used}
                </Typography>
              </Box>
            </Box>
          </ExpandRow>
        ))}
      </Card>

      {/* ── BARCODE FOOTER ── */}
      <Box sx={{
        textAlign: "center", mt: 2, animation: "fadeUp 0.4s 0.3s var(--ease-out) both"
      }}>
        <Typography sx={{
          fontFamily: "var(--font-mono)", fontSize: "0.65rem",
          color: "var(--text-tertiary)", letterSpacing: "0.1em"
        }}>
          BARCODE · {barcode}
        </Typography>
      </Box>

    </Container>
  );
}

export default Product;
