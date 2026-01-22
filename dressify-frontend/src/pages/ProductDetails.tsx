import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/dresses/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Dress not found");
        return res.json();
      })
      .then((data) => {
        setProduct({
          ...data,
          condition: data.condition_status,
          price: Number(data.price),
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load product:", err);
        setLoading(false);
      });
  }, [id]);

  // ✅ Handle Buy Now with auth check
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      alert("You need to register or login to buy a dress");
      navigate("/login");
      return;
    }
    navigate("/checkout", { state: product });
  };

  if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;
  if (!product) return <p style={{ padding: "40px" }}>Product not found.</p>;

  return (
    <div className="product-details">
      <div className="details-container">
        {/* LEFT */}
        <div className="images">
          {product.image_url ? (
            <img
              src={`http://127.0.0.1:8000${product.image_url}`}
              alt={product.brand}
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
                borderRadius: "16px",
                marginBottom: "20px"
              }}
            />
          ) : (
            <div className="main-image">No Image</div>
          )}
        </div>

        {/* RIGHT */}
        <div className="info">
          <h1>{product.brand} Dress</h1>
          <p className="price">€{product.price}</p>

          <div className="meta">
            <p><strong>Size:</strong> {product.size}</p>
            <p><strong>Condition:</strong> {product.condition}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
          </div>

          <p className="description">{product.description}</p>

          <div className="actions">
            {/* BACK */}
            <button
              className="btn secondary"
              onClick={() => navigate("/browse")}
            >
              ← Back to Browse
            </button>

            {/* MESSAGE SELLER (placeholder) */}
            <button
              className="btn secondary"
              onClick={() => alert("Messaging coming soon 👀")}
            >
              Message Seller
            </button>

            {/* BUY NOW - with auth check */}
            <button
              className="btn primary"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;