export let cart ={
    "id":0,
    "total": 0,
    "cartItems":[],
    "quantity": 0
};

export let cartItems =[];

export const add = (_shoe,_size)=>{
    //try to find shoe inside the shopping car
    let cartItem = cartItems.find(({shoe:{id},size})=>id === _shoe.id && size ===_size);

    //if the shoe does not exist add it as a new cartItem
    if(cartItem === undefined)
    {
        let cartItemId = cartItems.length ===0?0:cartItems[cartItems.length-1].id+1;
        cartItem = {
            "id":cartItemId,
            "cartId":cart.id,
            "shoe":_shoe,
            "size":_size,
            "quantity":1,
            "subtotal":_shoe.price
        }
    }
    else{
        let{quantity,subtotal,shoe:{price}} = cartItem;
        quantity ++;
        subtotal = price*quantity;
        cartItem = {...cartItem,"quantity":quantity,"subtotal":subtotal}
    }
    cartItems = cartItems.filter(item => item.id !== cartItem.id);
    cartItems.push(cartItem);
    updateCart();
    
    return cartItems;
}
const updateCart= ()=>{
    let totalPrice = cartItems.reduce((acc,curr)=>acc+curr.subtotal,0);
    let quantity = cartItems.reduce((acc,curr)=>acc+curr.quantity,0);
    
    cart = {
        ...cart,
        "total":totalPrice,
        "quantity":quantity
    };
}

export const remove = (_id)=>{
   cartItems =  cartItems.filter(({id})=> id !== _id);
   updateCart();
   return cartItems;
}
export const clear=()=>{
    cartItems = [];
    updateCart();
    return cartItems;
}

export const updateQuantity = (_id,_quantity)=>{
    cartItems=[
        ...cartItems.filter((item)=>{
            if(item.id  === _id)
            {
                item.quantity = _quantity;
                item.subtotal = item.quantity * item.shoe.price;
            }
            return item;
        })
    ]
    updateCart();
    return cartItems;
}