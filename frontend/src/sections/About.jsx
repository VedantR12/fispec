import { Box, Typography, Container, Grid } from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsightsIcon from "@mui/icons-material/Insights";

function About() {
  const features = [
    {
      icon: <VisibilityIcon sx={{ fontSize: 22 }} />,
      tag: "01",
      title: "Full Transparency",
      text: "FiSpec reveals what food labels often hide. Understand every ingredient, additive, and nutrition value behind packaged foods."
    },
    {
      icon: <ScienceIcon sx={{ fontSize: 22 }} />,
      tag: "02",
      title: "Ingredient Analysis",
      text: "Our system analyzes ingredients and additives using trusted food databases to explain what each component means for your health."
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 22 }} />,
      tag: "03",
      title: "Unbiased Scoring",
      text: "FiSpec generates a clear product score so you can quickly understand the overall quality of the food you are buying."
    }
  ];

  return (
    <Box id="about" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>

        {/* Section label */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Box
            sx={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--accent)",
              letterSpacing: "0.12em",
              background: "var(--accent-dim)",
              border: "1px solid rgba(74,222,128,0.2)",
              borderRadius: "var(--radius-pill)",
              px: 1.5, py: 0.4
            }}
          >
            ABOUT FISPEC
          </Box>
        </Box>

        <Typography
          variant="h2"
          textAlign="center"
          sx={{
            fontSize: { xs: "2rem", sm: "2.8rem", md: "3.8rem" },
            mb: 2
          }}
        >
          Built for{" "}
          <Box component="span" sx={{ fontStyle: "italic", color: "var(--accent)" }}>
            food clarity
          </Box>
        </Typography>

        <Typography
          textAlign="center"
          sx={{
            maxWidth: 560,
            mx: "auto",
            mb: { xs: 6, md: 10 },
            fontSize: { xs: "0.9rem", sm: "1.05rem" },
            color: "var(--text-secondary)",
            lineHeight: 1.75
          }}
        >
          FiSpec helps people understand the true quality of packaged food.
          By analyzing ingredients, additives, and nutrition values, FiSpec
          provides clear insights so consumers can make informed decisions.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  p: { xs: 3, md: 3.5 },
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-default)",
                  background: "var(--bg-card)",
                  height: "100%",
                  transition: "all 0.3s var(--ease-out)",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: "rgba(74,222,128,0.25)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(74,222,128,0.1)"
                  },
                  "&:hover .feature-icon-bg": {
                    background: "var(--accent)",
                    color: "var(--text-inverse)"
                  }
                }}
              >
                {/* Tag */}
                <Typography
                  sx={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--text-tertiary)",
                    letterSpacing: "0.1em",
                    mb: 2.5
                  }}
                >
                  {feature.tag}
                </Typography>

                {/* Icon */}
                <Box
                  className="feature-icon-bg"
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-md)",
                    background: "var(--accent-dim)",
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2.5,
                    transition: "all 0.25s ease"
                  }}
                >
                  {feature.icon}
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    mb: 1.5,
                    fontSize: { xs: "1.1rem", md: "1.25rem" }
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7
                  }}
                >
                  {feature.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}

export default About;
