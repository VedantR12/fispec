import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../api/client";

function SearchResults() {
  const { query } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const token = await user.getIdToken();

        const result = await fetchWithAuth(
          `/search-products?q=${encodeURIComponent(query)}`,
          token
        );

        setResults(result.results || []);
      } catch (err) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, user]);

  if (!user) return <p>Please login first.</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (results.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div>

      <h2>Search Results for "{query}"</h2>

      {results.map((product) => (
        <div
          key={product.barcode}
          onClick={() => navigate(`/product/${product.barcode}`)}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer"
          }}
        >
          <h3>{product.product_name}</h3>
          <p>Brand: {product.brand || "N/A"}</p>
          <p>Categories: {product.categories || "N/A"}</p>
        </div>
      ))}

    </div>
  );
}

export default SearchResults;