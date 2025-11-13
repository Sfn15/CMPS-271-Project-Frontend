import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../api";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      
      // Get user name
      const { data: userData } = await supabase
        .from("users")
        .select("name")
        .eq("auth_id", session.user.id)
        .single();
      
      if (userData) {
        setUserName(userData.name);
      }
    };
    checkUser();

    const fetchCourses = async () => {
      try {
        const res = await fetch(`${baseURL}/courses/`);
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };

    fetchCourses();
  }, [navigate]);

  const filteredCourses = Array.isArray(courses)
    ? courses.filter((c) => {
        const code = c?.code?.toLowerCase() || "";
        const title = c?.title?.toLowerCase() || "";
        const searchValue = search.toLowerCase();

        return code.includes(searchValue) || title.includes(searchValue);
      })
    : [];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleCourseAction = (courseCode, action) => {
    navigate(`/course/${courseCode}/${action}`);
  };

  return (
    <div className="dashboard-wrapper">
      {/* Navigation Bar */}
      <nav className="dashboard-nav">
        <div className="nav-left">
          <div className="dashboard-logo">
            <span className="logo-icon">📚</span>
            CourseConnect
          </div>
        </div>
        <div className="nav-right">
          {userName && <span className="user-greeting">Hi, {userName}! 👋</span>}
          <button className="logout-button" onClick={handleLogout}>
            <span className="logout-icon"> </span>
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Course</h1>
          <p className="hero-subtitle">
            Discover tutors, documents, and study groups for {courses.length}+ courses
          </p>
          
          {/* Search Bar */}
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by course code or name..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="clear-search" onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat-card">
              <span className="stat-icon">📖</span>
              <div className="stat-info">
                <div className="stat-number">{courses.length}+</div>
                <div className="stat-label">Courses</div>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">👨‍🏫</span>
              <div className="stat-info">
                <div className="stat-number">500+</div>
                <div className="stat-label">Tutors</div>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">👥</span>
              <div className="stat-info">
                <div className="stat-number">200+</div>
                <div className="stat-label">Study Groups</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="dashboard-container">
        <div className="courses-header">
          <h2>Available Courses</h2>
          <span className="courses-count">
            {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
          </span>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">😕</span>
            <h3>No courses found</h3>
            <p>Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="course-grid">
  {filteredCourses.map((c) => (
    <div 
      key={c.code} 
      className="course-card"
      onClick={() => navigate(`/course/${c.code}`)}
    >
      <div className="course-header">
        <div className="course-code">{c.code}</div>
        <div className="course-badge">Active</div>
      </div>
      <h3 className="course-title">{c.title}</h3>
      
      <div className="course-actions">
        <button 
          className="action-button tutors"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/course/${c.code}/tutors`);
          }}
        >
          <span className="action-icon">👨‍🏫</span>
          <span className="action-text">Tutors</span>
        </button>
        
        <button 
          className="action-button documents"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/course/${c.code}/documents`);
          }}
        >
          <span className="action-icon">📄</span>
          <span className="action-text">Documents</span>
        </button>
        
        <button 
          className="action-button study-groups"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/course/${c.code}/study-groups`);
          }}
        >
          <span className="action-icon">👥</span>
          <span className="action-text">Study Groups</span>
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