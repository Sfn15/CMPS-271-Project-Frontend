import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const isAUBEmail =
      email.endsWith('@mail.aub.edu') || email.endsWith('@aub.edu');

    if (!isAUBEmail) {
      alert('❌ Only @mail.aub.edu or @aub.edu allowed');
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(`❌ Login failed: ${error.message}`);
      setIsLoading(false);
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Form */}
        <div className="login-form-section">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button type="button" className="forgot-password">
                Forgot password?
              </button>
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner">Signing in...</span>
              ) : (
                <>
                  Log In
                  <span className="button-arrow">→</span>
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <button onClick={() => navigate('/signup')} className="link-button">Sign Up</button></p>
          </div>
        </div>

        {/* Right Side - Info */}
        <div className="login-info-section">
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

export default Login;