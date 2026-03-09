import { Box, Typography, Paper } from "@mui/material";

import vedantImg from "../assets/vedant.jpg";
import cofounderImg from "../assets/cofounder.jpg";

function Team() {

  const founders = [
    {
      name: "Vedant",
      role: "Founder",
      image: vedantImg
    },
    // {
    //   name: "Pragati",
    //   role: "Co-Founder",
    //   image: cofounderImg
    // }
  ];

  return (

    <Box
      id="team"
      sx={{
        pt: 12
      }}
    >

      {/* Section title */}

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
        Founder
      </Typography>

      {/* Subtitle */}

      <Typography
        textAlign="center"
        color="text.secondary"
        sx={{
          maxWidth: 500,
          mx: "auto",
          mb: 6,
          fontSize: {
            xs: "0.9rem",
            sm: "1.1rem",
            md: "1.3rem"
          }
        }}
      >
        The person building FiSpec.
      </Typography>


      {/* Founder cards container */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",   // key requirement
          alignItems: "center",
          flexWrap: "wrap",                 // allows stacking on phones
          gap: 5
        }}
      >

        {founders.map((person, index) => (

          <Paper
            key={index}
            elevation={0}
            sx={{
              width: 320,
              py: 4,
              borderRadius: 2,
              background: "#292020",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #686868",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transform: "translateY(-4px)",
                borderColor: "#cbd5f5"
              }
            }}
          >

            {/* Image container */}

            <Box
              sx={{
                width: 275,
                height: 275,
                borderRadius: "50%",
                overflow: "hidden",
                mb: 3
              }}
            >

              <Box
                component="img"
                src={person.image}
                alt={person.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center"
                }}
              />

            </Box>

            {/* Founder name */}

            <Typography
              variant="h6"
            >
              {person.name}
            </Typography>

            {/* Founder role */}

            <Typography color="text.secondary">
              {person.role}
            </Typography>

          </Paper>

        ))}

      </Box>

    </Box>

  );

}

export default Team;