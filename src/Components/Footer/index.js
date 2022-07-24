import "./style.css";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
const Footer = ()=>{
    return (
        <div className="row footer">
            <div className="col-6 col-lg-4">
                <div className="p-2">
                    <h3>Social Networks</h3>
                    <ul>
                        <li><FaLinkedinIn className="text-blue"/> My-Eco</li>
                        <li><FaFacebook className="text-blue"/> My-Eco</li>
                        <li><FaInstagram/> My Eco4555</li>
                    </ul>
                </div>
            </div>
            <div className="col-6 col-lg-4">
                <div className="p-2">
                    <h3>Contact Details</h3>
                    <ul>
                        <li><FaEnvelope/> info@myeco.com</li>
                        <li><FaPhone/> +27 52 546 8896</li>
                    </ul>
                </div>
            </div>
            <div className="col-12 col-lg-4">
                <div className="p-2">
                    <h3>Address</h3>
                    <address>
                            2275 Mazuks Street <br/>
                            Amsteryes <br/>
                            4856
                    </address>
               </div>
            </div>
            <div className="col-12 text-primary text-center">
                copy right 2020 My-Eco
            </div>
        </div>
    );
}

export default Footer;