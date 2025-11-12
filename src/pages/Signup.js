import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const isAUBEmail =
      email.endsWith('@mail.aub.edu') || email.endsWith('@aub.edu');

    if (!isAUBEmail) {
      alert('❌ Only @mail.aub.edu or @aub.edu allowed');
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      }
    });

    if (error) {
      if (error.message.includes("User already registered")) {
        alert("⚠️ An account already exists with this email. Try logging in instead.");
      } else {
        alert(`Signup failed: ${error.message}`);
      }
      setIsLoading(false);
      return;
    }
    
    if (data?.user?.identities?.length === 0) {
      alert("⚠️ An account already exists. Please log in.");
      setIsLoading(false);
      return;
    }
    
    await supabase.from("users").insert([
      {
        auth_id: data.user.id,
        email: email,
        name: name,
      }
    ]);

    alert('✅ Signup successful! Check your AUB email for verification.');
    setIsLoading(false);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Side - Form */}
        <div className="signup-form-section">
          <div className="signup-header">
            <h1>Create Account</h1>
            <p>Join the CourseConnect community</p>
          </div>

          <form onSubmit={handleSignup} className="signup-form">
            <div className="form-group">
              <label htmlFor="name">
                <span className="label-icon">👤</span>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <span className="label-icon">📧</span>
                AUB Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@mail.aub.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
              <span className="input-hint">Use your @mail.aub.edu or @aub.edu email</span>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
              <span className="input-hint">Minimum 6 characters</span>
            </div>

            <button 
              type="submit" 
              className="signup-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner">Creating Account...</span>
              ) : (
                <>
                  Sign Up
                  <span className="button-arrow">→</span>
                </>
              )}
            </button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? <button onClick={() => navigate('/login')} className="link-button">Log In</button></p>
          </div>
        </div>

        {/* Right Side - Info */}
        <div className="signup-info-section">
          <div className="info-content">
            <div className="illustration-area">
              <div className="circle-decoration circle-1"></div>
              <div className="circle-decoration circle-2"></div>
              <div className="circle-decoration circle-3"></div>
              <div className="icon-grid">
                <span className="floating-icon">📚</span>
                <span className="floating-icon delay-1">🎓</span>
                <span className="floating-icon delay-2">✨</span>
                <span className="floating-icon delay-3">💡</span>
              </div>
            </div>
            <h2>Welcome to CourseConnect</h2>
            <p className="info-description">
              Join 500+ AUB students who are learning together, sharing resources, and achieving academic excellence.
            </p>
            
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Find study partners instantly</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Access shared notes and resources</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Join collaborative study groups</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Get 24/7 community support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;