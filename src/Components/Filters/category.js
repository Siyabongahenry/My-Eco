import { useState } from "react";
const CategoryFilter =({filterByCategory})=>{
    const[category,setCategory] = useState("All");
    const changeCategory = (name)=>{
        setCategory(name);
        filterByCategory(name);
    }
    return (
        <>
            <label>Category</label>
            <select value={category} onChange={(e)=>{changeCategory(e.target.value);}}>
                {
                    ["All","Boots","Formal","Sneaker","Street-Wear"].map(       
                        (category) =>
                        <option value={category} key={category}>
                            {category}
                        </option>)
                }
            </select>
        </>
    );
}

export default CategoryFilter;