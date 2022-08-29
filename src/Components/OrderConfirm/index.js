import { FaArrowRight } from "react-icons/fa";
import { priceFormat } from "../../Services/Format/currency";
const OrderConfirm =({cart,cartItems,confirmOrder})=>{
    return (
        <div className="row">
            {
                cartItems?.map((item)=>
                <div className="col-6 col-md-4 col-lg-3" key={item.shoe?.fileName}>
                    <div className="p-2 m-2 text-center">
                        <img src={process.env.PUBLIC_URL+`/images/${item.shoe?.fileName}`} width="100px"/>
                    </div>
                </div>
                )
            }
            <div className="col-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>SubTotal</th>
                        </tr>
                    </thead>
                    <tbody>   
                        {
                            cartItems?.map((item)=>
                            <tr key={item.id}>
                                <td>{item.shoe?.name}</td>
                                <td>{item.quantity}</td>
                                <td>{priceFormat(item.subtotal)}</td>
                            </tr>
                            )
                        }
                        <tr>
                            <td>Delivery</td>
                            <td></td>
                            <td>{priceFormat(0)}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-end text-danger">
                    Total Price:{priceFormat(cart.total)}
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={()=>{confirmOrder()}}>Confirm Order <FaArrowRight/></button>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirm;