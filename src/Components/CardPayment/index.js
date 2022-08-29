import "./style.css";
import { priceFormat } from "../../Services/Format/currency";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
const CardPayment = ({total,orderId,confirmPayment})=>{
    const[cardDetails,setCardDetails] = useState({
        cardNumber:"",
        expiryDate:"",
        cvc:"",
        postalCode:"",
        country:""
    });
    const[error,setError] = useState({
        cardNumber:"",
        cvc:"",
        expiryDate:"",
        postalCode:""
    });
    const validateCardNumber = ()=>{
        const cardNoPattern = /^\d{8,}$/;
        if(cardDetails.cardNumber.search(cardNoPattern) >= 0)
        {
            setError((prevError)=>({...prevError,cardNumber:""}));
            return true;
        }
        setError((prevError)=>({...prevError,cardNumber:"This is not a valid card number"}));
        return false;
    }
    const validateCVC = ()=>{
        const cvcPattern = /^\d{3}$/;
        if(cardDetails.cvc.search(cvcPattern) >= 0)
        {
            setError((prevError)=>({...prevError,cvc:""}));
            return true;
        }
        setError((prevError)=>({...prevError,cvc:"This is not a valid cvc/cvv"}));
        return false;
    }
    const validateExpiryDate =()=>{
        let todayDate = new Date();
        let expiryDate = new Date(cardDetails.expiryDate);
        
        if(expiryDate > todayDate)
        {
            setError((prevErr)=>({...prevErr,expiryDate:""}));
            return true
        }
        setError((prevErr)=>({...prevErr,expiryDate:"The expiry date is invalid"}));
        return false;
    }
    const validatePostalCode =()=>{
        if(isNaN(cardDetails.postalCode))
        {
            setError((prevErr)=>({...prevErr,postalCode:"This is not a valid postal code."}));
            return false;
        }
        else{
            setError((prevErr)=>({...prevErr,postalCode:""}));
            return true;
        }
    }
    const handleChange = (e)=>{
        setCardDetails({...cardDetails,[e.target.name]:e.target.value});
        validateExpiryDate();
    }
    const handleSubmit=(e)=>{
        e.preventDefault();

        let isValidCardNo = validateCardNumber();
        let isValidCVC = validateCVC();
        let isValidExpiryDate = validateExpiryDate();
        let isValidPostalCode = validatePostalCode();
   
        if(isValidCardNo && isValidCVC && isValidExpiryDate && isValidPostalCode)
        {
            confirmPayment();
        }
        else
        {
            return;
        }
    }
    return (
        <div className="card-payment-container">
            <p>
                Order Id:{orderId}<br/>
                <span className="text-danger">Amount due to you:{priceFormat(total)}</span>
            </p>
             <form onSubmit={handleSubmit}> 
                <div>
                    <input type="text" name="cardNumber" onChange={handleChange} placeholder="card number"  className="form-control  m-1"/>
                    <span className="text-danger">{error.cardNumber}</span>
                </div>
                <div className="row">
                    <div className="col-6">
                        <input type="date" name="expiryDate"  onChange={handleChange} placeholder="Exp(MM/YYYY)" className="form-control  m-1"/>
                        <span className="text-danger">{error.expiryDate}</span>
                    </div>
                    <div className="col-6">
                        <input type="text" name="cvc"  onChange={handleChange} placeholder="CVC/CVV" className="form-control  m-1"/>
                        <span className="text-danger">{error.cvc}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <input type="text" name="postalCode"  onChange={handleChange} placeholder="Postal code" className="form-control m-1"/>
                        <span className="text-danger">{error.postalCode}</span>
                    </div>
                    <div className="col-6">
                        <select className="form-control  m-1"  onChange={handleChange} value="South Africa" name="country">
                            <option value="South Africa">South Africa</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-auto text-center p-2 bg-white mb-2">
                    <img src={process.env.PUBLIC_URL+`/images/payment/card.png`} alt="card image"/>
                    <button className="btn btn-success">Confirm Payment <FaCheck/></button>
                </div>
            </form>
        </div>
    );
}


export default CardPayment;