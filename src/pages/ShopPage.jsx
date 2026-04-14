import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ShopPage.css";

export default function ShopPage() {
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [stockBillOpen, setStockBillOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const openLogout = () => setLoginOpen(true);

  const tryLogin = () => {
    if (username === "admin" && password === "1234") {
      setLoginOpen(false);
      setStockBillOpen(true);
    } else {
      window.alert("Invalid credentials");
    }
  };

  return (
    <div className="page-shop">
      <div id="homeSymbol">
        <Link to="/" title="Go to Home">
          <i className="fas fa-home" />
        </Link>
      </div>

      <section id="HomePageSection">
        <img
          id="logoImage"
          src="/img/logo.png"
          alt="Logo"
        />
        <div id="slogan">Works & Sales</div>
        <div id="materialsHeading">Materials We Sell</div>
        <div id="materialsList">
          <ul>
            <li>
              <img
                src="/Interiors/falseceilingmaterial.jpeg"
                alt="False Ceiling Materials"
              />
              False Ceiling Materials
            </li>
            <li>
              <img src="/Interiors/popmaterial.jpeg" alt="POP Materials" /> POP
              Materials
            </li>
            <li>
              <img
                src="/Interiors/hardwarematerail.jpeg"
                alt="Hardware Materials"
              />
              Hardware Materials
            </li>
          </ul>
        </div>
        <div id="socialMedia">
          <a
            href="https://wa.me/+919177563298"
            className="socialMediaIcon"
            title="WhatsApp"
          >
            <i className="fab fa-whatsapp" />
          </a>
          <button
            type="button"
            className="socialMediaIcon"
            id="phoneIcon"
            title="Phone"
            onClick={() => setContactOpen((v) => !v)}
          >
            <i className="fas fa-phone" />
          </button>
        </div>
      </section>

      <div
        id="logoutIcon"
        title="Staff login"
        role="button"
        tabIndex={0}
        onClick={openLogout}
        onKeyDown={(e) => e.key === "Enter" && openLogout()}
      >
        <i className="fas fa-sign-out-alt" />
      </div>

      {contactOpen && (
        <div id="contactNumbers">
          <p>Contact Numbers</p>
          <p>+91 91775 63298</p>
          <p>+91 98765 43210</p>
        </div>
      )}

      {loginOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setLoginOpen(false)}
        >
          <div
            id="loginBox"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="close-btn"
              role="button"
              tabIndex={0}
              onClick={() => setLoginOpen(false)}
              onKeyDown={(e) => e.key === "Enter" && setLoginOpen(false)}
            >
              &times;
            </span>
            <h2 id="login-title">Login</h2>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button type="button" id="loginButton" onClick={tryLogin}>
              Login
            </button>
          </div>
        </div>
      )}

      {stockBillOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setStockBillOpen(false)}
        >
          <div
            id="stockBillBox"
            role="dialog"
            aria-modal="true"
            aria-labelledby="stock-bill-title"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="close-btn"
              role="button"
              tabIndex={0}
              onClick={() => setStockBillOpen(false)}
              onKeyDown={(e) => e.key === "Enter" && setStockBillOpen(false)}
            >
              &times;
            </span>
            <h2 id="stock-bill-title">Stock & Bill</h2>
            <button type="button" onClick={() => navigate("/stock")}>
              Stock Details
            </button>
            <button type="button" onClick={() => navigate("/bill")}>
              Bill Generator
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
