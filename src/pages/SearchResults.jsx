import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../api/client";

function SearchResults() {
  const { query } = useParams();
  const { user } = useAuth();

  const [data, setData] = useState(null);
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
          `/search?q=${encodeURIComponent(query)}`,
          token
        );

        setData(result);
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
  if (!data) return <p>No data found</p>;

  if (data.error) {
    return <p>{data.error}</p>;
  }

  const product = data.product_details || {};
  const analysis = data.analysis || {};
  const nutrition = analysis.nutrition_breakdown || {};
  const additives = analysis.additives_analysis || [];
  const engineNotes = data.engine_notes || [];

  return (
    <div>

      {/* PRODUCT DETAILS */}
      <h2>{product.product_name || "Unknown Product"}</h2>
      <p><strong>Brand:</strong> {product.brand || "N/A"}</p>
      <p><strong>Barcode:</strong> {product.barcode || "N/A"}</p>
      <p><strong>Quantity:</strong> {product.quantity || "N/A"}</p>
      <p><strong>Categories:</strong> {product.categories || "N/A"}</p>

      <hr />

      {/* SCORES */}
      <h3>Scores</h3>
      <p><strong>Final FiSpec:</strong> {data.final_fispec_score ?? "N/A"}</p>
      <p>Engine Score: {data.engine_fispec_score ?? "N/A"}</p>
      <p>LLM Score: {data.llm_fispec_score ?? "N/A"}</p>

      <hr />

      {/* SUMMARY */}
      <h3>Summary</h3>
      <p>{analysis.summary?.one_line || "No summary available."}</p>

      <hr />

      {/* NUTRITION BREAKDOWN */}
      <h3>Nutrition Breakdown</h3>
      {Object.keys(nutrition).length > 0 ? (
        Object.entries(nutrition).map(([key, item]) => (
          <div key={key}>
            <strong>{key.toUpperCase()}</strong>:{" "}
            {item.value ?? "N/A"} {item.unit || ""}
            <br />
            <small>{item.impact}</small>
            <br /><br />
          </div>
        ))
      ) : (
        <p>No nutrition data available.</p>
      )}

      <hr />

      {/* ADDITIVES */}
      <h3>Additives Analysis</h3>
      {additives.length > 0 ? (
        additives.map((add, index) => (
          <div key={index}>
            <strong>{add.name}</strong>
            <p>Code: {add.code || "Not disclosed"}</p>
            <p>Purpose: {add.why_used}</p>
            <p>Disclosure: {add.disclosure}</p>
            <p>Confidence: {add.confidence}</p>
            <br />
          </div>
        ))
      ) : (
        <p>No additives detected.</p>
      )}

      <hr />

      {/* ENGINE NOTES */}
      <h3>Engine Notes</h3>
      {engineNotes.length > 0 ? (
        <ul>
          {engineNotes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      ) : (
        <p>No engine notes available.</p>
      )}

    </div>
  );
}

export default SearchResults;