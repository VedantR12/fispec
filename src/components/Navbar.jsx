import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import BarcodeScanner from "./BarcodeScanner";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Paper, TextField, Box, Stack, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

function Navbar() {

  const { user } = useAuth();
  const navigate = useNavigate();

  const searchRef = useRef(null);
  const scannerRef = useRef(null);
  const navbarRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const name =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "User";

  const initial = name.charAt(0).toUpperCase();

  // SEARCH
  const handleSearch = () => {

    if (!query.trim()) return;

    navigate(`/search/${encodeURIComponent(query)}`);

    setSearchOpen(false);
    setSuggestions([]);

  };


  // BARCODE SUCCESS
  const handleScanSuccess = (barcode) => {

    setScannerOpen(false);

    navigate(`/product/${barcode}`);

  };


  // FETCH SUGGESTIONS
  const fetchSuggestions = async (value) => {

    setQuery(value);

    // if input cleared, remove suggestions immediately
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


  // CLICK OUTSIDE HANDLER
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (navbarRef.current && navbarRef.current.contains(event.target)) {
        return;
      }

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setQuery("");
        setSuggestions([]);
      }

      if (scannerRef.current && !scannerRef.current.contains(event.target)) {
        setScannerOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);


  return (

    <>

      {/* NAVBAR */}

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "#212121",
          borderBottom: "1px solid #e5e7eb"
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
              color: "white",
              background: "purple"
            }}
            onClick={() => setSidebarOpen(true)}
          >
            {initial}
          </Avatar>


          {/* BRAND */}

          <Typography
            variant="h6"
            fontWeight={100}
            sx={{ color: "#ffffff" }}
          >
            FISPEC
          </Typography>


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
            >
              <SearchIcon />
            </IconButton>

            <IconButton
              id="navbar-scan-button"
              onClick={(e) => {

                e.stopPropagation();

                setSearchOpen(false);
                setScannerOpen((prev) => !prev);

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
              p: 1,
              border: "1px solid #e5e5e5"
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
                mt: 1,
                maxHeight: 300,
                overflowY: "auto"
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