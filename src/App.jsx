import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./Home";
import HeroDetail from "./details";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <div className="sidebar">
          <h3>Menu</h3>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/">About</Link></li>
          </ul>
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/heroes/:key" element={<HeroDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
