import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { useCurrency } from '../context/CurrencyContext';
import logo from '../assets/logo.png';
import Sidebar from './Sidebar';

const Header = ({ cartCount }) => {
  const navigate = useNavigate();
  const { currency, toggleCurrency } = useCurrency();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-container">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="logo" onClick={() => navigate('/')}>
            <img src={logo} alt="EPay Store Logo" className="logo-img" />
          </div>

          <div className="header-actions">
            <button className="currency-toggle" onClick={toggleCurrency}>
              {currency}
            </button>
            <button className="cart-icon" onClick={() => navigate('/cart')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 2L7 6H21L19 2H9z"/>
                <path d="M21 6H7l-1 12h16l-1-12z"/>
                <circle cx="9" cy="21" r="1"/>
                <circle cx="17" cy="21" r="1"/>
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
