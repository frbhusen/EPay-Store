import React from 'react';
import '../styles/Home.css';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t('home.welcome')}</h1>
          <p className="hero-subtitle">{t('home.subtitle')}</p>
          <p className="hero-description">{t('home.description')}</p>
          <a href="/e-services" className="cta-button">{t('home.shopNow')}</a>
        </div>
        <div className="hero-image">
          <img src={logo} alt="EPay Store" className="hero-logo" />
        </div>
      </section>

      <section className="features-section">
        <h2>{t('home.whyTitle')}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>{t('home.fastDelivery')}</h3>
            <p>{t('home.subtitle_fast')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>{t('home.highQuality')}</h3>
            <p>{t('home.subtitle_quality')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎁</div>
            <h3>{t('home.greatSelection')}</h3>
            <p>{t('home.subtitle_selection')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>{t('home.support')}</h3>
            <p>{t('home.subtitle_support')}</p>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
