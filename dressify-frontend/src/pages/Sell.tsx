import "./Sell.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sell() {
  const navigate = useNavigate();

  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [conditionStatus, setConditionStatus] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      brand,
      size,
      condition_status: conditionStatus, // ✅ backend expects this
      price: Number(price),
      description,
    };

    console.log("📦 Sending payload:", payload);

    try {
      const res = await fetch("/api/dresses/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      console.log("✅ Created dress:", data);

      alert("Dress published successfully!");

      // ✅ reset form
      setBrand("");
      setSize("");
      setConditionStatus("");
      setDescription("");
      setPrice("");

      // ✅ CRITICAL FIX: go back to browse so it refetches
      navigate("/browse");
    } catch (err) {
      console.error("❌ Failed to publish listing:", err);
      alert("Failed to publish listing");
    }
  };

  return (
    <div className="sell-page">
      <h1 className="sell-title">Sell a Dress</h1>
      <p className="sell-subtitle">
        List your pre-owned dress and give it a second life.
      </p>

      <form className="sell-form" onSubmit={handleSubmit}>
        {/* IMAGE (placeholder) */}
        <div className="form-group">
          <label>Dress Image</label>
          <div className="image-upload">Upload Image (coming soon)</div>
        </div>

        {/* BRAND */}
        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            required
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        {/* SIZE */}
        <div className="form-group">
          <label>Size</label>
          <select
            required
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Select size</option>
            <option>XXS</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
            <option>XXXL</option>
            <option>One Size</option>
          </select>
        </div>

        {/* CONDITION */}
        <div className="form-group">
          <label>Condition</label>
          <select
            required
            value={conditionStatus}
            onChange={(e) => setConditionStatus(e.target.value)}
          >
            <option value="">Select condition</option>
            <option>New with tags</option>
            <option>New without tags</option>
            <option>Very good</option>
            <option>Good</option>
            <option>Satisfactory</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <div className="form-group">
          <label>Describe your item</label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* PRICE */}
        <div className="form-group">
          <label>Price (€)</label>
          <input
            type="number"
            min="0"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button type="submit" className="sell-btn">
          Publish Listing
        </button>
      </form>
    </div>
  );
}

export default Sell;
