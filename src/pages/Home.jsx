import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BarcodeScanner from "../components/BarcodeScanner";

function Home() {
  const [query, setQuery] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search/${encodeURIComponent(query.trim())}`);
  };

  const handleScanSuccess = (barcode) => {
    setShowScanner(false);
    navigate(`/search/${barcode}`);
  };

  return (
    <div>
      <h2>Search Product</h2>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter product name or barcode"
      />

      <button onClick={handleSearch}>
        Search
      </button>

      <hr />

      <button onClick={() => setShowScanner(true)}>
        Scan Barcode
      </button>

      {showScanner && (
        <BarcodeScanner onScanSuccess={handleScanSuccess} />
      )}
    </div>
  );
}

export default Home;