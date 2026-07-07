import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="logo">Azure Harbor Resort</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/rooms">Rooms</Link>
        </nav>
        <a className="cta" href="tel:+18005551234">
          Call +1 (800) 555-1234
        </a>
      </header>

      <main className="page-body">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/:id" element={<RoomDetailsPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div>
          <strong>Azure Harbor Resort</strong>
          <p>Oceanfront luxe stays with curated amenities designed for both relaxation and adventure.</p>
        </div>
        <div className="footer-links">
          <p>123 Harbor Point Drive</p>
          <p>Monterey, CA 93940</p>
          <p>USA</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
