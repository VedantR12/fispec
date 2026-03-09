import { Box, Typography, Paper, Button, Stack } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

function Contact() {

  return (

    <Box
      id="contact"
      sx={{
        pt: { xs: 12, md: 14 },
        display: "flex",
        justifyContent: "center",
        px: { xs: 0, sm: 2}
      }}
    >

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "100%",
          p: { xs: 4, md: 6 },
          borderRadius: 2,
          border: "1px solid #686868",
          textAlign: "center",
          transition: "0.3s",
          "&:hover": {
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            transform: "translateY(-4px)",
            borderColor: "#cbd5f5"
          }
        }}
      >

        {/* Title */}

        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontSize: {
              xs: "2rem",
              sm: "2.4rem",
              md: "3.5rem"
            }
          }}
        >
          Contact Us
        </Typography>


        {/* Subtitle */}

        <Typography
          color="text.secondary"
          sx={{
            mb: 5,
            maxWidth: 520,
            mx: "auto",
            fontSize: {
              xs: "0.9rem",
              sm: "1.1rem",
              md: "1.3rem"
            }
          }}
        >
          Have questions, suggestions, or feedback about FiSpec?
          Feel free to reach out.
        </Typography>


        {/* Contact Buttons */}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          justifyContent="center"
        >

          {/* Email Button */}

          <Button
            variant="contained"
            startIcon={<EmailIcon />}
            href="mailto:fispec.official@gmail.com"
            sx={{
              borderRadius: "30px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontSize: "14px"
            }}
          >
            fispec.official@gmail.com
          </Button>


          {/* Phone Button */}

          <Button
            variant="outlined"
            startIcon={<PhoneIcon />}
            href="tel:+917447892904"
            sx={{
              borderRadius: "30px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontSize: "14px"
            }}
          >
            +91 7447892904
          </Button>

        </Stack>

      </Paper>

    </Box>

  );

}

export default Contact;