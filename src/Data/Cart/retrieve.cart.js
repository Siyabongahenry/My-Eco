import { add,cart,cartItems,remove } from "./db.cart";
import { shoes } from "../Shoes/db.shoes";
export const addCartItem = (_shoe,_size)=> {
    const promise = new Promise((accept,reject)=>{
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