// components/LandingPage.jsx
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import AuthButtons from "./AuthButtons";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);
  const { isDarkMode } = useTheme();

  const handleVideoError = () => {
    console.error("Video failed to load");
    setVideoError(true);
    setShowPlayOverlay(false);
  };

  const playVideo = async () => {
    if (videoRef.current) {
      try {
        videoRef.current.currentTime = 0;
        await videoRef.current.play();
        setIsVideoPlaying(true);
        setShowPlayOverlay(false);
      } catch (error) {
        console.log("Video play failed:", error);
        setShowPlayOverlay(true);
      }
    }
  };

  const handleUserInteraction = () => {
    if (!isVideoPlaying) {
      playVideo();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      playVideo();
    }, 1000);

    const interactionEvents = ["click", "touchstart", "keydown", "scroll"];
    const handleInteraction = () => {
      handleUserInteraction();
      interactionEvents.forEach((event) => {
        document.removeEventListener(event, handleInteraction);
      });
    };

    interactionEvents.forEach((event) => {
      document.addEventListener(event, handleInteraction, { once: true });
    });

    return () => {
      clearTimeout(timer);
      interactionEvents.forEach((event) => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, []);

  // Replay video when theme changes
  useEffect(() => {
    if (videoRef.current && isVideoPlaying) {
      playVideo();
    }
  }, [isDarkMode]);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    }
  };

  return (
    <div className={`landing-page ${isDarkMode ? "dark" : "light"}`}>
      {/* Background Video - Always show but with different overlays */}
      <video
        ref={videoRef}
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={handleVideoError}
        onEnded={handleVideoEnd}
      >
        <source src="/videos/background1.mp4" type="video/mp4" />
        <source src="/videos/background1.webm" type="video/webm" />
      </video>

      {/* Fallback background if video doesn't load */}
      {videoError && <div className="fallback-background"></div>}

      {/* Play button overlay if video is not playing */}
      {showPlayOverlay && !videoError && (
        <div className="video-play-overlay" onClick={handleUserInteraction}>
          <div className="play-button">
            <span>▶</span>
            <p>Click to play background video</p>
          </div>
        </div>
      )}

      {/* Video overlay for better text readability - Different for each theme */}
      <div
        className={`video-overlay ${
          isDarkMode ? "dark-overlay" : "light-overlay"
        }`}
      ></div>

      {/* Updated Header with Authentication */}
      <header className="landing-header">
        <nav className="landing-nav">
          <div className="nav-brand">
            <span className="brand-text"> DSA Visualization</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/home" className="nav-link">
                Visualizations
              </Link>
            </li>
            <li>
              <Link to="/learn" className="nav-link">
                Learn
              </Link>
            </li>
            <li>
              <ThemeToggle />
            </li>
            <li>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            {/* Add Authentication Buttons */}
            <li>
              <AuthButtons />
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Hero Content */}
      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Visualize Data Structures
            <span className="title-accent">& Algorithms</span>
          </h1>

          <p className="hero-subtitle">
            See code come alive with interactive visualizations
          </p>

          <div className="hero-buttons">
            <Link
              to="/demo"
              className="btn btn-primary"
              onClick={handleUserInteraction}
            >
              Try Now
            </Link>
            <Link
              to="/home"
              className="btn btn-secondary"
              onClick={handleUserInteraction}
            >
              Explore Algorithms
            </Link>
          </div>
        </div>

        {/* Animated elements for visual appeal */}
        <div className="floating-elements">
          <div className="floating-element element-1">⚡</div>
          <div className="floating-element element-2">🔍</div>
          <div className="floating-element element-3">🚀</div>
          <div className="floating-element element-4">💡</div>
        </div>
      </main>

      {/* Scroll indicator */}
      <div className="scroll-indicator" onClick={handleUserInteraction}>
        <div className="scroll-arrow"></div>
      </div>
    </div>
  );
};

export default LandingPage;
