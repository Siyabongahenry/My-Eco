import "./style.css";
import { Link, useLocation } from "react-router-dom";
import {FaBars,FaHome,FaUser,FaShoppingCart,FaComment,FaHeart,FaSearch} from "react-icons/fa";
import { useState} from "react";
const Navigation = ({user,cart,favourite,searchItem,userLogOut})=>{
    const location = useLocation();
    const[sideMenu,setSideMenu] = useState(false);
    const[navigation,setNavigation] = useState(true);
    const[mobSearch,setMobSearch] = useState("");
    const[searchValue,setSearchValue]=useState("");
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        searchItem(searchValue.toLowerCase());
        setNavigation(true);
        setMobSearch("");
    }
    return (
        <header>
            {
                navigation &&
                <nav>
                    <ul className="top-nav">
                        <li className="btn-bars for-mob" onClick={()=>{setSideMenu(!sideMenu)}}><FaBars/></li>
                        <li className='web-name'>My-Eco<span className="domain">.com</span></li>
                        <li className="top-nav-search-btn for-mob"><FaSearch onClick={()=>{if(location.pathname ==="/My-Eco/" ){setNavigation(false);setMobSearch("d-block")}}}/></li>
                    </ul>
                    <ul className={`side-nav ${sideMenu?"d-none":""}`}>
                        <li className='main-menu'>
                            <ul > 
                                <li><Link className="menu-link" to="/My-Eco/"><FaHome/></Link></li>
                                <li><Link className="menu-link" to="/profile"><FaUser/></Link></li>
                                <li><Link className="menu-link" to="/favourite"><FaHeart/><span className="counter">{favourite !=null?favourite.length:0}</span></Link></li> 
                                <li><Link className="menu-link" to="/cart"><FaShoppingCart/><span className="counter">{cart !=null?cart.quantity:0}</span></Link></li>
                                <li><Link className="menu-link" to="/chat"><FaComment/></Link></li>
                                <li><Link className="menu-link" to="/order">Order</Link></li>
                            </ul>
                        </li>
                        <li className='authentication'>
                            <ul>
                                {   user.login?
                                    <li><Link className="menu-link" to="/logout" >Logout</Link></li>:
                                    <>
                                        <li><Link className="menu-link" to="/login/My-Eco">Login</Link></li>
                                        <li><Link className="menu-link" to="/register">Register</Link></li>
                                    </>
                                }
                            </ul>
                        </li>
                    </ul>
                </nav>
            }
            {
                (location.pathname ==="/My-Eco/"|| location.pathname === "/My-Eco") &&
                <div className={`search-container ${mobSearch}`}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="item-search-input focus-outline-none" placeholder="search here" onChange={(e)=>{setSearchValue(e.target.value);}}/>
                            <button className="item-search-btn focus-outline-none"><FaSearch/></button>
                        </form>
                    </div>
                </div>
            }

        </header>
    );
}

export default Navigation;