import "./style.css";
import { useParams,Link } from "react-router-dom";
import { priceFormat } from "../../Services/Format/currency";
import {getItems} from "../../Data/fetch.js";
import {FaInfoCircle, FaShoppingCart} from "react-icons/fa";
import { useState,useEffect } from "react";
const Details = ()=>{
    const{id} = useParams();
    const[shoe,setShoe] = useState({});
    useEffect( ()=>{
        const getShoe =async ()=>{
            const data = await getItems(`shoes?id=${id}`)
            setShoe(data[0]);
        }
        getShoe();
    },[]);
    
    return (
    <div className="details">
        <div className="overflow-auto">
            <h1 className="float-start">Details</h1>
            <button className="float-end btn-cart">+ <FaShoppingCart/></button>
        </div>
        <div className="row">
            <div className="col-12 col-lg-6">
                <div className="text-center">
                    <img src={`/images/${shoe.fileName}`}/>
                </div>
                <p className="shoe-name text-center">
                    {shoe.name}
                </p>
                <div className="size-container text-center">
                    <span className="size">4</span>
                    <span className="size">5</span>
                    <span className="size">6</span>
                    <span className="size">7</span>
                    <span className="size">8</span>
                </div>
            </div>
            <div className="col-12 col-lg-6">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Category</td>
                            <td>{shoe.category}</td>
                        </tr>
                        <tr>
                            <td>Size range</td>
                            <td>4 - 8</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td><b>{ priceFormat(shoe.price)}</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-12 col-lg-6">
                <div className="p-2 description">
                    <h6>Description <FaInfoCircle/></h6>
                    <p>
                        {shoe.description}
                    </p>
                </div>
            </div>
            <div className="col-12 col-lg-6 text-center">
                <div className="text-center p-2">
                    <Link to="/" className="btn btn-primary"> Back To Shopping</Link>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Details;