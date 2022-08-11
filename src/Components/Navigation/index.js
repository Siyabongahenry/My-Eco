import "./style.css";
import { Link } from "react-router-dom";
import {FaBars,FaHome,FaUser,FaShoppingCart,FaComment,FaHeart,FaSearch} from "react-icons/fa";
import { useState } from "react";
const Navigation = ({user,cart,favourite})=>{
    const[sideMenu,setSideMenu] = useState(false);
    const[navigation,setNavigation] = useState(true);
    const[mobSearch,setMobSearch] = useState("");
    return (
        <header>
            {
                navigation &&
                <nav>
                    <ul className="top-nav">
                        <li className="btn-bars for-mob" onClick={()=>{setSideMenu(!sideMenu)}}><FaBars/></li>
                        <li className='web-name'>My-Eco<span className="domain">.com</span></li>
                        <li className="top-nav-search-btn for-mob"><FaSearch onClick={()=>{setNavigation(false);setMobSearch("d-block")}}/></li>
                    </ul>
                    <ul className={`side-nav ${sideMenu?"d-none":""}`}>
                        <li className='main-menu'>
                            <ul > 
                                <li><Link className="menu-link" to="/"><FaHome/></Link></li>
                                <li><Link className="menu-link" to="/profile"><FaUser/></Link></li>
                                <li><Link className="menu-link" to="/favourites"><FaHeart/><span className="counter">{favourite.length}</span></Link></li> 
                                <li><Link className="menu-link" to="/cart"><FaShoppingCart/><span className="counter">{cart.quantity}</span></Link></li>
                                <li><Link className="menu-link" to="/chat"><FaComment/><span className="counter">0</span></Link></li>
                                <li><Link className="menu-link" to="/order">Order</Link></li>
                                <li><Link className="menu-link" to="/sell">Sell</Link></li>
                            </ul>
                        </li>
                        <li className='authentication'>
                            <ul>
                                {   user.login?
                                    <li><Link className="menu-link" to="/logout">Logout</Link></li>:
                                    <>
                                        <li><Link className="menu-link" to="/login">Login</Link></li>
                                        <li><Link className="menu-link" to="/register">Register</Link></li>
                                    </>
                                }
                            </ul>
                        </li>
                    </ul>
                </nav>
            }
            <div className={`search-container ${mobSearch}`}>
                <div>
                    <input type="text" className="item-search-input focus-outline-none" placeholder="search here"/>
                    <button className="item-search-btn focus-outline-none"><FaSearch/></button>
                </div>
            </div>
        </header>
    );
}

export default Navigation;