import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../api/client";
import { Container, Typography, Box, CircularProgress } from "@mui/material";

function SearchResults() {
  const { query }  = useParams();
  const { user }   = useAuth();
  const navigate   = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!user) { setLoading(false); return; }
      try {
        setLoading(true);
        setError("");
        const token  = await user.getIdToken();
        const result = await fetchWithAuth(`/search-products?q=${encodeURIComponent(query)}`, token);
        setResults(result.results || []);
      } catch (err) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, user]);

  if (!user) return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <Typography sx={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>Please login first.</Typography>
    </Box>
  );

  if (loading) return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 2 }}>
      <CircularProgress size={32} thickness={3} />
      <Typography sx={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-tertiary)", letterSpacing: "0.08em" }}>
        Searching products...
      </Typography>
    </Box>
  );

  if (error) return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <Typography sx={{ color: "var(--score-bad)", fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>Error: {error}</Typography>
    </Box>
  );

  if (results.length === 0) return (
    <Container maxWidth="lg" sx={{ pt: 8, textAlign: "center" }}>
      <Typography sx={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--text-secondary)", mb: 1 }}>
        No results found
      </Typography>
      <Typography sx={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--text-tertiary)" }}>
        Try a different product name or barcode
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
          {results.length} RESULT{results.length !== 1 ? "S" : ""}
        </Typography>
        <Typography variant="h3" sx={{
          fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" }
        }}>
          Results for{" "}
          <Box component="span" sx={{ fontStyle: "italic", color: "var(--accent)" }}>
            "{query}"
          </Box>
        </Typography>
      </Box>

      {/* Grid */}
      <Box sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 2
      }}>
        {results.map((product, index) => (
          <Box
            key={product.barcode}
            onClick={() => navigate(`/product/${product.barcode}`)}
            sx={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)",
              p: 2,
              cursor: "pointer",
              transition: "all 0.25s var(--ease-out)",
              display: "flex",
              flexDirection: "column",
              minHeight: 220,
              animation: `fadeUp 0.3s ${index * 0.04}s var(--ease-out) both`,
              "&:hover": {
                transform: "translateY(-6px)",
                borderColor: "rgba(74,222,128,0.25)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(74,222,128,0.08)"
              }
            }}
          >
            {/* Image */}
            <Box sx={{
              width: "100%", aspectRatio: "1/1",
              background: "var(--bg-elevated)",
              borderRadius: "var(--radius-md)",
              mb: 2, overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Box
                component="img"
                src={product.image || "https://via.placeholder.com/100"}
                alt={product.product_name}
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
              {product.product_name}
            </Typography>

            {/* Brand */}
            <Typography sx={{
              fontFamily: "var(--font-mono)", fontSize: "0.68rem",
              color: "var(--text-tertiary)", letterSpacing: "0.04em",
              mt: "auto"
            }}>
              {product.brand || "Unknown Brand"}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default SearchResults;
