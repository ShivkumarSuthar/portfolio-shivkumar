import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaBehance, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          <h1 className="footer-title">Let’s work together</h1>

          <div className="footer-contact-row">
            <div className="footer-email">
              <a href="mailto:hello@example.com">shiv.str21@gmail.com</a>
            </div>
            <div className="footer-socials">
              <a href="#" className="footer-social-icon" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="footer-social-icon" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="footer-social-icon" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" className="footer-social-icon behance" aria-label="Behance">
                <FaBehance />
              </a>
            </div>

            <div className="footer-phone">
              <a href="tel:+1234567890" className="phone-number">+91 6377290604</a>
              <div className="location">Thane, Mumbai(IND)</div>
            </div>
          </div>
        </div>

       

        {/* <div className="footer-scroll-top">
          <a href="#top" className="footer-scroll-link">
            <span>Back to Top</span>
            <FaArrowUp />
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
