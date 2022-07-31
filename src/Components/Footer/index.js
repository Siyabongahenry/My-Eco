import "./style.css";
import { FaLinkedinIn,FaFacebook,FaInstagram,FaEnvelope,FaPhone,FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = ()=>{
    return (
        <div className="footer text-center">
            <div>
                <h3 className="text-center">Follow us</h3>
                <Link className="social-link" to=""><FaLinkedinIn/></Link>
                <Link className="social-link" to=""><FaFacebook/></Link>
                <Link className="social-link" to=""><FaInstagram/></Link>
                <Link className="social-link" to=""><FaTwitter/></Link>
            </div>
             <div>
                <a href="mailto:info@myeco.com" target="_blank"><FaEnvelope/> info@myeco.com</a>
            </div>
            <div className="copy-right">
                &copy;2020 My-Eco
            </div>
        </div>
    );
}

export default Footer;