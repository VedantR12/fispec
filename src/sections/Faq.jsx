import { useState, useRef, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


function FAQ() {

  const [openIndex, setOpenIndex] = useState(null);
  const faqRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (faqRef.current && !faqRef.current.contains(event.target)) {
        setOpenIndex(null);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  const faqs = [
    {
      question: "What is FiSpec?",
      answer:
        "FiSpec analyzes packaged food products by examining ingredients, additives, and nutrition values so consumers can understand what they are eating."
    },
    {
      question: "How does the barcode scanner work?",
      answer:
        "You can scan a product barcode using your phone camera. FiSpec retrieves product information and analyzes ingredients instantly."
    },
    {
      question: "Where does FiSpec get its data?",
      answer:
        "FiSpec uses trusted public food databases and product information sources to evaluate ingredients and additives."
    },
    {
      question: "Is FiSpec biased toward any brands?",
      answer:
        "No. FiSpec provides analysis based only on ingredient and nutrition information. It does not favor any brand."
    },
    {
      question: "Do I need an account to use FiSpec?",
      answer:
        "You can explore the website without logging in, but an account allows you to scan products and save your history."
    },
    {
      question: "Is FiSpec free to use?",
      answer:
        "Yes. FiSpec is designed to improve transparency in packaged food and is free for consumers."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (

    <Box ref={faqRef}>

      <Container maxWidth="lg"
        sx={{
          pt: 6,
          px: { xs: 0, sm: 2 }
        }}>

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
          Frequently Asked Questions
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          sx={{
            mb: 8,
            fontSize: {
              xs: "0.9rem",
              sm: "1.1rem",
              md: "1.3rem"
            }
          }}
        >
          Common questions about FiSpec and how it works.
        </Typography>

        {faqs.map((faq, index) => (

          <Box
            key={index}
            onClick={() => toggleFAQ(index)}
            sx={{
              mb: 2,
              border: "1px solid #686868",
              background: "#212121",
              borderRadius: 1.5,
              cursor: "pointer",
              transition: "all 0.25s ease",
              "&:hover": {
                borderColor: "#cbd5f5"
              }
            }}
          >

            {/* QUESTION */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 3,

              }}
            >

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

                {/* Q badge */}

                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: 1,
                    background: "#2563eb",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                  }}
                >
                  Q
                </Box>

                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1.1rem",
                      md: "1.3rem"
                    }
                  }}>
                  {faq.question}
                </Typography>

              </Box>

              <ExpandMoreIcon
                sx={{
                  transform:
                    openIndex === index
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  transition: "0.3s",
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1.1rem",
                    md: "1.3rem"
                  }
                }}
              />

            </Box>


            {/* ANSWER */}

            {openIndex === index && (

              <Box
                sx={{
                  px: 3,
                  pb: 3,
                }}
              >

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
                  {faq.answer}
                </Typography>

              </Box>

            )}

          </Box>

        ))}

      </Container>

    </Box>

  );

}

export default FAQ;