import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../api/client";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress
} from "@mui/material";

function History() {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadHistory = async () => {

      if (!user) return;

      try {

        const token = await user.getIdToken();
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


  function getScoreColor(score) {

    if (score >= 7) return "#2ecc71";
    if (score >= 4) return "#f1c40f";
    return "#e74c3c";

  }


  if (!user) {
    return (
      <Container maxWidth="lg">
        <Typography sx={{ mt: 6 }}>
          Please login first.
        </Typography>
      </Container>
    );
  }


  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10
        }}
      >
        <CircularProgress />
      </Box>
    );
  }


  if (history.length === 0) {
    return (
      <Container maxWidth="lg">
        <Typography sx={{ mt: 6 }}>
          No history yet.
        </Typography>
      </Container>
    );
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
        Your Scan History
      </Typography>


      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          justifyContent: "flex-start",
          gap: 1
        }}
      >

        {history.map((item) => (

          <Paper
            key={item.barcode}
            elevation={0}
            onClick={() => navigate(`/product/${item.barcode}`)}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid #686868",
              cursor: "pointer",
              position: "relative",
              transition: "0.25s",
              background: "#212121",
              width: 150,
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: "#cbd5f5"
              }
            }}
          >

            {/* SCORE BADGE */}

            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                background: getScoreColor(item.score),
                color: "#fff",
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                fontSize: "0.8rem",
                fontWeight: 600
              }}
            >
              {item.score}
            </Box>


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
                src={item.image}
                alt={item.product_name}
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
                fontWeight: 100,
                mb: 0.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                lineHeight: 1.4,
                minHeight: "2em",
                fontSize: "1rem"
              }}
            >
              {item.product_name}
            </Typography>


            {/* BRAND */}

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.9rem"
              }}
            >
              {item.brand || "Unknown Brand"}
            </Typography>

          </Paper>

        ))}

      </Box>

    </Container>

  );

}

export default History;