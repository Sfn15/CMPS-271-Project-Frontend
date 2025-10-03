
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css"; // Keep navbar styles here

function App() {
  return (
    <Router>
      <nav className="navbar">
      <div className="nav-logo">CourseConnect</div>
      <div className="nav-links">
      <a href="/" className="nav-link">Home</a>
      
      <a href="/Signup" className="nav-link">Signup</a>
      <a href="/login" className="nav-link login-btn">Login</a>
      </div>
      </nav>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;

