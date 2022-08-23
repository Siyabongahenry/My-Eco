import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
const OrderComplete = ()=>{
    return (
    <div className="text-success text-center container p-2">
        <h1> <FaCheck/><br/>Congratulation you have successfully placed your order</h1>
        <Link className="btn btn-success" to="/order">Track Your Order Status here</Link>
    </div>
    );
}

export default OrderComplete;