import "./Checkout.css";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Checkout() {
  const location = useLocation();
  const product = location.state as any;

  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "apple" | "paypal" | "cash"
  >("card");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="checkout-page">
        <h1 className="checkout-title">Checkout</h1>
        <p>You must select a dress before checkout.</p>
        <Link to="/browse" className="confirm-btn">
          Go to Browse
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-card">
        {/* SUMMARY */}
        <div className="checkout-summary">
          <h3>{product.brand} Dress</h3>
          <p>Size: {product.size}</p>
          <p className="price">€{product.price}</p>
        </div>

        {/* PAYMENT METHOD */}
        <div className="payment-section">
          <h4>Select Payment Method</h4>

          <label>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            Credit / Debit Card
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="apple"
              checked={paymentMethod === "apple"}
              onChange={() => setPaymentMethod("apple")}
            />
            Apple Pay
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={() => setPaymentMethod("paypal")}
            />
            PayPal
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            Cash on Delivery
          </label>
        </div>

        {/* CONDITIONAL UI */}
        {paymentMethod === "card" && (
          <div className="payment-details">
            <h4>Card Details</h4>
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="MM / YY" />
            <input type="text" placeholder="CVC" />
          </div>
        )}

        {paymentMethod === "apple" && (
          <div className="payment-details">
            <h4>Apple Pay</h4>
            <p>
              You will securely confirm the payment using Apple Pay on your
              device.
            </p>
          </div>
        )}

        {paymentMethod === "paypal" && (
          <div className="payment-details">
            <h4>PayPal</h4>
            <p>You will be redirected to PayPal to complete your purchase.</p>
          </div>
        )}

        {paymentMethod === "cash" && (
          <div className="payment-details">
            <h4>Cash on Delivery</h4>
            <p>You will pay when the dress is delivered.</p>
          </div>
        )}

        {/* CONFIRM */}
        <button className="confirm-btn">
          {paymentMethod === "paypal"
            ? "Continue to PayPal"
            : paymentMethod === "apple"
            ? "Pay with Apple Pay"
            : paymentMethod === "cash"
            ? "Place Order"
            : "Confirm Purchase"}
        </button>

        <Link to="/browse" className="cancel-link">
          Cancel and return to browse
        </Link>
      </div>
    </div>
  );
}

export default Checkout;
