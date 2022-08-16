import "./style.css";
import { priceFormat } from "../../Services/Format/currency";
const Payment = ({total})=>{
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    return (
    <div className="container payment-container">
        <h1>Online Payment</h1>
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
                <img src={process.env.PUBLIC_URL+`/images/payment/card.png`} alt="cart image"/>
                <button className="btn btn-success">Confirm Payment</button>
            </div>
        </form>
    </div>);
}

export default Payment;