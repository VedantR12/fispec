import { Box, Typography, Container, Stack, IconButton } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

function Footer() {

  const socials = [
    {
      icon: <GitHubIcon />,
      link: "https://github.com/VedantR12"
    },
    {
      icon: <InstagramIcon />,
      link: "https://instagram.com/fi_spec"
    },
    {
      icon: <LinkedInIcon />,
      link: "https://linkedin.com/in/vedant-rode-13615a239"
    },
    {
      icon: <EmailIcon />,
      link: "mailto:fispec.official@gmail.com"
    }
  ];

  return (

    <Box
      sx={{
        mt: 12,
        borderTop: "1px solid #686868",
        py: 6
      }}
    >

      <Container maxWidth="lg">

        <Stack
          spacing={3}
          alignItems="center"
        >

          {/* Brand */}

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: "0.08em"
            }}
          >
            FISPEC
          </Typography>


          {/* Social Links */}

          <Stack
            direction="row"
            spacing={1}
          >

            {socials.map((social, index) => (

              <IconButton
                key={index}
                href={social.link}
                target="_blank"
                sx={{
                  color: "text.secondary",
                  transition: "0.25s",
                  "&:hover": {
                    color: "#2563eb",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                {social.icon}
              </IconButton>

            ))}

          </Stack>


          {/* Copyright */}

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
          >
            © {new Date().getFullYear()} FiSpec. Know What You Eat.
          </Typography>

        </Stack>

      </Container>

    </Box>

  );

}

export default Footer;