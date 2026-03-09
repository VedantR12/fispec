import { Container, Box } from "@mui/material";

import Hero from "../sections/Hero";
import Team from "../sections/Team";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Faq from "../sections/Faq";
import Footer from "../sections/Footer";

function Home() {

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