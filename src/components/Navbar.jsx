import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import BarcodeScanner from "./BarcodeScanner";
import { Search, Camera } from "lucide-react";

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


  // SEARCH BUTTON CLICK
  const handleSearch = () => {

    if (!query.trim()) return;

    navigate(`/search/${encodeURIComponent(query)}`);

    setSearchOpen(false);
    setSuggestions([]);

  };


  // BARCODE SCAN SUCCESS
  const handleScanSuccess = (barcode) => {

    setScannerOpen(false);

    navigate(`/product/${barcode}`);

  };


  // FETCH SUGGESTIONS
  const fetchSuggestions = async (value) => {

    setQuery(value);

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

      // Ignore clicks inside navbar
      if (navbarRef.current && navbarRef.current.contains(event.target)) {
        return;
      }

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
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

      <nav ref={navbarRef}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "h6px 20px",
          borderBottom: "1px solid #ddd"
        }}
      >

        {/* ACCOUNT */}

        <div
          onClick={() => setSidebarOpen(true)}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#333",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          {initial}
        </div>


        {/* BRAND */}

        <h2 style={{ margin: 0 }}>FISPEC</h2>


        {/* ACTIONS */}

        <div style={{ display: "flex", gap: "20px" }}>

          <Search
            size={22}
            style={{ cursor: "pointer" }}
            onClick={(e) => {

              e.stopPropagation();

              setScannerOpen(false);
              setSearchOpen((prev) => !prev);

            }}
          />

          <Camera
            size={22}
            style={{ cursor: "pointer" }}
            onClick={(e) => {

              e.stopPropagation();

              setSearchOpen(false);
              setScannerOpen((prev) => !prev);

            }}
          />

        </div>

      </nav>



      {/* SEARCH BAR */}

      {searchOpen && (

        <div
          ref={searchRef}
          style={{
            padding: "10px",
            borderBottom: "1px solid #ddd",
            position: "relative"
          }}
        >

          <input
            value={query}
            onChange={(e) => fetchSuggestions(e.target.value)}
            placeholder="Search product..."
            style={{
              width: "100%",
              padding: "8px"
            }}
          />


          {/* SUGGESTIONS */}

          {suggestions.length > 0 && (

            <div
              style={{
                border: "1px solid #ddd",
                background: "#fff",
                marginTop: "5px",
                maxHeight: "300px",
                overflowY: "auto"
              }}
            >

              {suggestions.map((item) => (

                <div
                  key={item.barcode}
                  onClick={() => {

                    navigate(`/product/${item.barcode}`);

                    setSuggestions([]);
                    setSearchOpen(false);

                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee"
                  }}
                >

                  <img
                    src={item.image || "https://via.placeholder.com/40"}
                    alt={item.product_name}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      marginRight: "10px"
                    }}
                  />

                  <div>

                    <div style={{ fontWeight: "bold" }}>
                      {item.product_name}
                    </div>

                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {item.brand || "Unknown Brand"}
                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}


          <button
            onClick={handleSearch}
            style={{ marginTop: "5px" }}
          >
            Search
          </button>

        </div>

      )}



      {/* SIDEBAR */}

      {sidebarOpen && (
        <Sidebar close={() => setSidebarOpen(false)} />
      )}



      {/* BARCODE SCANNER */}

      {scannerOpen && (
        <div ref={scannerRef}>
          <BarcodeScanner onScanSuccess={handleScanSuccess} 
          closeScanner={() => setScannerOpen(false)}
          />
        </div>
      )}

    </>

  );

}

export default Navbar;