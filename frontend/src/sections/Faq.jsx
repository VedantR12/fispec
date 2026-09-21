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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const faqs = [
    { question: "What is FiSpec?", answer: "FiSpec analyzes packaged food products by examining ingredients, additives, and nutrition values so consumers can understand what they are eating." },
    { question: "How does the barcode scanner work?", answer: "You can scan a product barcode using your phone camera. FiSpec retrieves product information and analyzes ingredients instantly." },
    { question: "Where does FiSpec get its data?", answer: "FiSpec uses trusted public food databases and product information sources to evaluate ingredients and additives." },
    { question: "Is FiSpec biased toward any brands?", answer: "No. FiSpec provides analysis based only on ingredient and nutrition information. It does not favor any brand." },
    { question: "Do I need an account to use FiSpec?", answer: "You can explore the website without logging in, but an account allows you to scan products and save your history." },
    { question: "Is FiSpec free to use?", answer: "Yes. FiSpec is designed to improve transparency in packaged food and is free for consumers." }
  ];

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <Box ref={faqRef} sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>

        {/* Section label */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Box sx={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent)",
            letterSpacing: "0.12em", background: "var(--accent-dim)",
            border: "1px solid rgba(74,222,128,0.2)", borderRadius: "var(--radius-pill)", px: 1.5, py: 0.4
          }}>
            FAQ
          </Box>
        </Box>

        <Typography variant="h2" textAlign="center"
          sx={{ fontSize: { xs: "2rem", sm: "2.8rem", md: "3.8rem" }, mb: 2 }}>
          Questions, answered
        </Typography>

        <Typography textAlign="center" sx={{
          mb: { xs: 5, md: 8 }, color: "var(--text-secondary)",
          fontSize: { xs: "0.9rem", sm: "1.05rem" }
        }}>
          Common questions about FiSpec and how it works.
        </Typography>

        <Box sx={{ maxWidth: 720, mx: "auto" }}>
          {faqs.map((faq, index) => (
            <Box
              key={index}
              onClick={() => toggleFAQ(index)}
              sx={{
                mb: 1.5,
                border: "1px solid",
                borderColor: openIndex === index ? "rgba(74,222,128,0.25)" : "var(--border-default)",
                background: openIndex === index ? "rgba(74,222,128,0.04)" : "var(--bg-card)",
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
                transition: "all 0.2s var(--ease-out)",
                overflow: "hidden",
                "&:hover": { borderColor: "rgba(74,222,128,0.2)", background: "var(--bg-hover)" }
              }}
            >
              {/* Question row */}
              <Box sx={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", p: { xs: 2, sm: 2.5 }
              }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{
                    width: 26, height: 26, borderRadius: "var(--radius-sm)",
                    background: openIndex === index ? "var(--accent)" : "var(--accent-dim)",
                    color: openIndex === index ? "var(--text-inverse)" : "var(--accent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.7rem", fontFamily: "var(--font-mono)", fontWeight: 500,
                    transition: "all 0.2s ease", flexShrink: 0
                  }}>
                    Q
                  </Box>
                  <Typography sx={{
                    fontSize: { xs: "0.875rem", sm: "0.95rem" },
                    fontWeight: 500, color: "var(--text-primary)", fontFamily: "var(--font-body)"
                  }}>
                    {faq.question}
                  </Typography>
                </Box>
                <ExpandMoreIcon sx={{
                  transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s var(--ease-out)",
                  color: "var(--text-tertiary)", fontSize: 20, flexShrink: 0, ml: 1
                }} />
              </Box>

              {/* Answer */}
              {openIndex === index && (
                <Box sx={{ px: { xs: 2, sm: 2.5 }, pb: 2.5, animation: "fadeUp 0.2s var(--ease-out)" }}>
                  <Box sx={{ pl: "42px" }}>
                    <Typography sx={{
                      color: "var(--text-secondary)", fontSize: "0.9rem",
                      lineHeight: 1.75, fontFamily: "var(--font-body)"
                    }}>
                      {faq.answer}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Box>

      </Container>
    </Box>
  );
}

export default FAQ;
