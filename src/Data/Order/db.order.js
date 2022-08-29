import { getTime,getDate} from "../../Services/Format/date";
export const orders = []

export const add=(_cartItems,_quantity,_total,_paid,{id:_userId,address:_address})=>{

    const generateId = Math.floor(Math.random()*1000000)+1;
    const order = {
        id:generateId,
        userId:_userId,
        orderItems:[..._cartItems],
        subtotal:_total,
        quantity:_quantity,
        payment:{
            type:"",
            amount:"",
            data:"",
            time:""
        },
        deliveryDate:"2022-12-22",
        deliveryTime:"17:00",
        status:"pending",
        deliveryAddress:_address
    }
    orders.push(order);
    return order;
}

