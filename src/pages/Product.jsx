import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../api/client";

function Product() {

  const { barcode } = useParams();
  const { user } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchProduct = async () => {

      if (!user) return;

      try {

        const token = await user.getIdToken();

        const result = await fetchWithAuth(
          `/search?q=${barcode}`,
          token
        );

        setData(result);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [barcode, user]);

  if (!user) return <p>Please login first.</p>;
  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No product found</p>;

  const product = data.product_details;
  

  return (

    <div style={{ padding: "20px" }}>

      <h2>{product.product_name}</h2>

      <p><b>Brand:</b> {product.brand}</p>

      <p><b>Barcode:</b> {product.barcode}</p>

      <p><b>Categories:</b> {product.categories}</p>

      <hr/>

      <h3>FiSpec Score</h3>

      <p>{data.final_fispec_score}</p>

      <h3>Summary</h3>

      <p>{data.analysis.summary.one_line}</p>

    </div>

  );

}

export default Product;