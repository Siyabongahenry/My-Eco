import "./style.css";
import {useState} from "react";
import { priceFormat } from "../../Services/Format/currency";
export const FilterByCategory =({filterByCategory})=>{
    const[categories,setCategory] = useState([
        {
            name:"All",
            selected:true
        },
        {
            name:"Boots",
            selected:false
        }
        ,
        {
            name:"Formal",
            selected:false
        },
        {
            name:"Sneaker",
            selected:false
        },
        {
            name:"Street-Wear",
            selected:false
        }

    ]);
    const changeCategory = (name)=>{
        setCategory(categories.map((category)=>
        {
            category.selected = category.name === name;
            return category;
        }
        ));
        filterByCategory(name);
    }
    return (
        <div className="store-filter">
            <h3>Filter By Category</h3>
            <ul>
                {
                    categories.map(       
                        (category) =>
                        <li className={`list-select ${category.selected && "selected"}`} onClick={()=>{changeCategory(category.name)}} key={category.name}>
                            {category.name}
                        </li>)
                }
            </ul>
        </div>
    );
}

export const FilterByPrice =({filterByPrice})=>{
    const[prices,setPrice] = useState(
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
            }
        ]
    );
    const changePrice=(lowest,highest)=>{
        setPrice(prices.map((price)=>{
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

export const FilterByPage=({pages,filterByPage})=>{
    return (
            <div className="page-filter-container">
                {pages.map((page)=>
                    <span onClick={()=>{filterByPage(page.number)}} className={`page-filter ${page.selected?'selected':''}`}>{page.number}</span>
                )}
            </div>
    );
}