import { useState } from "react";
import "./style.css";
const Sales =()=>{
    const[email,setEmail] = useState("");
    const handleSubmit = (e)=>{
        e.preventDefault();
    }
    return (
        <div className="sale-items">
            <h2 className="text-center">Monthly Sales</h2>
            <form onSubmit={handleSubmit}>
                <p className="bg-white">
                    Sign Up to get notified
                </p> 
                <div>
                    <input name="email" className="user-email-input focus-outline-none" type="email" placeholder="email..." onChange={(e)=>{setEmail(e.target.value)}}/>
                    <button disabled={true} className="btn-email-submit">Submit</button> 
                </div> 
            </form>   
        </div>
    );
}

export default Sales;