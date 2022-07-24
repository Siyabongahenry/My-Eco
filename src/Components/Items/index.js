import "./style.css";
import { Link } from "react-router-dom";
import { FaHeart, FaEye,FaShoppingCart,FaCheckDouble } from "react-icons/fa";
import { priceFormat } from "../../Services/Format/currency";
const Items = ({items,addToCart,addToFavourite,cartItems,favourite})=>{

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
                        <div className="col-6 col-lg-4 p-2" key={shoe.id}>
                            <div className="store-item">
                                <div className="top-btn-group">       
                                    <Link className="btn-view item-btn" to={`/details/${shoe.id}`}><FaEye /></Link>
                                    <button className="btn-fav item-btn" onClick={()=>{addToFavourite(shoe)}}><FaHeart className={IsOnFav(shoe)?"on-fav":""} /><span className="counter">{IsOnFav(shoe)?<FaCheckDouble/>:""}</span></button>
                                    <button className="btn-cart item-btn" onClick={()=>{addToCart(shoe)}}>+<FaShoppingCart />
                                        <span className="counter">{shoeOnCart(shoe)}</span>
                                    </button>     
                                </div>
                                <p className="img-container">
                                    <img src={`/images/${shoe.fileName}`}/>
                                </p>
                                <p className="name">{shoe.name}</p>
                                <p className="price">{priceFormat(shoe.price)}</p>
                            </div>
                        </div>
                )
            }
        </div>
    );

}

export default Items;