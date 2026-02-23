import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../api/client";

function History() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      if (!user) return;

      const token = await user.getIdToken();
      const result = await fetchWithAuth("/history", token);
      setHistory(result.history);
    };

    loadHistory();
  }, [user]);

  return (
    <div>
      <h2>Your History</h2>
      {history.map((item) => (
        <div key={item.id}>
          {item.product_name} — {item.final_fispec_score}
        </div>
      ))}
    </div>
  );
}

export default History;