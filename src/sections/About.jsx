import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsightsIcon from "@mui/icons-material/Insights";

function About() {

  const features = [
    {
      icon: <VisibilityIcon fontSize="large" />,
      title: "Full Transparency",
      text: "FiSpec reveals what food labels often hide. Understand every ingredient, additive, and nutrition value behind packaged foods."
    },
    {
      icon: <ScienceIcon fontSize="large" />,
      title: "Ingredient Analysis",
      text: "Our system analyzes ingredients and additives using trusted food databases to explain what each component means."
    },
    {
      icon: <InsightsIcon fontSize="large" />,
      title: "Unbiased Scoring",
      text: "FiSpec generates a clear product score so you can quickly understand the overall quality of the food you are buying."
    }
  ];

  return (

    <Box
      id="about"
      sx={{
        py: 12,
      }}
    >

      <Container maxWidth="lg"
        sx={{
          px: { xs: 0, sm: 2 }
        }}
      >

        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            mb: 2,
            fontSize: {
              xs: "2rem",
              sm: "2.4rem",
              md: "3.5rem"
            }
          }}
        >
          About FiSpec
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          sx={{
            maxWidth: 700,
            mx: "auto",
            mb: 8,
            lineHeight: 1.7,
            fontSize: {
              xs: "0.9rem",
              sm: "1.1rem",
              md: "1.3rem"
            }
          }}
        >
          FiSpec helps people understand the true quality of packaged food.
          By analyzing ingredients, additives, and nutrition values, FiSpec
          provides clear insights so consumers can make informed decisions
          about what they eat.
        </Typography>

        <Grid container spacing={4} justifyContent="center">

          {features.map((feature, index) => (

            <Grid item xs={12} md={4} key={index}>

              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  border: "1px solid #686868",
                  textAlign: "center",
                  height: "100%",
                  transition: "0.25s",
                  "&:hover": {
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    transform: "translateY(-4px)",
                    borderColor: "#cbd5f5"
                  }
                }}
              >

                <Box
                  sx={{
                    mb: 2,
                    color: "#2563eb"
                  }}
                >
                  {feature.icon}
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontSize: {
                      xs: "1rem",
                      sm: "1.5rem",
                      md: "2rem"
                    }
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.7,
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1.1rem",
                      md: "1.3rem"
                    }
                  }}
                >
                  {feature.text}
                </Typography>

              </Paper>

            </Grid>

          ))}

        </Grid>

      </Container>

    </Box>

  );

}

export default About;