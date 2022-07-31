import "./style.css";
import Items from "../Items/index";
import Sales from "../Sales/index";
import Pages from "./pages";
import CategoryFilter from "../Filters/category";
import PriceFilter from "../Filters/price";
import ItemsFilter from "../Filters/items";
const Store = ({shoes,filterByCategory,filterByPrice,filterByItems,addToCart,addToFavourite,cartItems,favourite}) =>{
   
    return (
        <div className="store">
            <div className="row">
            <div className="col-12 col-lg-3"></div>
                <div className="col-12 col-lg-4">
                    <CategoryFilter filterByCategory={filterByCategory}/>
                </div>
                <div className="col-12 col-lg-4">
                    <ItemsFilter filterByItems={filterByItems}/>
                </div>
            </div>
            <div className="row">
                <div className="filters col-12 col-lg-3">
                    <PriceFilter filterByPrice={filterByPrice}/>
                    <Sales items={shoes.filter(({discount})=>discount > 0)} addToCart={addToCart}/>
                </div>
                <div className="col-12 col-lg-9">
                    {
                        shoes.length > 0?<Items addToCart={addToCart} cartItems={cartItems} favourite={favourite} addToFavourite={addToFavourite} items={shoes}/>:<div className="text-center">Item not found</div>
                    }
                </div>
                <div className="col-12 col-lg-3"></div>
                <div className="col-12 col-lg-9">
                    <Pages/>
                </div>
            </div>
        </div>
    );
}

export default Store;