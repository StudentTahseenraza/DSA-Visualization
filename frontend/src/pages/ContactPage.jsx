// components/ContactPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import '../styles/ContactPage.css';

const ContactPage = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      details: "support@dsavisualizer.com",
      description: "Send us an email anytime"
    },
    {
      icon: "🐙",
      title: "GitHub",
      details: "github.com/yourusername/dsa-visualizer",
      description: "Check out our source code"
    },
    {
      icon: "💬",
      title: "Community",
      details: "Join our Discord server",
      description: "Connect with other learners"
    }
  ];

  return (
    <div className={`contact-page ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="contact-header">
        <nav className="contact-nav">
          <Link to="/" className="nav-brand">
            <span className="brand-text">VISUALIZE</span>
          </Link>
          <div className="nav-actions">
            <Link to="/home" className="nav-button">
              Home
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <div className="contact-container">
        {/* Hero Section */}
        <section className="contact-hero">
          <h1>Get In Touch</h1>
          <p className="hero-subtitle">
            Have questions, suggestions, or feedback? We'd love to hear from you!
          </p>
        </section>

        <div className="contact-content">
          {/* Contact Form */}
          <section className="contact-form-section">
            <h2>Send us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary submit-btn">
                Send Message
              </button>
            </form>
          </section>

          {/* Contact Information */}
          <section className="contact-info">
            <h2>Other Ways to Reach Us</h2>
            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <div key={index} className="contact-method">
                  <div className="method-icon">{method.icon}</div>
                  <div className="method-content">
                    <h3>{method.title}</h3>
                    <p className="method-details">{method.details}</p>
                    <p className="method-description">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
              <h3>Frequently Asked Questions</h3>
              <div className="faq-list">
                <div className="faq-item">
                  <h4>Is DSA Visualizer free to use?</h4>
                  <p>Yes! DSA Visualizer is completely free and open source. We believe in making education accessible to everyone.</p>
                </div>
                <div className="faq-item">
                  <h4>Can I contribute to the project?</h4>
                  <p>Absolutely! We welcome contributions. Check out our GitHub repository for contribution guidelines.</p>
                </div>
                <div className="faq-item">
                  <h4>Do you have mobile app?</h4>
                  <p>Currently we're web-only, but the website is fully responsive and works great on mobile devices.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <section className="contact-cta">
          <div className="cta-content">
            <h2>Ready to Explore?</h2>
            <p>Start your journey with interactive algorithm visualizations today</p>
            <div className="cta-buttons">
              <Link to="/demo" className="btn btn-primary">
                Try Demo
              </Link>
              <Link to="/home" className="btn btn-secondary">
                View All Algorithms
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;