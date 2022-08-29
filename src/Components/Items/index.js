import "./style.css";
import { Link } from "react-router-dom";
import { FaHeart, FaEye,FaShoppingCart,FaCheckDouble,FaTimes } from "react-icons/fa";
import { priceFormat } from "../../Services/Format/currency";
import { discountFormat } from "../../Services/Format/percent";
import { useState } from "react";
const Items = ({items,addToCart,addToFav,cartItems,favourite,removeFromFav})=>{
    //size group for a specific shoe with id equivalent to the shoe id
    const[sizeGroupId,setSizeGroupId] = useState(-1);

    const cartQuantity =(id)=>{
            if(cartItems.some(({shoe:{id:shoeId}})=>shoeId===id))
            {
                let count = cartItems.filter(({shoe:{id:shoeId}})=>shoeId ===id)
                .reduce((acc,curr)=>acc + curr.quantity,0);
                return count;
            }
            return "0";
    }
    const IsOnFav = (id)=>{
        return favourite.some(({id:favId})=>favId === id);
    }
    const handleFav=(shoe)=>{
        if(IsOnFav(shoe.id))
        {
            removeFromFav(shoe.id);
        }
        else{
            addToFav(shoe);
        }
    }
    return (
        <div className="row">
            {   items != null?
                (items.map(
                    (shoe)=>
                        <div className="col-12 col-md-4 p-2" key={shoe.id}>
                            <div className="store-item">
                                <div className="top-btn-group text-center">       
                                    <Link className="btn-view item-btn" to={`/details/${shoe.id}`}><FaEye /></Link>
                                    <button className="btn-fav item-btn" onClick={()=>{handleFav(shoe)}}><FaHeart className={IsOnFav(shoe.id)?"on-fav":""} /><span className="counter">{IsOnFav(shoe.id)?<FaCheckDouble/>:""}</span></button>
                                    <button className="btn-cart item-btn" onClick={()=>{setSizeGroupId(shoe.id)}}>+<FaShoppingCart />
                                        <span className="counter">{cartQuantity(shoe.id)}</span>
                                    </button>     
                                    <span className="discount-tag">{shoe.discount>0 && discountFormat(shoe.discount,shoe.actualPrice)}</span>
                                </div>
                                <div className={`size-group ${sizeGroupId !== shoe.id && 'd-none'}`}>
                                    <FaTimes className="text-danger bg-white" onClick={()=>{setSizeGroupId(-1)}}/>
                                    <h3>Choose your size</h3>
                                    <div>
                                        {
                                            shoe.sizes?.map(({size,quantity})=>
                                            <span key={size} className="size" onClick={()=>{addToCart(shoe,parseInt(size));setSizeGroupId(-1)}}>{size} 
                                                <span className="size-status text-white">
                                                    {
                                                        (quantity ===0 && <span className="text-danger d-block">out of stock</span>) || 
                                                        (quantity < 5 && <span className="text-warning d-block">{`${quantity} remaining`}</span>) ||
                                                        <span className="text-success d-block">In Stock</span>
                                                    }
                                                </span>
                                            </span>
                                            )
                                        }
                                    </div>
                                
                                </div>
                                <p className="img-container">
                                    <img src={process.env.PUBLIC_URL+`/images/${shoe.fileName}`} alt="shoe"/>
                                </p>
                                <p className="name">{shoe.name}</p>
                                <p className="quantity-status">{shoe.quantity > 0?"IN STOCK":"OUT OF STOCK"}</p>
                                <p className="price actual-price">{ shoe.discount > 0 && priceFormat(shoe.actualPrice)}</p>
                                <p className="price">{priceFormat(shoe.price)}</p>
                            </div>
                        </div>
                )
                ):
                <div className="col-12 text-center">
                    Loading items...
                </div>
            }
        </div>
    );

}

export default Items;