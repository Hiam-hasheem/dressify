import "./Home.css";
import DressCard from "../components/DressCard";
import { dresses } from "../data/dresses";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

function Home() {
  const location = useLocation();

  // 🔴 FIX: scroll AFTER navigation
  useEffect(() => {
    if (location.hash === "#how-it-works") {
      const section = document.getElementById("how-it-works");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-container">
          <h1 className="brand-title">DRESSIFY</h1>
          <p className="brand-tagline">
            Give your dresses a second life.
          </p>

          <div className="hero-buttons">
            <a className="btn primary" href="/browse">
              Browse Dresses
            </a>

            {/* ✅ ONLY CHANGE IS HERE */}
            <Link to="/sell" className="btn secondary">
              Sell a Dress
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured">
        <h2 className="section-title">Featured Dresses</h2>

        <div className="dress-grid">
          {dresses.slice(0, 3).map((dress) => (
            <DressCard key={dress.id} dress={dress} />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <div className="how-container">
          <h2 className="section-title light">How It Works</h2>

          <div className="flows">
            {/* BUYERS */}
            <div className="flow-card">
              <h3>For Buyers</h3>

              <div className="flow-step">
                <span>01</span>
                <div>
                  <h4>Browse</h4>
                  <p>Discover dresses you’ll love</p>
                </div>
              </div>

              <div className="flow-step">
                <span>02</span>
                <div>
                  <h4>Chat</h4>
                  <p>Ask questions and agree safely</p>
                </div>
              </div>

              <div className="flow-step">
                <span>03</span>
                <div>
                  <h4>Buy</h4>
                  <p>Pay securely and receive your item</p>
                </div>
              </div>
            </div>

            {/* SELLERS */}
            <div className="flow-card">
              <h3>For Sellers</h3>

              <div className="flow-step">
                <span>01</span>
                <div>
                  <h4>List</h4>
                  <p>Upload items you no longer wear</p>
                </div>
              </div>

              <div className="flow-step">
                <span>02</span>
                <div>
                  <h4>Chat</h4>
                  <p>Communicate safely with buyers</p>
                </div>
              </div>

              <div className="flow-step">
                <span>03</span>
                <div>
                  <h4>Sell</h4>
                  <p>Ship your item and get paid</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}




export default Home;
