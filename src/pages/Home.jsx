import { Container, Box } from "@mui/material";

import Hero from "../sections/Hero";
import Team from "../sections/Team";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Faq from "../sections/Faq";
import Footer from "../sections/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {

  const location = useLocation();

useEffect(() => {
  if (location.hash) {
    const element = document.querySelector(location.hash);

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }, 100);
    }
  }
}, [location]);

  return (

    <Box>

      <Hero />

      <Container maxWidth="lg">

        <About />

        <Faq />

        <Team />

        <Contact />

      </Container>

      <Footer />

    </Box>

  );

}

export default Home;