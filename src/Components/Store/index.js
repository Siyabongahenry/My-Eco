import "./style.css";
import Items from "../Items/index";
import Sales from "../Sales/index";
import { FilterByCategory,FilterByPrice } from "../Filters/index";
const Store = ({shoes,filterByCategory,filterByPrice,addToCart,addToFavourite,cartItems,favourite}) =>{
   
    return (
        <div className="store">
            <div className="row">
                <div className="filters col-12 col-lg-3">
                    <FilterByCategory filterByCategory={filterByCategory}/>
                    <FilterByPrice filterByPrice={filterByPrice}/>
                </div>
                <div className="col-12 col-lg-6">
                    {
                        shoes.length > 0?<Items addToCart={addToCart} cartItems={cartItems} favourite={favourite} addToFavourite={addToFavourite} items={shoes}/>:<div className="text-center">Item not found</div>
                    }
                </div>
                <div className="col-12 col-lg-3">
                    <Sales items={shoes.filter(({discount})=>discount > 0)} addToCart={addToCart}/>
                </div>
                
            </div>
        </div>
    );
}

export default Store;