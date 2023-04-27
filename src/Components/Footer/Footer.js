import React from 'react';

import './Footer.css';

function Footer() {
  return (
    <div className="footerParentDiv">
      <div className="content">
        <div>
          <div className="heading">
            <p>POPULAR LOCATIONS</p>
          </div>
          <div className="list">
            <ul>
              <li>Delhi</li>
              <li>Agra</li>
              <li>Mathura</li>
              <li>Kanpur</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>ABOUT US</p>
          </div>
          <div className="list">
            <ul>
              <li>About ExchangeZone Group</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>ExchangeZone </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>ExchangeZone</p>
          </div>
          <div className="list">
            <ul>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Other Countries UAE- USA - Bhutan</p>
        <p>Free Classifieds in India. ©2022-2024 ExchangeZone</p>
      </div>
    </div>
  );
}

export default Footer;
