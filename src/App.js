
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LearnMore from "./pages/LearnMore";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import { supabase } from "./supabaseClient";
import { useEffect, useState } from "react";
import CoursePage from "./pages/CoursePage";
import TutorsPage from "./pages/TutorsPage";
import StudyGroupsPage from "./pages/StudyGroupsPage";


function Navbar() {
  const location = useLocation();
  const hideOnDashboard = location.pathname === "/dashboard";

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check Supabase auth session instead of only localStorage
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkSession();
  }, []);

  // ✅ Hide this navbar on dashboard
  if (hideOnDashboard) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">CourseConnect</div>

      <div className="nav-links">
        {!isLoggedIn ? (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
            <Link to="/login" className="nav-link login-btn">Login</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="nav-link login-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course/:courseCode" element={<CoursePage />} />
        <Route path="/course/:courseCode/tutors" element={<TutorsPage />} />
        <Route path="/course/:courseCode/study-groups" element={<StudyGroupsPage />} />
        <Route path="/learn-more" element={<LearnMore />} />
      </Routes>
    </Router>
  );
}
