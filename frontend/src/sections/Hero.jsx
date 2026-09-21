import { Box, Typography, Container } from "@mui/material";
import heroVideo from "../assets/videos/hero-scan.mp4";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Hero() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "48vh", sm: "72vh", md: "88vh" },
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center"
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
          top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          zIndex: 1,
          transform: "scale(1.05)",
          opacity: 0.18
        }}
      >
        <source src={heroVideo} type="video/mp4" />
      </Box>

      {/* GRADIENT OVERLAY — top fade to bottom */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            linear-gradient(
              180deg,
              rgba(10,12,11,0.7) 0%,
              rgba(10,12,11,0.25) 40%,
              rgba(10,12,11,0.85) 100%
            )
          `,
          zIndex: 2
        }}
      />

      {/* Subtle grid texture */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      {/* HERO CONTENT */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 3,
          px: { xs: 3, sm: 4 }
        }}
      >
        <Box sx={{ maxWidth: { xs: "100%", md: 620 } }}>

          {/* Label pill */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              background: "var(--accent-dim)",
              border: "1px solid rgba(74,222,128,0.2)",
              borderRadius: "var(--radius-pill)",
              px: 1.5,
              py: 0.5,
              mb: { xs: 2, sm: 3 },
              animation: "fadeUp 0.5s var(--ease-out)"
            }}
          >
            <Box
              sx={{
                width: 6, height: 6,
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 6px var(--accent)"
              }}
            />
            <Typography
              sx={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--accent)",
                letterSpacing: "0.08em"
              }}
            >
              Ingredient Analysis Engine
            </Typography>
          </Box>

          {/* Headline */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.2rem", sm: "3.4rem", md: "4.8rem" },
              color: "var(--text-primary)",
              lineHeight: 1.05,
              mb: { xs: 1.5, sm: 2.5 },
              animation: "fadeUp 0.6s 0.08s var(--ease-out) both"
            }}
          >
            Know What<br />
            <Box component="span" sx={{ color: "var(--accent)", fontStyle: "italic" }}>
              You Eat
            </Box>
          </Typography>

          {/* Sub */}
          <Typography
            sx={{
              color: "rgba(240,244,238,0.65)",
              fontSize: { xs: "0.85rem", sm: "1.05rem", md: "1.2rem" },
              lineHeight: 1.7,
              maxWidth: 480,
              mb: { xs: 2.5, sm: 4 },
              animation: "fadeUp 0.6s 0.16s var(--ease-out) both"
            }}
          >
            Scan packaged food and instantly decode every ingredient,
            additive, and nutrition value. No jargon. No confusion.
          </Typography>

          {/* CTA */}
          <Box
            component="button"
            onClick={() => {
              if (!user) {
                navigate("/login");
                return;
              }
              // Dispatch a custom event that Navbar listens for
              window.dispatchEvent(new CustomEvent("fispec:open-scanner"));
            }}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              px: { xs: 2.5, sm: 3.5 },
              py: { xs: 1, sm: 1.25 },
              borderRadius: "var(--radius-pill)",
              border: "none",
              background: "var(--accent)",
              color: "var(--text-inverse)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: { xs: "0.875rem", sm: "1rem" },
              cursor: "pointer",
              transition: "all 0.25s var(--ease-out)",
              animation: "fadeUp 0.6s 0.24s var(--ease-out) both",
              "&:hover": {
                background: "var(--accent-dark)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 24px rgba(74,222,128,0.3)"
              }
            }}
          >
            {user ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="7" width="18" height="13" rx="2"/>
                  <path d="M8 7V5a4 4 0 0 1 8 0v2"/>
                  <line x1="9" y1="12" x2="15" y2="12"/>
                  <line x1="12" y1="9" x2="12" y2="15"/>
                </svg>
                Scan Now
              </>
            ) : (
              <>
                Get Started — Free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </Box>

        </Box>
      </Container>

      {/* Bottom fade */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "30%",
          background: "linear-gradient(transparent, var(--bg-base))",
          zIndex: 3,
          pointerEvents: "none"
        }}
      />

    </Box>
  );
}

export default Hero;