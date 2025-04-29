import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import CharacterList from './components/Characters/CharacterList';
import ContactForm from './components/Form/ContactForm';
import CharacterDetail from './components/Character_detail/Character_detail';
import About from './components/About/About'; // <-- agrega esta línea
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Al cargar, verificamos si existe el username en localStorage
    const username = localStorage.getItem('username');
    setIsLoggedIn(!!username);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        ) : (
          <>
            <Route path="/" element={<Layout onLogout={handleLogout} />}>
              <Route index element={<Navigate to="/characters" replace />} />
              <Route path="characters" element={<CharacterList />} />
              <Route path="form" element={<ContactForm />} />
            </Route>
          </>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="characters/:id" element={<CharacterDetail />} />
        <Route path="about" element={<About />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
