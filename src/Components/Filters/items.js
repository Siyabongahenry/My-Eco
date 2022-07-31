import { useState,useEffect } from "react";
const ItemsFilter = ({filterByItems})=>{
    const[number,setNumber] = useState(4);
    useEffect(()=>{
        filterByItems(number);
    },[number]);


    return (
        <>
        Only show
            <select value={number} onChange={(e)=>{setNumber(e.target.value)}}>
                {[2,4,6,8,10,12,14,16,18,20].map((no)=>
                    <option key={no} value={no}>{no}</option>
                )}
            </select>
        </>
    );
}

export default ItemsFilter;