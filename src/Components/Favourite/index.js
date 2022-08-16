import "./style.css";
import { priceFormat } from "../../Services/Format/currency";
import { FaTrash,FaShoppingCart } from "react-icons/fa";
const Favourite =({shoes,removeFromFav,addToCart})=>{
    return (
        <div className="fav-container">
            <h1>Favourite</h1>
             {
                shoes.length === 0?"You have nothing in your favourite":
                <div className="row">
                    {
                        shoes.map((shoe)=>
                        <div className="col-12 col-md-6 col-lg-4" key={shoe.id}>
                            <div className="fav-item">
                                <div className="overflow-auto">
                                    <FaTrash className="float-start" onClick={()=>{removeFromFav(shoe.id)}}/>
                                    <FaShoppingCart className="float-end btn-cart" onClick={()=>{addToCart(shoe,5)}}/>
                                </div>
                                <div className="text-center">
                                    <img src={process.env.PUBLIC_URL+`/images/${shoe.fileName}`}/>
                                </div>
                                <p className="shoe-name p-2">{shoe.name}</p>
                                <p className="shoe-price p-2 text-end">{priceFormat(shoe.price)}</p>
                            </div>
                        </div>)
                    }
                </div>
            }
        </div>
    );
}
export default Favourite;