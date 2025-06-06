'use client';

import React, { useState } from 'react';
import '../styles/footer.css';
import Link from 'next/link'

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!email) {
      alert('Lütfen e-posta adresinizi girin.');
      return;
    }

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      alert('Geçerli bir e-posta adresi girin.');
      return;
    }

    alert('Aboneliğiniz için teşekkürler!');
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3 className="footer-logo">SAPBASIS</h3>
          <p className="footer-info">+90 212 212 12 12</p>
          <p className="footer-info">bilgi@sapbasis.com</p>
          <p className="footer-info"></p>
          <p className="footer-info">İstanbul</p>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Blog</h4>
          <ul className="footer-links">
            <li><Link href="/categories" className="nav-link">Kategoriler</Link></li>
            <li><Link href="/contact" className="nav-link">İletişim</Link></li>
            <li><Link href="/about" className="nav-link">Hakkında</Link></li>
          </ul>
          <button className="cta-button">Hemen Başla</button>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Bültenimize Abone Olun</h4>
          <input
            type="email"
            className="newsletter-input"
            placeholder="E-posta *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="newsletter-button" onClick={handleSubmit}>
            Gönder
          </button>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Bizi Takip Edin:</h4>
          <div className="social-icons">
            <span>🔗</span>
            <span>📘</span>
            <span>❌</span>
          </div>
          <ul className="footer-links">
            <li>Gizlilik Politikası</li>
            <li>Çerez Politikası</li>
            <li>Erişilebilirlik Beyanı</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
