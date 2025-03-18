import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import FooterStyle from "../styles/FooterStyle";
import { Link } from "react-router";
import logo from "../assets/logo2.png"
const Footer = () => {
  return (
    <FooterStyle>
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section"> <img className="logoFooter" src={logo}/></div>
        <div className="footer-section">
          <h3>Tero Coffee</h3>
          <p>Bringing the finest organic coffee to your home, events and business.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <p>
            <Link to={"/"}>Home</Link> |  <Link to={"/contact"}>Events</Link> |  <Link to={"/contact"}>Contact</Link>
          </p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </div>
      </div>
      <p>© {new Date().getFullYear()} Tero Coffee. App developed by Adrian Sartini. All rights reserved.</p>
    </footer>
    </FooterStyle>
  );
};

export default Footer;
