// import instagram from '../images/instagram.png';
import React from 'react';
import './Footer.css';
import instagram from '../images/instagram.png';
import facebook from '../images/facebook.png';
import twitter from '../images/twitter.png';
import linkedin from '../images/linkedin.png';
import tiktok from '../images/tik-tok.png';
import youtube from '../images/youtube.png';
import trademarkiaLogo from '../images/logo_trademarkia.png';
import googlereview from '../images/google_review_2.png';
import customerapproved from '../images/shopperapproved.png';
import phoneIcon from '../images/call.png';
import emailIcon from '../images/email.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column1">
          <div className='footer-logo'>
          <a>
            <img src={trademarkiaLogo} alt="Trademarkia Logo"></img>
          </a>
          </div>
          <p>World's #1 website to register your trademark and protect your brand, name, logo or slogan</p>
          <div style={{padding: '20px 0px 10px 0px'}}>
          <h2>Social Links</h2>
          <div className="social-links">
            <a href="#" className="social-icon">
              <img src={instagram}  alt="Instagram" />
            </a>
            <a href="#" className="social-icon">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="#" className="social-icon">
              <img src={twitter} alt="X" />
            </a>
            <a href="#" className="social-icon">
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a href="#" className="social-icon">
              <img src={tiktok} alt="TikTok" />
            </a>
            <a href="#" className="social-icon">
              <img src={youtube} alt="YouTube" />
            </a>
          </div>
          </div>

          <div className="trusted-reviews" style={{padding: '20px 0px 20px 0px'}}>
            <h3>Trusted Reviews</h3>
            <div className="review">
              <img src={customerapproved} alt="Customer Approved"/>
              <span className="rating">4.6/5</span>
            </div>
            <div className="review">
              <img src={googlereview} alt="Google Reviews"/>
              <span className="rating">4.8/5</span>
            </div>
          </div>
          <div className="footer-buttons">
            <button className="apply-button">Apply for trademark</button>
            <button className="schedule-button">Schedule Consult</button>
          </div>
          <a href="#" className="pricing-link">See our plans and pricing</a>
        </div>

        <div className="footer-column">
          <h3>Services</h3>
          <ul>
            <li>Trademark Registration</li>
            <li>Comprehensive Trademark Search</li>
            <li>Trademark Services</li>
            <li>Trademark Classes</li>
            <li>International Trademark Registration</li>
            <li>File a Copyright</li>
            <li>Trademark Renewal</li>
            <li>Statement of Use</li>
            <li>Office Action Response</li>
            <li>Browse Top 300 Companies</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Search</h3>
          <ul>
            <li>Free Trademark search</li>
            <li>Free Copyright Search</li>
            <li>Owner search</li>
            <li>Attorney Ranking Search</li>
            <li>Domain Search</li>
            
          </ul>
          <h3>Resources</h3>
          <ul>
            <li>Blogs</li>
            <li>Frequently Asked Question</li>
            <li>Become An Influencer</li>
            <li>Bulk Data</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Rankings</h3>
          <ul>
            <li>Company Ranking</li>
            <li>Law Firms Ranking</li>
            <li>Attorney Ranking</li>
            <li style={{minHeight: '1.5em'}}> </li>
          </ul>
          <h3>Company</h3>
          <ul>
            <li>About us</li>
            <li>Press Coverage</li>
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
            <li>Sitemap</li>
          </ul>
        </div>
      </div>

      <div className="contact">
        <h3>Contact</h3>
        <div className="contact-methods">
          <div className="contact-method">
            <img src={phoneIcon} alt="Phone"  className='contact-icon'/>
            <div>
              <span>Call</span>
              <a href="tel:+18777949511">+1 (877) 794-9511</a>
            </div>
          </div>
          <div className="contact-method">
            <img src={emailIcon} alt="Email"  className='contact-icon'/>
            <div>
              <span>Email</span>
              <a href="#">Leave a message →</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
