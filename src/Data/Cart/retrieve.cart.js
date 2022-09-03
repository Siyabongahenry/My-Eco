import { add,cart,cartItems,remove,clear,updateQuantity } from "./db.cart";
import { shoes } from "../Shoes/db.shoes";
export const addCartItem = (_shoe,_size)=> {
    const promise = new Promise((accept,reject)=>{
        //check if shoe exist
        const shoeExistInStore = shoes.some(({id})=> id === _shoe.id);
        if(shoeExistInStore)
        {
            accept(add(_shoe,_size));
        }
        else
        {
            reject();
        }
    });
    return  promise;
}

export const getCart =()=>{
    const promise = new Promise((accept,reject)=>{
        if(cart !== null)
        {
            accept(cart);
        }
        else{
            reject("An error occured");
        }
    });
    return promise;
}

export const getCartItems =()=>{
    const promise = new Promise((accept,reject)=>{
        if(cartItems.length >= 0)
        {
            accept(cartItems);
        }
        else{
            reject("Items could not be found");
        }
    })
    return promise;
}

export const updateCartItemQuantity = (_itemId=null,_quantity=null)=>{
    const promise = new Promise((accept,reject)=>{
        if(_itemId !=null && _quantity != null)
        {
            accept(updateQuantity(_itemId,_quantity));
        }
        else{
            reject("The id or the quantity was null");
        }
    });
    return promise;
}
export const removeCartItem = (_id)=>{
    const promise = new Promise((accept,reject)=>{
        let itemExist = cartItems.some(({id})=> id === _id);
        if(itemExist)
        {
            accept(remove(_id));
        }
        else
        {
            reject("Item could not be found");
        }
    });
    return promise;
}

export const clearCartItems=()=>{  
    return clear();   
}