import "./style.css";
import { FaCaretRight,FaCaretLeft } from "react-icons/fa";
import { priceFormat } from "../../Services/Format/currency";
const Sales =({items,addToCart})=>{
    return (
        <div className="sale-items">
            <h2 className="text-center">Monthly Sales</h2>
            {   items.length >= 1?
                items.map(
                    (item)=>
                    <div className="sale-item" key={item.id}>
                        <p className="sale-percent">
                            <span className="percent-tag">{Math.round((item.discount/item.originalPrice)*100)}% off</span>
                        </p>
                        <div className="text-center">
                            <img src={`/images/${item.fileName}`}/>
                        </div>
                        <p className="name">{item.name}</p>
                        <p className="price"><span className="old-price">{priceFormat(item.originalPrice)}</span><span className="new-price">{priceFormat(item.price)}</span></p>
                        <div className="p-2">
                            <button className="btn-cart" onClick={()=>{addToCart(item)}}>+Add to Cart</button>
                        </div>
                        <button className="btn-next btn-change-sale"><FaCaretRight/><br/><small>See More</small></button>
                        <button className="btn-prev btn-change-sale"><FaCaretLeft/></button>
                    </div>

                ):
              
                <p className="bg-white p-2 overflow-auto">
                    Share your email to get notified when we have discounts
                    <input className="user-email-input focus-outline-none" type="email" placeholder="email..."/>
                    <button className="btn-email-submit focus-outline-none">Submit</button>
                </p>
                
            }
        </div>
    );
}

export default Sales;