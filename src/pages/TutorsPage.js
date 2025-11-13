import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { baseURL } from "../api";
import "./TutorsPage.css";

export default function TutorsPage() {
  const { courseCode } = useParams();
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);
  const [phone, setPhone] = useState("");
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchTutors = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/tutors/${courseCode}`);
      const data = await res.json();
      setTutors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch tutors", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getCurrentUser();
    fetchTutors();
  }, [courseCode]);

  const handleAddTutor = async () => {
    if (!phone.trim()) {
      alert("Please enter your phone number");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("You must be logged in");

    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("auth_id", user.id)
      .single();

    if (error) {
      console.log(error);
      return alert("User record not found");
    }

    const userId = data.id;

    try {
      await fetch(`${baseURL}/tutors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          phone,
          course_code: courseCode
        }),
      });

      setAdding(false);
      setPhone("");
      fetchTutors();
      alert("✅ You're now a tutor for this course!");
    } catch (error) {
      alert("Failed to add tutor. Please try again.");
    }
  };

  return (
    <div className="tutors-wrapper">
      {/* Back Button */}
      <div className="back-button-container">
       <button className="back-button" onClick={() => navigate(`/course/${courseCode}`)}>
       <span>←</span> Back to Course
      </button>
      </div>

      {/* Header Section */}
      <div className="tutors-header">
        <div className="header-content">
          <div className="course-badge-large">{courseCode}</div>
          <h1 className="page-title">Find Your Perfect Tutor</h1>
          <p className="page-subtitle">
            Connect with experienced tutors ready to help you succeed in {courseCode}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="tutors-container">
        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-icon">👨‍🏫</span>
            <span className="stat-text">{tutors.length} Tutors Available</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⭐</span>
            <span className="stat-text">Verified Students</span>
          </div>
        </div>

        {/* Add Tutor Button */}
        {!adding && (
          <div className="add-tutor-section">
            <button className="become-tutor-btn" onClick={() => setAdding(true)}>
              <span className="btn-icon">✨</span>
              <span>Become a Tutor</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        )}

        {/* Add Tutor Form */}
        {adding && (
          <div className="add-tutor-form">
            <div className="form-card">
              <h3 className="form-title">Join as a Tutor</h3>
              <p className="form-subtitle">Share your knowledge and help fellow students</p>
              
              <div className="form-group">
                <label htmlFor="phone">
                  <span className="label-icon">📱</span>
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="phone-input"
                />
              </div>

              <div className="form-actions">
                <button className="submit-btn" onClick={handleAddTutor}>
                  <span>Submit</span>
                  <span>✓</span>
                </button>
                <button className="cancel-btn" onClick={() => {
                  setAdding(false);
                  setPhone("");
                }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tutors List */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading tutors...</p>
          </div>
        ) : tutors.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🎓</span>
            <h3>No Tutors Yet</h3>
            <p>Be the first to offer tutoring for {courseCode}!</p>
            {!adding && (
              <button className="tutors-empty-cta" onClick={() => setAdding(true)}>
                Become the First Tutor
              </button>
            )}
          </div>
        ) : (
          <div className="tutors-grid">
            {tutors.map((tutor) => (
              <div key={tutor.user_id} className="tutor-card">
                <div className="tutor-avatar">
                  <span className="avatar-emoji">👤</span>
                </div>
                <div className="tutor-info">
                  <h3 className="tutor-name">{tutor?.users?.name || "Tutor"}</h3>
                  <div className="tutor-details">
                    <div className="detail-item">
                      <span className="detail-icon">📞</span>
                      <a href={`tel:${tutor.phone}`} className="phone-link">
                        {tutor.phone}
                      </a>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📧</span>
                      <span className="detail-text">
                        {tutor?.users?.email || "Not provided"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="tutor-actions">
                  <button className="contact-btn" onClick={() => window.location.href = `tel:${tutor.phone}`}>
                    <span>📱</span>
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
