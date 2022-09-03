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
        //create a an id for the new item by incrementing the length of the items by 1 if greater than 0
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

        //update cart item
        cartItem = {...cartItem,"quantity":quantity,"subtotal":subtotal}
    }
    //remove the old item in the cart
    cartItems = cartItems.filter(item => item.id !== cartItem.id);

    //add the updated item inside the cart
    cartItems.push(cartItem);
    updateCart();
    
    return cartItems;
}
const updateCart= ()=>{
    //add all items subtotal to find the total cost of all items inside the cart
    let totalPrice = cartItems.reduce((acc,curr)=>acc+curr.subtotal,0);

    //add all items quantity to get the total number of items inside the cart
    let quantity = cartItems.reduce((acc,curr)=>acc+curr.quantity,0);
    
    cart = {
        ...cart,
        "total":totalPrice,
        "quantity":quantity
    };
}

export const remove = (_id)=>{

    //remove item that matches the passed id
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
        ...cartItems.map((item)=>{
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