import "./style.css";
import { Link } from "react-router-dom";
import { FaHeart, FaEye,FaShoppingCart,FaCheckDouble } from "react-icons/fa";
import { priceFormat } from "../../Services/Format/currency";
import { discountFormat } from "../../Services/Format/percent";
import { useState } from "react";
const Items = ({items,addToCart,addToFavourite,cartItems,favourite})=>{
    //size group for a specific shoe with id equivalent to the shoe id
    const[sizeGroupId,setSizeGroupId] = useState(-1);

    const shoeOnCart =(shoe)=>{
            if(cartItems.some(({shoe:{id}})=>id===shoe.id))
            {
                return cartItems.find(({shoe:{id}})=>id === shoe.id).quantity;
            }
            return "0";
    }
    const IsOnFav = (shoe)=>{
        return favourite.some(({id})=>id === shoe.id);
    }
    return (
        <div className="row">
            {
                items.map(
                    (shoe)=>
                        <div className="col-6 col-md-4 p-2" key={shoe.id}>
                            <div className="store-item">
                                <div className="top-btn-group text-center">       
                                    <Link className="btn-view item-btn" to={`/details/${shoe.id}`}><FaEye /></Link>
                                    <button className="btn-fav item-btn" onClick={()=>{addToFavourite(shoe)}}><FaHeart className={IsOnFav(shoe)?"on-fav":""} /><span className="counter">{IsOnFav(shoe)?<FaCheckDouble/>:""}</span></button>
                                    <button className="btn-cart item-btn" onClick={()=>{setSizeGroupId(shoe.id)}}>+<FaShoppingCart />
                                        <span className="counter">{shoeOnCart(shoe)}</span>
                                    </button>     
                                    <span className="discount-tag">{shoe.discount>0 && discountFormat(shoe.discount,shoe.actualPrice)}</span>
                                </div>
                                <div className={`size-group ${sizeGroupId !== shoe.id && 'd-none'}`}>
                                    <h3>Choose your size</h3>
                                    <div>
                                        {
                                            shoe.sizes.map(({size,quantity})=>
                                            <span key={size} className="size" onClick={()=>{addToCart(shoe,size);setSizeGroupId(-1)}}>{size} 
                                                <span className="size-status text-white">
                                                    {
                                                        quantity ===0 && <span className="bg-danger d-block">out of stock</span> || 
                                                        quantity < 5 && <span className="bg-warning d-block">{`${quantity} remaining`}</span> ||
                                                        <span className="bg-success d-block">In Stock</span>
                                                    }
                                                </span>
                                            </span>
                                            )
                                        }
                                    </div>
                                    <button className="btn btn-danger mt-2" onClick={()=>{setSizeGroupId(-1)}}>cancel</button>
                                </div>
                                <p className="img-container">
                                    <img src={`/images/${shoe.fileName}`}/>
                                </p>
                                <p className="name">{shoe.name}</p>
                                <p className="quantity-status">{shoe.quantity > 0?"IN STOCK":"OUT OF STOCK"}</p>
                                <p className="price actual-price">{ shoe.discount > 0 && priceFormat(shoe.actualPrice)}</p>
                                <p className="price">{priceFormat(shoe.price)}</p>
                            </div>
                        </div>
                )
            }
        </div>
    );

}

export default Items;