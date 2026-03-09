import { Box, Typography, Container } from "@mui/material";
import heroVideo from "../assets/videos/hero-scan.mp4";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

function Hero() {

  const navigate = useNavigate();
  const { user } = useAuth();

  return (

    <Box
      sx={{
        position: "relative",
        height: { xs: "40vh", sm: "70vh", md: "85vh" },
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        mt: "4%"
      }}
    >

      {/* VIDEO BACKGROUND */}

      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
          transform: "scale(1.05)",
          opacity: "0.3"
        }}
      >

        <source src={heroVideo} type="video/mp4" />

      </Box>


      {/* DARK GRADIENT OVERLAY */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              rgba(0,0,0,0.6),
              rgba(0,0,0,0.35),
              rgba(0,0,0,0.75)
            )
          `,
          zIndex: 2
        }}
      />


      {/* HERO CONTENT */}

      <Container
        maxWidth="lg"
        sx={{
          position: "absolute",
          zIndex: 3,
          top: {xs:"45%", sm: "55%"}
        }}
      >

        <Box
          sx={{
            maxWidth: 600
          }}
        >

          <Typography
            variant="h2"
            sx={{
              letterSpacing: "-0.02em",
              color: "#fff",
              mb: 1,
              fontSize: {
                xs: "1.5rem",
                sm: "2.4rem",
                md: "3.5rem"
              }
            }}
          >
            Know What You Eat
          </Typography>


          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: {
                xs: "0.7rem",
                sm: "1.1rem",
                md: "1.25rem"
              },
              lineHeight: 1.7
            }}
          >
            Scan packaged food and instantly understand
            the ingredients, additives, and nutrition
            hidden inside everyday products.
          </Typography>

          <Button
            variant="contained"
            onClick={() => {

              if (!user) {
                navigate("/login");
                return;
              }

              const scanButton = document.getElementById("navbar-scan-button");

              if (scanButton) {
                scanButton.click();
              }

            }}
            sx={{
              mt: {xs: 1, sm: 4},
              px: {xs: 2, sm: 3},
              py: 1,
              borderRadius: "30px",
              fontSize: {xs:"0.8rem", sm:"1rem"},
              textTransform: "none",
            }}
          >
            {user ? "Scan Now" : "Get Started"}
          </Button>
        </Box>

      </Container>

    </Box>

  );

}

export default Hero;