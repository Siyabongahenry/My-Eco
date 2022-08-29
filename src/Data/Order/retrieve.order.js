import { orders } from "./db.order";
import { add } from "./db.order";

export const getOrders = ()=>{
    const promise = new Promise((accept,reject)=>{
        if(orders.length > 0)
        {
            accept(orders);
        }
        else{
            reject("Orders not found");
        }
    });
    return promise;
}

export const getOrder = (id)=>{
    const promise = new Promise((accept,reject)=>{
        const order = orders.find(({id:orderId})=> orderId === id);
        if(order !== undefined)
        {
            accept(order)
        }
        else
        {
            reject("The was an error while trying to retrieve the order");
        }
    });

    return promise;
}

export const addOrder =(_cartItems,_quantity,_total,_paid,_user)=>{
    const promise = new Promise((accept,reject)=>{
        setTimeout(()=>{
            if(_cartItems.length > 0 && _total > 0 && _paid > 0)
            {
                const order= add(_cartItems,_quantity,_total,_paid,_user);
                accept(order);
            }
            else
            {
                reject("Order could not be accepted due to faulty details.");
            }
        },3000);
    });
    return promise;
}