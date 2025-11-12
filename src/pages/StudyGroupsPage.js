import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./StudyGroupsPage.css";

export default function StudyGroupsPage() {
  const { courseCode } = useParams();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [link, setLink] = useState("");
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/study-groups/${courseCode}`);
      const data = await res.json();
      setGroups(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch study groups", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGroups();
  }, [courseCode]);

  const handleAddGroup = async () => {
    if (!link.trim()) {
      alert("Please enter a group link");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("You must be logged in");

    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("auth_id", user.id)
      .single();

    if (error) return alert("User not found");

    const userId = data.id;

    try {
      await fetch(`http://127.0.0.1:8000/study-groups/${courseCode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          link,
          course_code: courseCode
        }),
      });

      setAdding(false);
      setLink("");
      fetchGroups();
      alert("✅ Study group created successfully!");
    } catch (error) {
      alert("Failed to create study group. Please try again.");
    }
  };

  const getPlatformInfo = (url) => {
    if (url.includes('whatsapp')) return { name: 'WhatsApp', icon: '💬', color: '#25D366' };
    if (url.includes('telegram') || url.includes('t.me')) return { name: 'Telegram', icon: '✈️', color: '#0088cc' };
    if (url.includes('discord')) return { name: 'Discord', icon: '🎮', color: '#5865F2' };
    if (url.includes('slack')) return { name: 'Slack', icon: '💼', color: '#4A154B' };
    return { name: 'Link', icon: '🔗', color: '#9333EA' };
  };

  return (
    <div className="study-groups-wrapper">
      {/* Back Button */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(`/course/${courseCode}`)}>
          <span>←</span> Back to Course
        </button>
      </div>

      {/* Header Section */}
      <div className="study-groups-header">
        <div className="header-content">
          <div className="course-badge-large">{courseCode}</div>
          <h1 className="page-title">Study Groups</h1>
          <p className="page-subtitle">
            Join or create study groups to collaborate with peers and ace {courseCode}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="study-groups-container">
        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-icon">👥</span>
            <span className="stat-text">{groups.length} Study Groups Active</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🤝</span>
            <span className="stat-text">Collaborative Learning</span>
          </div>
        </div>

        {/* Create Group Button */}
        {!adding && (
          <div className="create-group-section">
            <button className="create-group-btn" onClick={() => setAdding(true)}>
              <span className="btn-icon">✨</span>
              <span>Create Study Group</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        )}

        {/* Create Group Form */}
        {adding && (
          <div className="create-group-form">
            <div className="form-card">
              <h3 className="form-title">Create a New Study Group</h3>
              <p className="form-subtitle">Share your WhatsApp, Telegram, or Discord group link</p>
              
              <div className="form-group">
                <label htmlFor="link">
                  <span className="label-icon">🔗</span>
                  Group Link
                </label>
                <input
                  id="link"
                  type="url"
                  placeholder="https://chat.whatsapp.com/..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="link-input"
                />
                <p className="input-hint">
                  💡 Tip: Use WhatsApp, Telegram, Discord, or any group chat link
                </p>
              </div>

              <div className="form-actions">
                <button className="submit-btn" onClick={handleAddGroup}>
                  <span>Create Group</span>
                  <span>✓</span>
                </button>
                <button className="cancel-btn" onClick={() => {
                  setAdding(false);
                  setLink("");
                }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Groups List */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading study groups...</p>
          </div>
        ) : groups.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📚</span>
            <h3>No Study Groups Yet</h3>
            <p>Be the first to create a study group for {courseCode}!</p>
            {!adding && (
              <button className="empty-cta" onClick={() => setAdding(true)}>
                Create the First Group
              </button>
            )}
          </div>
        ) : (
          <div className="groups-grid">
            {groups.map((g) => {
              const platform = getPlatformInfo(g.description);
              return (
                <div key={g.id} className="group-card">
                  <div className="group-header">
                    <div className="creator-info">
                      <div className="creator-avatar">
                        <span>👤</span>
                      </div>
                      <div className="creator-details">
                        <h3 className="creator-name">{g.creator_name || "Anonymous"}</h3>
                        <p className="creator-label">Group Creator</p>
                      </div>
                    </div>
                    <div 
                      className="platform-badge" 
                      style={{ background: platform.color }}
                    >
                      <span>{platform.icon}</span>
                      <span>{platform.name}</span>
                    </div>
                  </div>

                  <div className="group-info">
                    <div className="group-stats">
                      <div className="stat-pill">
                        <span className="pill-icon">👥</span>
                        <span>Active Group</span>
                      </div>
                      <div className="stat-pill">
                        <span className="pill-icon">🎯</span>
                        <span>{courseCode}</span>
                      </div>
                    </div>
                  </div>

                  <a 
                    href={g.description} 
                    target="_blank" 
                    rel="noreferrer"
                    className="join-button"
                  >
                    <span className="join-icon">{platform.icon}</span>
                    <span>Join on {platform.name}</span>
                    <span className="join-arrow">→</span>
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Section */}
        {groups.length > 0 && (
          <div className="info-banner">
            <span className="banner-icon">💡</span>
            <div className="banner-text">
              <strong>Pro Tip:</strong> Join multiple groups to find the study style that works best for you!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}