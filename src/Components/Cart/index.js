import "./style.css";
import { FaShoppingCart,FaArrowUp,FaArrowDown,FaTrash, FaEye } from "react-icons/fa";
import { priceFormat } from "../../Services/Format/currency";
import { useState } from "react";
const Cart =({cart,cartItems,delCartItem})=>{
    return (
            <div className="container-fluid cart">
                <h1 className="text-center text-theme"><FaShoppingCart/></h1>
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
                                            <FaEye className="float-start text-theme"/>
                                            <FaTrash className="float-end text-danger" onClick={()=>{delCartItem(item.id)}}/>
                                            <span className="size">size: 0</span>
                                        </div>
                                        <div className="text-center">
                                            <img src={`images/${item.shoe.fileName}`}/>
                                        </div>
                                        <p className="item-name text-center">
                                            {item.shoe.name}
                                        </p>
                                        <div >
                                            Quantity: <FaArrowDown className="text-theme"/><span className="quantity">{item.quantity}</span><FaArrowUp className="text-theme"/>
                                            <button className="btn-save-changes">save changes</button>
                                        </div>
                                        <p className="item-price">
                                            { priceFormat(item.shoe.price)}
                                        </p>
                                        <p className="text-end">
                                            <b className="text-theme">subtotal: { priceFormat(item.subtotal)}</b>
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
                                    <button className="btn-checkout">Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                }
            </div>
    );

}
export default Cart;