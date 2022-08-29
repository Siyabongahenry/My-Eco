import { useEffect, useState } from "react";
import { FaCheck,FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderComplete = ({orderId})=>{
    return (
    <div className="text-success text-center container p-2">
        <div className="text-success">
            <h1> 
                <FaCheck/><br/>
                Congratulation you have successfully placed your order, Your order  Id is {orderId}.
                Further information will be communicated to you via emails.
            </h1>
            <Link className="btn btn-success" to="/order">Track Your Order Status here</Link>
        </div>
    </div>
    );
}

export default OrderComplete;