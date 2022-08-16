import "./style.css";
import { useParams,Link } from "react-router-dom";
import { priceFormat } from "../../Services/Format/currency";
import {getShoe as getShoeFromDb} from "../../Data/Shoes/retrieve.shoes";
import {FaInfoCircle, FaShoppingCart} from "react-icons/fa";
import { useState,useEffect } from "react";
const Details = ({addToCart})=>{
    const{id} = useParams();
    const[shoe,setShoe] = useState(null);
    const[fileName,setFileName] = useState("");
    const[selectedSize,setSelectedSize] = useState(0);
    const[error,setError] = useState(null);

    useEffect( ()=>{
        const getShoe = ()=>{
            getShoeFromDb(id)
            .then((data)=>{
                setShoe(data);
                setFileName(data.files[0]);
                setSelectedSize(data.sizes[0].size);
            })
            .catch((e)=>{
                setError("Something went wrong");
            });
        }
        getShoe();
    },[]);
     
    return (
    <div className="details">
    { 
        shoe === null?<h3 className="text-center">Item not found</h3>:
        <>
            <div className="overflow-auto">
                <button className="float-end btn-cart" onClick={()=>{addToCart(shoe,selectedSize)}}>+ <FaShoppingCart/></button>
                <h1 className="shoe-name">
                        {shoe.name}
                </h1>
            </div>
            <div className="row">
                <div className="col-12 col-lg-6">
                    <div className="text-center">
                        <img src={process.env.PUBLIC_URL+`/images/${fileName}`}/>
                        <div className="thumb-nails">
                            {     
                                shoe.files.map((file)=>
                                    <div key={file} className={`thumb-nail ${fileName == file && "selected"}`} onClick={()=>{setFileName(file)}}>
                                        <img src={process.env.PUBLIC_URL+`/images/${file}`}/>
                                    </div>
                                )
                                
                            }
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Details</th>
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
                                <td>{shoe.sizes.length > 0 && `${shoe.sizes[0].size} - ${shoe.sizes[shoe.sizes.length-1].size}`}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td><b>{ priceFormat(shoe.price)}</b></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="sizes">
                        <h4 className="text-center">Sizes</h4>
                        <div className="size-container text-center">
                            {
                                shoe.sizes.map((sizeObj)=>
                                <span key={sizeObj.size} className={`size ${selectedSize === sizeObj.size && "selected"}`} onClick={()=>{
                                    setSelectedSize(sizeObj.size)}} data-status={"out of stock"}>
                                    {sizeObj.size}
                                    <span className="size-status">
                                        {sizeObj.quantity ===0 && "out of stock" || sizeObj.quantity <= 5 && `${sizeObj.quantity} remaining` || <span className="text-success">In Stock</span>}
                                    </span>
                                </span>)
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="p-2 description">
                        <h6>More <FaInfoCircle/></h6>
                        <p>
                            {shoe.description}
                        </p>
                    </div>
                </div>
                <div className="col-12 col-lg-6 text-center">
                    <div className="text-center p-2">
                        <Link to="/My-Eco/" className="btn btn-primary"> Back To Shopping</Link>
                    </div>
                </div>
            </div>
        </>
    }   
    </div>
    );
}

export default Details;