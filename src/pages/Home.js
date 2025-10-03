import React from "react";
import "../components/Hero.css";
import heroImg from "../assets/robot.png";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation

export default function Home() {
  const navigate = useNavigate(); // ✅ Initialize navigation

  return (
    <>
      {/* HERO SECTION */}
      <div className="hero-container">
        <div className="hero-content">
          <h1>Learn Together, Grow Faster</h1>
          <p>
            Connect with peers and tutors across AUB.
            Find study partners, share resources, and grow together.
          </p>
          <div className="hero-buttons">
            {/* ✅ Added navigation to Signup page */}
            <button
              className="btn-primary"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>

        <div className="hero-image">
          <div className="chat-bubble">
            <span className="chat-icon">💬</span>
            <p>Need help finding a study group for CMPS 214?</p>
          </div>
          <img src={heroImg} alt="Friendly robot helper" />
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="features-section">
        <div className="feature-card">
          <h3>🔍 Smart Tutor Search</h3>
          <p>Find peers or tutors by course code (e.g., “CMPS 270”).</p>
        </div>

        <div className="feature-card">
          <h3>🧠 Study Groups</h3>
          <p>Join or create real-time group study chats.</p>
        </div>

        <div className="feature-card">
          <h3>📚 Resource Library</h3>
          <p>Upload and download shared notes easily.</p>
        </div>

        <div className="feature-card">
          <h3>🗓️ Scheduling</h3>
          <p>Set reminders for upcoming study sessions.</p>
        </div>
      </div>
    </>
  );
}
