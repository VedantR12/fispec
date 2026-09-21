import { shouldUseNativeScanner, scanNativeBarcode, } from "../services/scanner";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import BarcodeScanner from "./BarcodeScanner";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Paper, TextField, Box, Stack, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

function Navbar() {

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const searchRef = useRef(null);
  const scannerRef = useRef(null);
  const navbarRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [nativeScannerBusy, setNativeScannerBusy] = useState(false);

  const name =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "User";

  const initial = name.charAt(0).toUpperCase();


  useEffect(() => {

    // close search UI when navigating
    setSearchOpen(false);
    setSuggestions([]);
    setQuery("");

  }, [location.pathname]);

  // SEARCH
  const handleSearch = () => {

    if (!query.trim()) return;

    navigate(`/search/${encodeURIComponent(query)}`);

    setSearchOpen(false);
    setSuggestions([]);

  };



  const handleScanSuccess = (barcode) => {

  setScannerOpen(false);

  navigate(`/product/${barcode}`, { replace: false });
};

  const openScanner = async () => {

  if (nativeScannerBusy) {
    return;
  }

  setSearchOpen(false);
  setQuery("");
  setSuggestions([]);

  if (shouldUseNativeScanner()) {

    setNativeScannerBusy(true);

    try {

      const barcode = await scanNativeBarcode();

      if (barcode) {
        handleScanSuccess(barcode);
      }

    } catch (err) {

      console.error(err);

    } finally {

      setNativeScannerBusy(false);

    }

    return;
  }

  setScannerOpen(true);

};

  const fetchSuggestions = async (value) => {

    setQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {

      const response = await fetch(
        `${API_BASE}/suggest?q=${encodeURIComponent(value)}`
      );

      const data = await response.json();

      setSuggestions(data.suggestions || []);

    } catch (error) {

      console.log(error);

    }

  };



  useEffect(() => {

    const handleClickOutside = (event) => {

      // If click is inside navbar, do nothing
      if (navbarRef.current && navbarRef.current.contains(event.target)) {
        return;
      }


      if (scannerOpen) {
        return;
      }

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setQuery("");
        setSuggestions([]);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [scannerOpen]);

  useEffect(() => {
    const handleOpenScanner = async () => {
  await openScanner();
};

    window.addEventListener("fispec:open-scanner", handleOpenScanner);

    return () => {
      window.removeEventListener("fispec:open-scanner", handleOpenScanner);
    };
  }, []);

  return (

    <>

      {/* NAVBAR */}

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(10,12,11,0.85)",
          backdropFilter: "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "none"
        }}
        ref={navbarRef}
      >

        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >

          {/* USER AVATAR */}

          <Avatar
            sx={{
              cursor: "pointer",
              width: 36,
              height: 36,
              fontSize: "0.85rem",
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              background: "var(--accent-dim)",
              color: "var(--accent)",
              border: "1px solid rgba(74,222,128,0.2)",
              transition: "all 0.2s var(--ease-out)",
              "&:hover": {
                background: "var(--accent)",
                color: "var(--text-inverse)",
                transform: "scale(1.05)"
              }
            }}
            onClick={() => setSidebarOpen(true)}
          >
            {initial}
          </Avatar>


          <Box
            onClick={() => navigate("/")}
            sx={{
              cursor: "pointer",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              gap: 1
            }}
          >
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: "6px",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10V4.5L6 2L10 4.5V10" stroke="#0a0c0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.5 10V7H7.5V10" stroke="#0a0c0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Box>
            <Typography

              onClick={() => navigate("/")}
              sx={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.95rem",
                letterSpacing: "0.12em",
                color: "var(--text-primary)"
              }}
            >
              FISPEC
            </Typography>

          </Box>
          {/* ACTION BUTTONS */}

          <Stack direction="row" spacing={1}>

            <IconButton
              onClick={(e) => {

                e.stopPropagation();

                setScannerOpen(false);

                if (searchOpen) {
                  setQuery("");
                  setSuggestions([]);
                }

                setSearchOpen((prev) => !prev);


              }}
              sx={{
                width: 36,
                height: 36,
                background: searchOpen ? "var(--accent-dim)" : "transparent",
                color: searchOpen ? "var(--accent)" : "var(--text-secondary)"
              }}
            >
              <SearchIcon />
            </IconButton>

            <IconButton
              id="navbar-scan-button"
              onClick={async (e) => {

    e.stopPropagation();

    await openScanner();

}}

              sx={{
                width: 36,
                height: 36,
                background: scannerOpen ? "var(--accent-dim)" : "transparent",
                color: scannerOpen ? "var(--accent)" : "var(--text-secondary)"
              }}
            >
              <CameraAltIcon />
            </IconButton>

          </Stack>

        </Toolbar>

      </AppBar>


      {/* SEARCH BAR */}

      {searchOpen && (

        <Box
          ref={searchRef}
          sx={{
            p: 2,
          }}
        >

          <Paper
            elevation={0}
            sx={{
              px: { xs: 2, sm: 3 },
              py: 1.5,
              background: "rgba(10,12,11,0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              animation: "fadeUp 0.2s var(--ease-out)",
              position: "sticky",
              top: 56,
              zIndex: 1099
            }}
          >

            <TextField
              fullWidth
              placeholder="Search product..."
              value={query}
              onChange={(e) => fetchSuggestions(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}

              variant="standard"
              InputProps={{
                disableUnderline: true,
                endAdornment: query.trim() ? (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}
                      size="small"
                    >
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null
              }}
            />

          </Paper>


          {/* SUGGESTIONS */}

          {query && suggestions.length > 0 && (

            <Paper
              sx={{
                mt: 1.5,
                maxHeight: 320,
                overflowY: "auto",
                background: "var(--bg-card)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-md)",
                animation: "fadeUp 0.15s var(--ease-out)"
              }}
            >

              {suggestions.map((item) => (

                <Box
                  key={item.barcode}
                  onClick={() => {

                    navigate(`/product/${item.barcode}`);

                    setSuggestions([]);
                    setSearchOpen(false);

                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1.5,
                    cursor: "pointer",
                    borderBottom: "1px solid #474747",
                    "&:hover": {
                      background: "#414141"
                    }
                  }}
                >

                  <img
                    src={item.image || "https://via.placeholder.com/40"}
                    alt={item.product_name}
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      marginRight: 10
                    }}
                  />

                  <Box>

                    <Typography fontWeight={600}>
                      {item.product_name}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      {item.brand || "Unknown Brand"}
                    </Typography>

                  </Box>

                </Box>

              ))}

            </Paper>

          )}

        </Box>

      )}


      {/* SIDEBAR */}

      {sidebarOpen && (
        <Sidebar close={() => setSidebarOpen(false)} />
      )}


      {/* BARCODE SCANNER */}

      {scannerOpen && (
        <div ref={scannerRef}>
          <BarcodeScanner
            onScanSuccess={handleScanSuccess}
            closeScanner={() => setScannerOpen(false)}
          />
        </div>
      )}

    </>

  );

}

export default Navbar;