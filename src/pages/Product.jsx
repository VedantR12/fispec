import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../api/client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container, Typography, Box, Paper, CircularProgress, Chip } from "@mui/material";

function Product() {

  const { barcode } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [openNutrition, setOpenNutrition] = useState(null);
  const [openAdditive, setOpenAdditive] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openScoreNotes, setOpenScoreNotes] = useState(false);

  // FIX: removed productRef and the clickOutside useEffect entirely.
  // That handler was attaching a global mousedown listener. When the
  // scanner modal opened (rendered inside Navbar, outside this Container),
  // any click on the scanner counted as "outside productRef" and fired
  // the handler — which was resetting state and conflicting with the
  // scanner open/close logic, causing it to flash and close instantly.

  useEffect(() => {

    const fetchProduct = async () => {

      if (!user) return;

      try {

        const token = await user.getIdToken();

        const result = await fetchWithAuth(
          `/search?q=${barcode}`,
          token
        );

        setData(result);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [barcode, user]);


  function getScoreColor(score) {

    if (score >= 7) return "#22c55e"; // green
    if (score >= 4) return "#f59e0b"; // yellow
    return "#ef4444"; // red

  }

  const toggleNutrition = (key) => {
    setOpenNutrition(openNutrition === key ? null : key);
    setOpenAdditive(null);
  };

  const toggleAdditive = (index) => {
    setOpenAdditive(openAdditive === index ? null : index);
    setOpenNutrition(null);
  };

  const toggleScoreNotes = () => {
    setOpenScoreNotes(!openScoreNotes);
    setOpenNutrition(null);
    setOpenAdditive(null);
  };


  if (!user) return <p>Please login first.</p>;

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <CircularProgress />
    </Box>
  );

  if (
    error ||
    !data ||
    !data.product_details ||
    !data.analysis
  ) {
    return (

      <Container maxWidth="sm" sx={{ pt: 8 }}>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            border: "1px solid #686868",
            background: "#212121",
            textAlign: "center"
          }}
        >

          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Product Not Found
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            This barcode does not exist in the FiSpec database yet.
          </Typography>

          <Box
            onClick={() => navigate("/")}
            sx={{
              display: "inline-block",
              px: 3,
              py: 1.5,
              background: "#6366f1",
              borderRadius: 2,
              cursor: "pointer",
              fontWeight: 500
            }}
          >
            Return to Home
          </Box>

        </Paper>

      </Container>

    );
  }

  const product = data.product_details;
  const nutrition = data.analysis?.nutrition_breakdown || {};
  const additives = data.analysis?.additives_analysis || [];


  return (

    <Container maxWidth="sm" sx={{ pt: 4, pb: 6 }}>

      {/* PRODUCT IMAGE */}

      <Box
        sx={{
          width: "100%",
          height: 220,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
          background: "#1a1a1a",
          borderRadius: 2,
          overflow: "hidden"
        }}
      >
        <img
          src={product.image_url || product.image_small_url}
          alt={product.product_name}
          loading="lazy"
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain"
          }}
        />
      </Box>


      {/* PRODUCT NAME */}

      <Typography
        variant="h5"
        sx={{ fontWeight: 600 }}
      >
        {product.product_name}
      </Typography>

      {/* FIX: brand name navigates to home on click */}
      <Typography
        color="text.secondary"
        onClick={() => navigate("/")}
        sx={{ mb: 3, cursor: "pointer" }}
      >
        {product.brand}
      </Typography>


      {/* SCORE CARD */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "1px solid #686868",
          background: "#212121",
          mb: 3
        }}
      >

        <Typography variant="h6">
          FiSpec Score
        </Typography>

        <Typography
          sx={{
            fontSize: 40,
            fontWeight: 700,
            color: getScoreColor(data.final_fispec_score)
          }}
        >
          {data.final_fispec_score}/10
        </Typography>


        {/* SCORE EXPLANATION DROPDOWN */}

        <Box
          onClick={toggleScoreNotes}
          sx={{
            mt: 2,
            borderTop: "1px solid #3a3a3a",
            pt: 2,
            cursor: "pointer"
          }}
        >

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >

            <Typography sx={{ fontWeight: 600 }}>
              Score Explanation
            </Typography>

            <ExpandMoreIcon
              sx={{
                transform: openScoreNotes ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.25s"
              }}
            />

          </Box>


          {openScoreNotes && (

            <Box sx={{ mt: 1 }}>

              {data.engine_notes.map((note, i) => (

                <Typography
                  key={i}
                  color="text.secondary"
                  sx={{
                    fontSize: 14,
                    mb: 0.5
                  }}
                >
                  • {note}
                </Typography>

              ))}

            </Box>

          )}

        </Box>

      </Paper>


      {/* QUICK INSIGHT */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "1px solid #686868",
          background: "#212121",
          mb: 3
        }}
      >

        <Typography variant="h6" sx={{ mb: 1 }}>
          Quick Insight
        </Typography>

        <Typography color="text.secondary">
          {data.analysis.summary.one_line}
        </Typography>

      </Paper>


      {/* NUTRITION */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "1px solid #686868",
          background: "#212121",
          mb: 3
        }}
      >

        <Typography variant="h6" sx={{ mb: 2 }}>
          Nutrition Breakdown
        </Typography>

        {Object.entries(nutrition).map(([key, value]) => (

          <Box
            key={key}
            onClick={() => toggleNutrition(key)}
            sx={{
              borderTop: "1px solid #3a3a3a",
              py: 2,
              cursor: "pointer"
            }}
          >

            {/* ROW HEADER */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >

              <Typography sx={{ fontWeight: 600 }}>
                {key.replace("_", " ")}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                <Typography color="text.secondary">
                  {value.value} {value.unit}
                </Typography>

                <ExpandMoreIcon
                  sx={{
                    transform:
                      openNutrition === key
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition: "0.25s"
                  }}
                />

              </Box>

            </Box>

            {/* DROPDOWN CONTENT */}

            {openNutrition === key && (

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                  fontSize: 14,
                  lineHeight: 1.6
                }}
              >
                {value.impact}
              </Typography>

            )}

          </Box>

        ))}

      </Paper>


      {/* ADDITIVES */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "1px solid #686868",
          background: "#212121",
          mb: 3
        }}
      >

        <Typography variant="h6" sx={{ mb: 2 }}>
          Additives Detected
        </Typography>

        {additives.map((a, i) => (

          <Box
            key={i}
            onClick={() => toggleAdditive(i)}
            sx={{
              borderTop: "1px solid #3a3a3a",
              py: 2,
              cursor: "pointer"
            }}
          >

            {/* HEADER ROW */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >

              <Typography sx={{ fontWeight: 600 }}>
                {a.name} {a.code && `(E${a.code})`}
              </Typography>

              <ExpandMoreIcon
                sx={{
                  transform:
                    openAdditive === i
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  transition: "0.25s"
                }}
              />

            </Box>

            {/* DROPDOWN TEXT */}

            {openAdditive === i && (

              <Box sx={{ mt: 1 }}>

                <Typography
                  color="text.secondary"
                  sx={{ fontSize: 14, mb: 0.5 }}
                >
                  {a.general_note}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ fontSize: 13 }}
                >
                  Used for: {a.why_used}
                </Typography>

              </Box>

            )}

          </Box>

        ))}

      </Paper>

    </Container>

  );

}

export default Product;