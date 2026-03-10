import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../api/client";
import { Container, Typography, Grid, Paper, Box, CircularProgress } from "@mui/material";

function SearchResults() {

  const { query } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const token = await user.getIdToken();

        const result = await fetchWithAuth(
          `/search-products?q=${encodeURIComponent(query)}`,
          token
        );

        setResults(result.results || []);
      } catch (err) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, user]);

  if (!user) return <p>Please login first.</p>;
  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <p>Error: {error}</p>;

  if (results.length === 0) {
    return <p>No products found.</p>;
  }

  return (

    <Container maxWidth="xl" sx={{ pt: 6 }}>

      <Typography
        variant="h4"
        sx={{
          mb: 5,
          fontSize: {
            xs: "2rem",
            sm: "2.4rem",
            md: "3rem"
          }
        }}
      >
        Search Results for "{query}"
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 2,
          justifyContent: "flex-start",
          alignItems: "stretch"
        }}
      >

        {results.map((product) => (

          <Box key={product.barcode}>

            <Paper
              elevation={0}
              onClick={() => navigate(`/product/${product.barcode}`)}
              sx={{
                width: 150,
                p: 2,
                borderRadius: 2,
                border: "1px solid #686868",
                cursor: "pointer",
                transition: "0.25s",
                background: "#212121",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minHeight: 220,
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "#cbd5f5"
                }
              }}
            >

              {/* IMAGE FRAME */}

              <Box
                sx={{
                  width: 100,
                  height: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#1a1a1a",
                  borderRadius: 1,
                  mb: 2,
                  overflow: "hidden"
                }}
              >

                <Box
                  component="img"
                  src={product.image || "https://via.placeholder.com/100"}
                  alt={product.product_name}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain"
                  }}
                />

              </Box>


              {/* PRODUCT NAME */}

              <Typography
                sx={{
                  fontWeight: 600,
                  mb: 0.5,
                  flexGrow: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical"
                }}
              >
                {product.product_name}
              </Typography>


              {/* BRAND */}

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {product.brand || "Unknown Brand"}
              </Typography>

            </Paper>

          </Box>

        ))}

      </Box>

    </Container>

  );
}

export default SearchResults;