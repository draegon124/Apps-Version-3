import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Shop from './Shop';
import FarmersChalkboardHeading from './FarmersChalkboardHeading';
import WoodFrame from './Woodframe';
import Basket from './Basket';
import Checkout from "./Checkout";
import MyOrders from "./MyOrders";
import Admin from "./Admin";
import './FarmersChalkboardHeading.css';
import Account from "./Account";

const FRAME = {
  innerColor: "#5a3e1b",
  outerColor: "#7a5428",
  thickness: 10,
  dropShadow: "rgba(0,0,0,0.5)",
  borderRadius: "6px",
};

const FRIME = {
  innerColor: "#5a3e1b",
  outerColor: "#7a5428",
  thickness: 10,
  dropShadow: "rgba(0,0,0,0.5)",
  borderRadius: "26px",
};

const LOGIN_FRAME = {
  innerColor: "#5a3e1b",
  outerColor: "#7a5428",
  thickness: 1,
  dropShadow: "rgba(0,0,0,0.5)",
  borderRadius: "36px",
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [basket, setBasket] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      const users = [
        { username: "admin@me", password: "admin123", role: "admin" }
      ];
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  useEffect(() => {
    document.title = "GreenField Local Hub - Home";
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setBasket([]);
    navigate('/');
  };

  return (
    <Routes>

      {/* Routes */}
      <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/shop" element={<Shop basket={basket} setBasket={setBasket} />} />
      <Route path="/basket" element={<Basket basket={basket} setBasket={setBasket} />} />
      <Route path="/checkout" element={<Checkout basket={basket} setBasket={setBasket} />} />
      <Route path="/account" element={<Account />} />
      <Route path="/my-orders" element={<MyOrders />} />

      <Route path="/admin" element={<Admin />} />

      {/* Home */}
      <Route path="/" element={
        <div className="App">

          {/* Left nav menu */}
          <WoodFrame className="icon-menu" {...FRIME}>
            <button
              className="icon-toggle"
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() => setIsOpen(true)}
            >
              <img src="/menu-icon.png" alt="Menu" className="menu-icon" />
            </button>

            <nav className={`icon-nav ${isOpen ? 'open' : ''}`}>
              <a href="/shop" title="Shop">
                <img src="/shop.jpg" alt="Shop" className="nav-icon" />
              </a>
              <a href="#events" title="Events">
                <img src="/events.jpg" alt="Events" className="nav-icon" />
              </a>
              <a href="#news" title="News">
                <img src="/news.jpg" alt="News" className="nav-icon" />
              </a>
              <a href="#support" title="Support">
                <img src="/support.png" alt="Support" className="nav-icon" />
              </a>
            </nav>
          </WoodFrame>

          {/* Top right icons */}
          {!currentUser ? (
            <WoodFrame as={Link} to="/login" className="login-button" title="Log In" {...LOGIN_FRAME}>
              <img src="/log_in.jpg" alt="Log In" className="login-icon" />
            </WoodFrame>
          ) : (
            <div className="top-right-icons">

              {/* Account */}
              <Link to="/account" className="login-button">
                <img src="/account.png" alt="Account" className="login-icon" />
              </Link>

              {currentUser?.role === "admin" && (
                <WoodFrame as={Link} to="/admin" className="admin-button" title="Admin Panel" {...LOGIN_FRAME}>
                  <img src="/admin.png" alt="Admin" className="login-icon" />
                </WoodFrame>
              )}

              {/* Basket */}
              <button onClick={() => navigate('/shop')} className="basket-button" title="Shop">
                <img src="/basket.png" alt="Basket" className="basket-icon" />
              </button>

            </div>
          )}

          {/* Logout */}
          {currentUser && (
            <WoodFrame as="button" onClick={handleLogout} className="logout-button" {...FRIME}>
              Log Out
            </WoodFrame>
          )}

          {/* Chalkboard heading */}
          <FarmersChalkboardHeading
            title="GREENFIELD"
            subtitle="Local Hub"
            tagline="Fresh & Local"
            established="Est. 1997 · Farm to Table"
            frameInnerColor={FRAME.innerColor}
            frameOuterColor={FRAME.outerColor}
            frameThickness={18}
            frameDropShadow={FRAME.dropShadow}
            frameBorderRadius={FRAME.borderRadius}
          />
        </div>
      } />

    </Routes>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;