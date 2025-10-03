import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-content">
      <h1>Learn Together, <br />Grow Faster</h1>
      <p>
       Connect with peers and tutors across AUB. Find study partners, share
       resources, and grow together.
    </p>

      </div>
      <div className="hero-image">
        <img src="/images/hero-illustration.png" alt="CourseConnect" />
      </div>
    </div>
  );
}

export default Hero;

