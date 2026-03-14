import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import BarcodeScanner from "./BarcodeScanner";
import {
  AppBar, Toolbar, Typography, IconButton,
  Avatar, Paper, TextField, Box, Stack, InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const searchRef   = useRef(null);
  const scannerRef  = useRef(null);
  const navbarRef   = useRef(null);
  const inputRef    = useRef(null);

  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [searchOpen, setSearchOpen]     = useState(false);
  const [scannerOpen, setScannerOpen]   = useState(false);
  const [query, setQuery]               = useState("");
  const [suggestions, setSuggestions]   = useState([]);

  const name    = user?.displayName || user?.email?.split("@")[0] || "User";
  const initial = name.charAt(0).toUpperCase();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search/${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setSuggestions([]);
    setQuery("");
  };

  const handleScanSuccess = (barcode) => {
    setScannerOpen(false);
    navigate(`/product/${barcode}`);
  };

  const fetchSuggestions = async (value) => {
    setQuery(value);
    if (!value.trim() || value.length < 2) { setSuggestions([]); return; }
    try {
      const response = await fetch(`${API_BASE}/suggest?q=${encodeURIComponent(value)}`);
      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) { console.log(error); }
  };

  // Auto-focus input when search opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  // Listen for hero CTA "Scan Now" button
  useEffect(() => {
    const handleOpenScanner = () => {
      setSearchOpen(false);
      setScannerOpen(true);
    };
    window.addEventListener("fispec:open-scanner", handleOpenScanner);
    return () => window.removeEventListener("fispec:open-scanner", handleOpenScanner);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && navbarRef.current.contains(event.target)) return;
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ── NAVBAR ── */}
      <AppBar
        position="sticky"
        elevation={0}
        ref={navbarRef}
        sx={{
          background: "rgba(10,12,11,0.85)",
          backdropFilter: "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "none"
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: { xs: 2, sm: 3 } }}>

          {/* USER AVATAR */}
          <Avatar
            onClick={() => setSidebarOpen(true)}
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
          >
            {initial}
          </Avatar>

          {/* BRAND */}
          <Box
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer", userSelect: "none", display: "flex", alignItems: "center", gap: 1 }}
          >
            {/* Logo mark */}
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
                <path d="M2 10V4.5L6 2L10 4.5V10" stroke="#0a0c0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.5 10V7H7.5V10" stroke="#0a0c0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Box>
            <Typography
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
          <Stack direction="row" spacing={0.5}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setScannerOpen(false);
                if (searchOpen) { setQuery(""); setSuggestions([]); }
                setSearchOpen((prev) => !prev);
              }}
              sx={{
                width: 36, height: 36,
                background: searchOpen ? "var(--accent-dim)" : "transparent",
                color: searchOpen ? "var(--accent)" : "var(--text-secondary)"
              }}
            >
              <SearchIcon fontSize="small" />
            </IconButton>

            <IconButton
              id="navbar-scan-button"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setSearchOpen(false);
                setScannerOpen((prev) => !prev);
              }}
              sx={{
                width: 36, height: 36,
                background: scannerOpen ? "var(--accent-dim)" : "transparent",
                color: scannerOpen ? "var(--accent)" : "var(--text-secondary)"
              }}
            >
              <CameraAltIcon fontSize="small" />
            </IconButton>
          </Stack>

        </Toolbar>
      </AppBar>

      {/* ── SEARCH BAR ── */}
      {searchOpen && (
        <Box
          ref={searchRef}
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
          {/* Input */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              background: "var(--bg-elevated)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "var(--radius-lg)",
              px: 2,
              py: 0.75,
              transition: "border-color 0.2s",
              "&:focus-within": {
                borderColor: "var(--accent)",
                boxShadow: "0 0 0 3px var(--accent-dim)"
              }
            }}
          >
            <SearchIcon sx={{ color: "var(--text-tertiary)", fontSize: 18 }} />
            <TextField
              inputRef={inputRef}
              fullWidth
              placeholder="Search any packaged food product..."
              value={query}
              onChange={(e) => fetchSuggestions(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleSearch(); } }}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--text-primary)",
                  "& input::placeholder": { color: "var(--text-tertiary)" }
                }
              }}
            />
            {query.trim() && (
              <IconButton
                size="small"
                onClick={() => { setQuery(""); setSuggestions([]); inputRef.current?.focus(); }}
                sx={{ color: "var(--text-tertiary)", p: 0.25 }}
              >
                <CloseIcon sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Box>

          {/* SUGGESTIONS */}
          {query && suggestions.length > 0 && (
            <Paper
              elevation={0}
              sx={{
                mt: 1.5,
                maxHeight: 320,
                overflowY: "auto",
                background: "var(--bg-card)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
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
                    setQuery("");
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 2,
                    py: 1.25,
                    cursor: "pointer",
                    borderBottom: "1px solid var(--border-subtle)",
                    transition: "background 0.15s",
                    "&:last-child": { borderBottom: "none" },
                    "&:hover": { background: "var(--bg-hover)" }
                  }}
                >
                  {/* Thumbnail */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "var(--radius-sm)",
                      background: "var(--bg-elevated)",
                      overflow: "hidden",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/40"}
                      alt={item.product_name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        color: "var(--text-primary)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {item.product_name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "0.75rem", color: "var(--text-tertiary)", mt: 0.25 }}
                    >
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
      {sidebarOpen && <Sidebar close={() => setSidebarOpen(false)} />}

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
