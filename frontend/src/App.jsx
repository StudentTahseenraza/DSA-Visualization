// App.jsx - Update with AuthProvider
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './components/LandingPage';
import Homepage from './components/Homepage';
import AlgorithmPage from './components/AlgorithmPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import LearnPage from './pages/LearnPage';
import DemoPage from './pages/DemoPage';
import './styles/global.css';
import ComplexityAnalysis from './components/ComplexityAnalysis';
import AlgorithmCompare from './components/AlgorithmCompare';
import AuthModal from './components/AuthModal';
import { useAuth } from './contexts/AuthContext';
import UserProfile from './components/UserProfile';


// Inner App component that uses auth
const AppContent = () => {
  const { authModalOpen, closeAuthModal, authView } = useAuth();

  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/:category" element={<AlgorithmPage />} />
            <Route path="/algorithm-compare" element={<AlgorithmCompare />} />
            <Route path="/complexity-analysis" element={<ComplexityAnalysis />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </div>
      </Router>

      <AuthModal
        isOpen={authModalOpen}
        onClose={closeAuthModal}
        initialView={authView}
      />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;