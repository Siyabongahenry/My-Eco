import "./style.css";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import Profile from "../Profile";
import OrderComplete from "../OrderComplete";
import CardPayment from "../CardPayment";
import OrderConfirm from "../OrderConfirm";
import { addOrder as addOrderToDb } from "../../Data/Order/retrieve.order";
import { FaArrowRight } from "react-icons/fa";
const Payment = ({cart,cartItems,clearCart})=>{
    const user = useContext(UserContext);
    const[payment,setPayment] = useState({
        userProfile:true,
        orderConfirm:false,
        cardPayment:false,
        orderComplete:false,
        order:null
    }); 
    const confirmProfile = ()=>{
        setPayment({...payment,userProfile:false,orderConfirm:true});
    }
    const confirmOrder = ()=>{
        setPayment((prevPayment)=>({...prevPayment,orderConfirm:false,cardPayment:true}))
        
        addOrderToDb(cartItems,cart.quantity,cart.total,cart.total,user.details)
        .then((_order)=>{
            clearCart();
            setPayment((prevPayment)=>({...prevPayment,order:_order}));
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    const confirmPayment = ()=>{
        setPayment({...payment,cardPayment:false,orderComplete:true});
    }
    return (
    <div className="container p-2 payment-container">
        <h1 className="text-center">Online Payment</h1>  
        {
            user.login && <>{
                (payment.userProfile && <>
                    <div className="text-end text-info">
                        2 steps remaining
                    </div>
                    <p className="text-center">
                        Please confirm all your details
                    </p>
                    <Profile/>
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={confirmProfile}>Confirm Details <FaArrowRight/></button>
                    </div>
                </>)||
                (payment.orderConfirm && <>
                    <div className="text-end text-info">
                        1 steps remaining
                    </div>
                    <OrderConfirm cart={cart} cartItems={cartItems} confirmOrder={confirmOrder}/>
                </>) ||
                (payment.cardPayment && <>
                    <div className="text-end text-info">
                        0 steps remaining
                    </div>
                    <div>
                        {
                            payment.order !==null?<CardPayment confirmPayment={confirmPayment} total={payment.order?.subtotal} orderId={payment.order?.id}/>:
                            <p>loading....</p>
                        }
                    </div>
                </>)||
                (payment.orderComplete && <OrderComplete orderId={payment.order?.id}/>)
             }
            </>
        }  
    </div>);
}

export default Payment;