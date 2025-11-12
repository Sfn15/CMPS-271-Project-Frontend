import { useParams, useNavigate } from "react-router-dom";
import "./CoursePage.css";

export default function CoursePage() {
  const { courseCode } = useParams();
  const navigate = useNavigate();

  const options = [
    {
      id: 'tutors',
      title: 'Find Tutors',
      description: 'Connect with experienced tutors ready to help',
      icon: '👨‍🏫',
      color: '#3B82F6',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      path: `/course/${courseCode}/tutors`
    },
    {
      id: 'documents',
      title: 'Browse Documents',
      description: 'Access shared notes, slides, and study materials',
      icon: '📄',
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      path: `/course/${courseCode}/documents`
    },
    {
      id: 'study-groups',
      title: 'Join Study Groups',
      description: 'Collaborate with peers in study groups',
      icon: '👥',
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      path: `/course/${courseCode}/study-groups`
    }
  ];

  return (
    <div className="course-page-wrapper">
      {/* Back Button */}
      <div className="back-button-container">
        <button className="back-button-course" onClick={() => navigate('/dashboard')}>
          <span>←</span> Back to Dashboard
        </button>
      </div>

      {/* Hero Section */}
      <div className="course-hero">
        <div className="hero-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
        
        <div className="hero-content-course">
          <div className="course-badge-hero">{courseCode}</div>
          <h1 className="course-main-title">Welcome to {courseCode}</h1>
          <p className="course-main-subtitle">
            Choose how you'd like to enhance your learning experience
          </p>
        </div>
      </div>

      {/* Options Grid */}
      <div className="course-options-container">
        <div className="options-grid">
          {options.map((option) => (
            <div 
              key={option.id}
              className="option-card"
              onClick={() => navigate(option.path)}
              style={{ '--card-color': option.color }}
            >
              <div className="option-icon-wrapper" style={{ background: option.gradient }}>
                <span className="option-icon">{option.icon}</span>
              </div>
              
              <div className="option-content">
                <h3 className="option-title">{option.title}</h3>
                <p className="option-description">{option.description}</p>
              </div>

              <div className="option-arrow">
                <span>→</span>
              </div>

              <div className="option-overlay" style={{ background: option.gradient }}></div>
            </div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="info-cards">
          <div className="info-card">
            <span className="info-icon">💡</span>
            <div className="info-text">
              <h4>Pro Tip</h4>
              <p>Join a study group to maximize your learning potential</p>
            </div>
          </div>
          
          <div className="info-card">
            <span className="info-icon">🎯</span>
            <div className="info-text">
              <h4>Get Started</h4>
              <p>Browse documents and connect with tutors in one place</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

