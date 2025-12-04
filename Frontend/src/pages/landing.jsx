import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
const usedNumbers = new Set();

const getUniqueRandomNumber = () => {
  let num;
  do {
    num = Math.floor(Math.random() * 100000) + 1;
  } while (usedNumbers.has(num));
  usedNumbers.add(num);
  return num;
};

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landingPageContainer">
      <nav className="nav">
        <div className="navHeader">
          <img src="/logo.png" alt="Logo" className="logo_main" />
        </div>
        <div className="navList">
          <p
            role="button"
            style={{ cursor: "pointer" }}
            onClick={() => {
              const randomNumber = getUniqueRandomNumber();
              navigate(`/${randomNumber}`);
            }}
          >
            Join as Guest
          </p>

          <p
            role="button"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/auth")}
          >
            Register
          </p>

          <p
            role="button"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/auth")}
          >
            Login
          </p>
        </div>
      </nav>

      <div className="mainContainer">
        <div>
          <h1>
            <span style={{ color: "rgba(255, 152, 57, 1)" }}>
              "Stay close,{" "}
            </span>
            no matter the distance"
          </h1>
          <p>Cover a distance by AuraConnect</p>
          <div>
            <button
              type="button"
              className="btn import"
              style={{ fontSize: "1.5rem" }}
              onClick={() => navigate("/auth")}
            >
              Get Started
            </button>
          </div>
        </div>
        <div>
          <img src="/mobile.png" alt="Mobile view" className="mobile-Img" />
        </div>
      </div>
      <footer className="footer2">
        © 2025 | Developed by <strong>Chandan</strong>
      </footer>
    </div>
  );
}
