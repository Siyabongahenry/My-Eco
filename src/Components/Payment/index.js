import "./style.css";
import { priceFormat } from "../../Services/Format/currency";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
const Payment = ({total})=>{
    const user = useContext(UserContext);
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    return (
    <div className="container payment-container p-2">
        <h1>Online Payment</h1>
        {
            user.login?
            (
            <form onSubmit={handleSubmit}> 
                <div>
                    <input type="text" placeholder="card number"  className="form-control  m-1"/>
                </div>
                <div className="row">
                    <div className="col-6">
                        <input type="text" placeholder="Exp(MM/YYYY)" className="form-control  m-1"/>
                    </div>
                    <div className="col-6">
                        <input type="text" placeholder="CVC/CVV" className="form-control  m-1"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <input type="text" placeholder="Postal code" className="form-control m-1"/>
                    </div>
                    <div className="col-6">
                        <select className="form-control  m-1">
                            <option>South Africa</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-auto text-center p-2 bg-white mb-2">
                    <span className="text-success p-2"> Total: {priceFormat(total)} </span>
                    <img src={process.env.PUBLIC_URL+`/images/payment/card.png`} alt="card image"/>
                    <button className="btn btn-success">Confirm Payment</button>
                </div>
            </form>
            ):
            (
                <div className="text-center">
                    Please login to procceed with your order<br/>
                    <Link to="/login/payment" className="btn btn-primary">Login</Link>
                </div>
            )
        }
    </div>);
}

export default Payment;