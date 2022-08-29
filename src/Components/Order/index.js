import "./style.css";
import { getOrders } from "../../Data/Order/retrieve.order";
import { useEffect, useState } from "react";
import { priceFormat } from "../../Services/Format/currency";
const Order=()=>{
    const[orders,setOrders] = useState([]);
    const[error,setError] = useState(null);
    useEffect(()=>{
            getOrders()
            .then((response)=>{
                setOrders(response);
                console.log(response);
            })
            .catch(setError);
    },[])
    return (
    <div className="order-container container">
        <h1 className="text-center">Order details</h1>
        {
            error === null?(   
                   orders.map((order)=>
                    <div key={order.id}>
                        <div className="p-2 bg-white text-center">
                            <h3 className="text-start">{"Id: "+order.id+" Status: "+order.status}</h3>
                            {
                                order.orderItems.map((item)=>
                                    <div className="text-center d-inline-block p-2" key={item.id}>
                                        <img src={process.env.PUBLIC_URL+`/images/${item.shoe.fileName}`} alt="shoe image"/>
                                        <p>{item.shoe.name}</p>
                                    </div>
                                )
                            }
                            <div className="text-start">
                                <p>Price: { priceFormat(order.subtotal)}</p>
                                <p>Delivery Date: {order.deliveryDate+" "+order.deliveryTime}</p>
                                <p>Delivery address:<address>{order.deliveryAddress}</address></p>
                            </div>
                        </div>
                    </div>
                   
                   )
            ):
            (<div>
                {error}
            </div>)
            
        }
    </div>)
}

export default Order;