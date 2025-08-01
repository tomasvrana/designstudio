// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
const Header = () => {
  return (
    <header>
      <nav>
        <h1>John Doe</h1>
        <div className="nav-links">
          <a href="#portfolio">Portfolio</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <button onClick={() => alert('Language toggle')}>EN/CZ</button>
        </div>
      </nav>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="hero">
      <h2>Frontend Developer</h2>
      <p>Building beautiful and responsive web applications</p>
      <button onClick={() => alert('View projects')}>View My Work</button>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    { id: 1, title: 'Project 1', description: 'A React web app' },
    { id: 2, title: 'Project 2', description: 'An e-commerce site' },
  ];

  return (
    <section id="portfolio">
      <h2>My Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Hero />
          <Portfolio />
        </main>
      </div>
    </Router>
  );
}

export default App;