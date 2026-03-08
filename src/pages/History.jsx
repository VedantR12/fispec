import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../api/client";
import { useNavigate } from "react-router-dom";

function History() {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadHistory = async () => {

      if (!user) return;

      try {

        const token = await user.getIdToken();

        const result = await fetchWithAuth("/history", token);

        setHistory(result.history || []);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    loadHistory();

  }, [user]);


  if (!user) return <p>Please login first.</p>;

  if (loading) return <p>Loading history...</p>;

  if (history.length === 0) return <p>No history yet.</p>;


  function getScoreColor(score) {

    if (score >= 7) return "#2ecc71";   // green
    if (score >= 4) return "#f1c40f";   // yellow
    return "#e74c3c";                   // red

  }

  return (

    <div style={{ padding: "20px" }}>

      <h2>Your Search History</h2>
  
      {history.map((item) => (

        <div
          key={item.barcode}
          onClick={() => navigate(`/product/${item.barcode}`)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "12px",
            cursor: "pointer",
            borderRadius: "6px",
            position: "relative"
          }}
        >

          {/* SCORE BADGE */}

          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "10px",
              background: getScoreColor(item.score),
              color: "white",
              padding: "5px 10px",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "14px"
            }}
          >
            {item.score}
          </div>


          {/* PRODUCT IMAGE */}

          <img
            src={item.image}
            alt={item.product_name}
            style={{
              width: "70px",
              height: "70px",
              objectFit: "contain",
              border: "1px solid #eee",
              borderRadius: "4px"
            }}
          />


          {/* PRODUCT TEXT */}

          <div>

            <h3 style={{ margin: 0 }}>
              {item.product_name}
            </h3>

            <p style={{ margin: "4px 0", color: "#555" }}>
              Brand: {item.brand || "Unknown"}
            </p>

          </div>

        </div>

      ))}

    </div>

  );

}

export default History;