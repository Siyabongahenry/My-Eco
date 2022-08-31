import "./style.css";
import Items from "../Items/index";
import CategoryFilter from "../Filters/category";
import PriceFilter from "../Filters/price";
import { FaCaretDown,FaAngleUp} from "react-icons/fa";
const Store = ({shoes,getMoreShoes,filterByCategory,filterByPrice,filterByItems,addToCart,addToFav,cartItems,favourite,removeFromFav}) =>{
   
    return (
        <div className="store">
            <div className="text-center">
                <CategoryFilter filterByCategory={filterByCategory}/>
            </div>
            <div className="row">
                <div className="filters col-12 col-lg-3">
                    <PriceFilter filterByPrice={filterByPrice}/>
                </div>
                <div className="col-12 col-lg-9">   
                    <Items addToCart={addToCart} cartItems={cartItems} favourite={favourite} addToFav={addToFav} items={shoes} removeFromFav={removeFromFav}/>
                    <div className="text-center">
                        <button className="btn-show-more focus-outline-none" onClick={getMoreShoes}>show more <FaCaretDown/></button>
                    </div>
                </div>
                <div className="col-12 col-lg-3"></div>
            </div>
            <button className="btn-scroll-up" onClick={()=>{window.scrollTo(0,0)}}><FaAngleUp /></button>
        </div>
    );
}

export default Store;