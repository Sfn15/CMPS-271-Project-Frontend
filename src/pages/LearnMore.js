import React from "react";
import { useNavigate } from "react-router-dom";
import "./LearnMore.css";

export default function LearnMore() {
  const navigate = useNavigate();

  return (
    <div className="learn-more-page">
      {/* Hero Section */}
      <div className="learn-hero">
        <div className="hero-bg-decoration">
          <div className="hero-circle hero-circle-1"></div>
          <div className="hero-circle hero-circle-2"></div>
          <div className="hero-circle hero-circle-3"></div>
        </div>
        <div className="learn-hero-content">
          <div className="hero-badge">✨ Welcome to</div>
          <h1><span className="hero-highlight">CourseConnect</span></h1>
          <p className="hero-subtitle">
            Your academic success starts here. Connect, collaborate, and excel together.
          </p>
          <div className="hero-emoji-grid">
            <span className="hero-emoji">📚</span>
            <span className="hero-emoji">🎓</span>
            <span className="hero-emoji">💡</span>
            <span className="hero-emoji">✨</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <div className="section-container">
          <h2>What is CourseConnect?</h2>
          <p className="about-text">
            CourseConnect is AUB's premier platform for academic collaboration. 
            We connect students who want to learn together, share resources, and 
            support each other throughout their academic journey. Whether you're 
            looking for a study partner, need help with a difficult course, or 
            want to share your knowledge with others, CourseConnect is here for you.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works">
        <div className="section-container">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Sign Up</h3>
              <p>Create your account with your AUB email to get started</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Find Your Match</h3>
              <p>Search for tutors or study partners by course code</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Connect & Learn</h3>
              <p>Join study groups, share resources, and grow together</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Succeed Together</h3>
              <p>Achieve your academic goals with community support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Deep Dive */}
      <div className="features-detail">
        <div className="section-container">
          <h2>Everything You Need</h2>
          
          <div className="feature-detail-card">
            <div className="feature-icon-large">🔍</div>
            <div className="feature-detail-content">
              <h3>Smart Tutor Search</h3>
              <p>
                Finding help has never been easier. Simply enter your course code 
                (like CMPS 270 or ECON 201) and instantly discover peers who can help 
                or tutors who specialize in that subject. Our intelligent matching 
                system ensures you connect with the right people.
              </p>
            </div>
          </div>

          <div className="feature-detail-card reverse">
            <div className="feature-icon-large">🧠</div>
            <div className="feature-detail-content">
              <h3>Study Groups</h3>
              <p>
                Create or join real-time study groups with students taking the same 
                courses. Schedule group sessions, share study materials, and tackle 
                challenging problems together. Learning is more effective and enjoyable 
                when you do it with others.
              </p>
            </div>
          </div>

          <div className="feature-detail-card">
            <div className="feature-icon-large">📚</div>
            <div className="feature-detail-content">
              <h3>Resource Library</h3>
              <p>
                Access a growing collection of shared notes, study guides, and learning 
                materials. Upload your own resources to help others and build your 
                academic portfolio. All resources are organized by course for easy access.
              </p>
            </div>
          </div>

          <div className="feature-detail-card reverse">
            <div className="feature-icon-large">🗓️</div>
            <div className="feature-detail-content">
              <h3>Smart Scheduling</h3>
              <p>
                Never miss a study session again. Set reminders for upcoming group 
                meetings, exam dates, and assignment deadlines. Coordinate schedules 
                with your study partners and stay on track with your academic goals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="section-container">
          <h2>Join Our Growing Community</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-big">500+</div>
              <p>Active Students</p>
            </div>
            <div className="stat-box">
              <div className="stat-big">50+</div>
              <p>Courses Covered</p>
            </div>
            <div className="stat-box">
              <div className="stat-big">1000+</div>
              <p>Study Sessions</p>
            </div>
            <div className="stat-box">
              <div className="stat-big">24/7</div>
              <p>Support Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="learn-cta">
        <h2>Ready to Get Started?</h2>
        <p>Join CourseConnect today and take your learning to the next level</p>
        <button className="cta-primary" onClick={() => navigate("/signup")}>
          Sign Up Now
        </button>
      </div>
    </div>
  );
}