import { useTheme } from '../../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar({ onLogout }) {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm('¿Deseas cerrar sesión?');
    if (confirmLogout) {
      onLogout(); // Llama a la función enviada desde App.jsx
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/characters">
            <span className="logo-text">FUTURAMA</span>
          </Link>
        </div>
        
        <div className="navbar-links">
  <Link 
    to="/characters" 
    className={location.pathname.startsWith('/characters') ? 'active' : ''}
  >
    Personajes
  </Link>
  <Link 
    to="/form" 
    className={location.pathname === '/form' ? 'active' : ''}
  >
    Formulario
  </Link>
  <Link 
    to="/about" 
    className={location.pathname === '/about' ? 'active' : ''}
  >
    About
  </Link>
</div>


        <div className="navbar-user">
          {username && (
            <>
              <span className="welcome-message">Bienvenido {username}</span>
              <button className="logout-button" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </>
          )}
           <button className="theme-button" onClick={toggleTheme}>
            {isDarkMode ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
