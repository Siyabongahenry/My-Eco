import "./style.css";
import { FaShoppingCart,FaArrowUp,FaArrowDown,FaTrash } from "react-icons/fa";
import { priceFormat } from "../../Services/Format/currency";
import { Link } from "react-router-dom";
const Cart =({cart,cartItems,delCartItem})=>{
    return (
            <div className="container-fluid cart">
                <h1 className="text-theme"> Shopping Cart <FaShoppingCart/></h1>
                {
                  cartItems.length <= 0?
                    <div>
                        <b>You have nothing in your cart..</b>
                    </div>:
                    <div className="row">
                        {
                            cartItems.map((item)=>{
                                return(
                                <div key={item.id} className="col-12 col-lg-3">
                                    <div className="cart-item">
                                        <div className="overflow-hidden text-center">
                                            <Link className="float-start btn-view" to={`/details/${item.shoe.id}`}>view</Link>
                                            <FaTrash className="float-end text-danger" onClick={()=>{delCartItem(item.id)}}/>
                                            <span className="size">SIZE {item.size}</span>
                                        </div>
                                        <div className="text-center">
                                            <img src={process.env.PUBLIC_URL+`/images/${item.shoe?.fileName}`}/>
                                        </div>
                                        <p className="item-name text-center">
                                            {item.shoe?.name}
                                        </p>
                                        <div >
                                            Quantity: <FaArrowDown className="text-theme"/><span className="quantity">{item.quantity}</span><FaArrowUp className="text-theme"/>
                                            <button className="btn-save-changes">save</button>
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
                        <div className="col-12 col-lg-6">
                            <div className="m-2 cart-summary">
                                <h2>Summary</h2>
                                <p>
                                    Total items: <span className="badge bg-info text-white">{cart.quantity}</span>
                                </p>
                                <p>
                                    Total price: <b>{priceFormat(cart.total)}</b>
                                </p>
                                <div>
                                    <Link className="btn-checkout" to="/payment">Proceed to Checkout</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                }
            </div>
    );

}
export default Cart;