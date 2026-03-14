import { Box, Typography, Container } from "@mui/material";
import vedantImg from "../assets/vedant.jpg";
import cofounderImg from "../assets/cofounder.jpg";

function Team() {
  const founders = [
    { name: "Vedant", role: "Founder", image: vedantImg }
    // { name: "Pragati", role: "Co-Founder", image: cofounderImg }
  ];

  return (
    <Box id="team" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>

        {/* Section label */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Box sx={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent)",
            letterSpacing: "0.12em", background: "var(--accent-dim)",
            border: "1px solid rgba(74,222,128,0.2)", borderRadius: "var(--radius-pill)", px: 1.5, py: 0.4
          }}>
            THE TEAM
          </Box>
        </Box>

        <Typography variant="h2" textAlign="center"
          sx={{ fontSize: { xs: "2rem", sm: "2.8rem", md: "3.8rem" }, mb: 2 }}>
          The person building{" "}
          <Box component="span" sx={{ fontStyle: "italic", color: "var(--accent)" }}>FiSpec</Box>
        </Typography>

        <Typography textAlign="center" sx={{
          color: "var(--text-secondary)", mb: { xs: 6, md: 8 },
          fontSize: { xs: "0.9rem", sm: "1.05rem" }
        }}>
          One developer with a mission to make food transparency accessible.
        </Typography>

        {/* Cards */}
        <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 4 }}>
          {founders.map((person, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: "100%", sm: 300 },
                maxWidth: 340,
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-default)",
                background: "var(--bg-card)",
                overflow: "hidden",
                transition: "all 0.3s var(--ease-out)",
                "&:hover": {
                  transform: "translateY(-8px)",
                  borderColor: "rgba(74,222,128,0.25)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.5), var(--shadow-glow)"
                }
              }}
            >
              {/* Image */}
              <Box sx={{
                width: "100%", aspectRatio: "1/1",
                overflow: "hidden",
                background: "var(--bg-elevated)",
                position: "relative"
              }}>
                <Box
                  component="img"
                  src={person.image}
                  alt={person.name}
                  sx={{
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center",
                    transition: "transform 0.4s var(--ease-out)",
                    display: "block",
                    ".MuiBox-root:hover &": { transform: "scale(1.04)" }
                  }}
                />
                {/* Subtle green tint overlay */}
                <Box sx={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, transparent 60%, rgba(10,12,11,0.8) 100%)"
                }} />
              </Box>

              {/* Info */}
              <Box sx={{ px: 3, py: 2.5 }}>
                <Typography sx={{
                  fontFamily: "var(--font-display)", fontSize: "1.4rem",
                  color: "var(--text-primary)", mb: 0.5
                }}>
                  {person.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--accent)", flexShrink: 0
                  }} />
                  <Typography sx={{
                    fontFamily: "var(--font-mono)", fontSize: "0.75rem",
                    color: "var(--text-secondary)", letterSpacing: "0.06em"
                  }}>
                    {person.role.toUpperCase()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

      </Container>
    </Box>
  );
}

export default Team;
