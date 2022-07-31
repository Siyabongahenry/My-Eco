import "./style.css";
import { useState } from "react";
import { priceFormat } from "../../Services/Format/currency";

const PriceFilter =({filterByPrice})=>{
    const[prices,setPrices] = useState(
        [
            {
                lowest:0,
                highest:200000,
                text:"None",
                selected:true
            },
            {
                lowest:1000,
                highest:1600,
                text:`${priceFormat(1000)} - ${priceFormat(1600)}`,
                selected:false
            },
            {
                lowest:1600,
                highest:2200,
                text:`${priceFormat(1600)} - ${priceFormat(2200)}`,
                selected:false
            },
            {
                lowest:2200,
                highest:2600,
                text:`${priceFormat(2200)} - ${priceFormat(2600)}`,
                selected:false
            },
            {
                lowest:2600,
                highest:3200,
                text:`${priceFormat(2200)} - ${priceFormat(2600)}`,
                selected:false
            }
            
        ]);
    const changePrice=(lowest,highest)=>{
        setPrices(prices.map((price)=>{
            price.selected = price.lowest === lowest;
            return price;
        }));
        filterByPrice(lowest,highest);
    }
    return (
        <div className="store-filter">
            <h3>Filter By Price</h3>
            <ul>
                {
                    prices.map(
                    (price)=>
                        <li className={`list-select ${price.selected && "selected"}`} key={price.lowest} onClick={()=>{changePrice(price.lowest,price.highest)}}>{price.text}</li>
                    )
                }
            </ul>
        </div>
    );
}

export default PriceFilter;