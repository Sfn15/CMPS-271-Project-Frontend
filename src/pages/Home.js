
import React, { useState, useEffect } from "react";
import "../components/Hero.css";
import heroImg from "../assets/robot.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleLearnMore = () => {
    alert("Learn more clicked");
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className={`hero-container ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-content">
          <h1>Learn Together, <span className="gradient-text">Grow Faster</span></h1>
          <p>
            Connect with peers and tutors across AUB.
            Find study partners, share resources, and grow together.
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={handleGetStarted}
            >
              Get Started
              <span className="arrow">→</span>
            </button>
            <button className="btn-secondary" onClick={() => navigate("/learn-more")}>
            Learn More
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Courses</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Available</div>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="chat-bubble floating">
            <div className="chat-header">
              <span className="chat-icon">💬</span>
              <p className="chat-title">Quick Question</p>
            </div>
            <p className="chat-message">Need help with CMPS 214?</p>
          </div>
          <div className="hero-image">
            <img src={heroImg} alt="Friendly robot helper" />
          </div>
          <div className="status-badge floating-delayed">
            <span className="status-dot"></span>
            <span>5 new study groups</span>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="features-section">
        <div className="features-header">
          <h2>Powerful Features for Better Learning</h2>
          <p>Everything you need to succeed academically, all in one place</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Tutor Search</h3>
            <p>Find peers or tutors by course code (e.g., "CMPS 270").</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Study Groups</h3>
            <p>Join or create real-time group study chats.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Resource Library</h3>
            <p>Upload and download shared notes easily.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🗓️</div>
            <h3>Scheduling</h3>
            <p>Set reminders for upcoming study sessions.</p>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Need Help Getting Started?</h2>
          <p>Our team is here to support you every step of the way</p>
          <button className="cta-button">Contact Us</button>
        </div>
      </div>
    </>
  );
}