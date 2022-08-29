import "./style.css";
import { FaShoppingCart,FaMinus,FaTrash, FaPlus,FaEye} from "react-icons/fa";
import { priceFormat } from "../../Services/Format/currency";
import { Link, useNavigate } from "react-router-dom";
import emptyCart from "./empty-cart.svg";
import onlinePayment from "./online.png";
import { UserContext } from "../../App";
import { useContext } from "react";
const Cart =({cart,cartItems,delCartItem})=>{

    const user = useContext(UserContext);
    const navigate = useNavigate();
    const handleCheckout = ()=>{
        if(!user.login)
        {
            navigate("/login/payment");
        }
        else
        {
            navigate("/payment");
        }
    }
    return (
            <div className="container-fluid cart">
                <h1 className="text-theme"> Shopping Cart <FaShoppingCart/></h1>
                {
                cartItems ===null?<p>loading..</p>:
                (
                    cartItems.length <= 0?
                        <div  className="text-center">
                            <b>You have nothing in your cart..</b><br/> 
                            <img src={emptyCart} alt="empty-cart "/> 
                        </div>:
                        <div className="row">
                            <div className="col-12 col-lg-8">
                                <div className="row">
                                    {
                                        cartItems.map((item)=>{
                                            return(
                                            <div key={item.id} className="col-12 col-lg-6">
                                                <div className="cart-item">
                                                    <div className="overflow-hidden text-center">
                                                        <Link className="float-start btn-view" to={`/details/${item.shoe.id}`}><FaEye/></Link>
                                                        <FaTrash className="float-end text-danger" onClick={()=>{delCartItem(item.id)}}/>
                                                        <span className="size">SIZE {item.size}</span>
                                                    </div>
                                                    <div className="text-center">
                                                        <img src={process.env.PUBLIC_URL+`/images/${item.shoe?.fileName}`} alt="shoe"/>
                                                    </div>
                                                    <p className="item-name text-center">
                                                        {item.shoe?.name}
                                                    </p>
                                                    <div className="text-center">
                                                        Quantity: {item.quantity > 1 && <FaMinus className="btn-quantity"/>} <span className="quantity">{item.quantity}</span> <FaPlus className="btn-quantity"/>
                                                        <br/><button className="btn-save-changes m-2">save</button>
                                                    </div>
                                                    <p className="item-price">
                                                        { priceFormat(item.shoe?.price)}
                                                    </p>
                                                    <p className="text-end">
                                                        <b>subtotal: { priceFormat(item.subtotal)}</b>
                                                    </p>
                                                </div>
                                            </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <div className="m-2 cart-summary">
                                    <h2>Summary</h2>
                                    <div className="row">
                                        <div className="text-center col-12 col-md-4">
                                            <img src={onlinePayment} width="100px" alt="secured"/>
                                        </div>
                                        <div className=" col-12 col-md-8">
                                            <p>
                                                Total items: <span className="badge bg-info text-white">{cart.quantity}</span>
                                            </p>
                                            <p>
                                                Delivery Price: <span className="text-success">R 0.00</span>
                                            </p>
                                            <p>
                                                Total price: <b>{priceFormat(cart.total)}</b>
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn-checkout" onClick={handleCheckout} >Proceed to Checkout</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        )
                }
            </div>
    );

}
export default Cart;