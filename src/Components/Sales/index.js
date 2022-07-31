import "./style.css";
import { FaCaretRight,FaCaretLeft } from "react-icons/fa";
import { priceFormat } from "../../Services/Format/currency";
const Sales =()=>{
    return (
        <div className="sale-items">
            <h2 className="text-center">Monthly Sales</h2>
            <p className="bg-white p-2 overflow-auto">
                 Sign Up to get notified
                <input className="user-email-input focus-outline-none" type="email" placeholder="email..."/>
                <button className="btn-email-submit focus-outline-none">Submit</button>
            </p>
                
        </div>
    );
}

export default Sales;