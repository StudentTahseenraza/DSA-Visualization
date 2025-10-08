// frontend/src/components/Header.jsx (updated)
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ toggleTheme, theme }) => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/home" className="home-link">
          <h1>Back To Home </h1>
        </Link>
      </div>
      
      <div className="header-right">
        <button onClick={toggleTheme}>
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header;