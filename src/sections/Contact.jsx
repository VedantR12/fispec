import { Box, Typography, Container, Stack } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

function Contact() {
  return (
    <Box id="contact" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>

        <Box sx={{
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-default)",
          background: "var(--bg-card)",
          px: { xs: 3, md: 8 },
          py: { xs: 5, md: 8 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.3s ease",
          "&:hover": { borderColor: "rgba(74,222,128,0.2)" }
        }}>

          {/* Background decoration */}
          <Box sx={{
            position: "absolute", top: -60, right: -60,
            width: 240, height: 240, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)",
            pointerEvents: "none"
          }} />
          <Box sx={{
            position: "absolute", bottom: -40, left: -40,
            width: 180, height: 180, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 70%)",
            pointerEvents: "none"
          }} />

          {/* Section label */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Box sx={{
              fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent)",
              letterSpacing: "0.12em", background: "var(--accent-dim)",
              border: "1px solid rgba(74,222,128,0.2)", borderRadius: "var(--radius-pill)", px: 1.5, py: 0.4
            }}>
              CONTACT
            </Box>
          </Box>

          <Typography variant="h2" sx={{
            fontSize: { xs: "2rem", sm: "2.8rem", md: "3.8rem" }, mb: 2
          }}>
            Get in touch
          </Typography>

          <Typography sx={{
            color: "var(--text-secondary)", mb: { xs: 4, md: 6 },
            maxWidth: 480, mx: "auto",
            fontSize: { xs: "0.9rem", sm: "1.05rem" }, lineHeight: 1.75
          }}>
            Have questions, suggestions, or feedback about FiSpec?
            Feel free to reach out.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            {/* Email */}
            <Box
              component="a"
              href="mailto:fispec.official@gmail.com"
              sx={{
                display: "inline-flex", alignItems: "center", gap: 1.5,
                px: 3, py: 1.25, borderRadius: "var(--radius-pill)",
                background: "var(--accent)", color: "var(--text-inverse)",
                fontFamily: "var(--font-body)", fontWeight: 600,
                fontSize: "0.875rem", textDecoration: "none",
                transition: "all 0.2s var(--ease-out)",
                "&:hover": {
                  background: "var(--accent-dark)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(74,222,128,0.25)"
                }
              }}
            >
              <EmailIcon sx={{ fontSize: 18 }} />
              fispec.official@gmail.com
            </Box>

            {/* Phone */}
            <Box
              component="a"
              href="tel:+917447892904"
              sx={{
                display: "inline-flex", alignItems: "center", gap: 1.5,
                px: 3, py: 1.25, borderRadius: "var(--radius-pill)",
                background: "transparent",
                border: "1px solid rgba(74,222,128,0.3)", color: "var(--accent)",
                fontFamily: "var(--font-body)", fontWeight: 500,
                fontSize: "0.875rem", textDecoration: "none",
                transition: "all 0.2s var(--ease-out)",
                "&:hover": {
                  background: "var(--accent-dim)",
                  borderColor: "var(--accent)",
                  transform: "translateY(-2px)"
                }
              }}
            >
              <PhoneIcon sx={{ fontSize: 18 }} />
              +91 7447892904
            </Box>
          </Stack>

        </Box>
      </Container>
    </Box>
  );
}

export default Contact;
