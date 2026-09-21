import { Box, Typography, Container, Stack, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

function Footer() {
  const socials = [
    { icon: <GitHubIcon sx={{ fontSize: 18 }} />,    link: "https://github.com/VedantR12" },
    { icon: <InstagramIcon sx={{ fontSize: 18 }} />, link: "https://instagram.com/fi_spec" },
    { icon: <LinkedInIcon sx={{ fontSize: 18 }} />,  link: "https://linkedin.com/in/vedant-rode-13615a239" },
    { icon: <EmailIcon sx={{ fontSize: 18 }} />,     link: "mailto:fispec.official@gmail.com" }
  ];

  return (
    <Box sx={{ borderTop: "1px solid var(--border-subtle)", py: { xs: 5, md: 7 }, mt: 4 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Stack spacing={3} alignItems="center">

          {/* Brand */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{
              width: 26, height: 26, borderRadius: "7px",
              background: "var(--accent)", display: "flex",
              alignItems: "center", justifyContent: "center"
            }}>
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                <path d="M2 10V4.5L6 2L10 4.5V10" stroke="#0a0c0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.5 10V7H7.5V10" stroke="#0a0c0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Box>
            <Typography sx={{
              fontFamily: "var(--font-body)", fontWeight: 700,
              fontSize: "0.875rem", letterSpacing: "0.12em",
              color: "var(--text-primary)"
            }}>
              FISPEC
            </Typography>
          </Box>

          {/* Socials */}
          <Stack direction="row" spacing={0.5}>
            {socials.map((social, index) => (
              <IconButton
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: "var(--text-tertiary)",
                  width: 36, height: 36,
                  border: "1px solid transparent",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "var(--accent)",
                    borderColor: "rgba(74,222,128,0.2)",
                    background: "var(--accent-dim)",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>

          {/* Divider dot row */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ width: 40, height: 1, background: "var(--border-subtle)" }} />
            <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)", opacity: 0.6 }} />
            <Box sx={{ width: 40, height: 1, background: "var(--border-subtle)" }} />
          </Box>

          {/* Copyright */}
          <Typography sx={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem",
            color: "var(--text-tertiary)", letterSpacing: "0.06em"
          }}>
            © {new Date().getFullYear()} FISPEC — Know What You Eat
          </Typography>

        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
