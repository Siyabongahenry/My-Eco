import "./style.css";
import { useParams,Link } from "react-router-dom";
import { priceFormat } from "../../Services/Format/currency";
import {getShoe as getShoeFromDb} from "../../Data/Shoes/retrieve.shoes";
import {FaInfoCircle, FaShoppingCart} from "react-icons/fa";
import { useState,useEffect } from "react";
const Details = ({addToCart})=>{
    const{id} = useParams();
    const[details,setDetails] = useState({
        shoe:null,
        selectedFile:null,
        selectedSize:null,
        error:null,
        showCartLink:false
    });

    useEffect( ()=>{
        const getShoe = ()=>{
            getShoeFromDb(parseInt(id))
            .then((data)=>{
                setDetails({...details,shoe:data,selectedFile:data.files[0],selectedSize:data.sizes[0].size});
            })
            .catch((e)=>{
                setDetails({...details,error:e});
            });
        }
        getShoe();
    },[]);
     const addItemToCart = (_shoe,_selectedSize)=>{
        addToCart(_shoe,_selectedSize);
        setDetails({...details,showCartLink:true});
     }
    return (
    <div className="details">
    { 
        details.shoe === null?<h3 className="text-center">Loading item...</h3>:
        <>
            <div className="overflow-auto">
                <button className="float-end btn-cart" onClick={()=>{addItemToCart(details.shoe,details.selectedSize)}}>+size {details.selectedSize} <FaShoppingCart/></button>
                <h1 className="shoe-name">
                        {details.shoe.name}
                </h1>
            </div>
            <div className="text-center mb-2">
                {
                    details.showCartLink &&
                    <div className="cart-link">
                        <button onClick={()=>{setDetails({...details,showCartLink:false})}}>x</button>
                        <span>You have added size {details.selectedSize} of this shoe in your cart, for payments please procceed to cart.</span><br/>
                        <Link className="btn btn-success" to="/cart"><FaShoppingCart/> Go to Cart</Link>
                    </div>
                }
            </div>
            <div className="row">
                <div className="col-12 col-lg-6">
                    <div className="text-center">
                        <img src={process.env.PUBLIC_URL+`/images/${details.selectedFile}`}/>
                        <div className="thumb-nails">
                            {     
                                details.shoe.files.map((file)=>
                                    <div key={file} className={`thumb-nail ${details.selectedFile == file && "selected"}`} onClick={()=>{setDetails({...details,selectedFile:file})}}>
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
                                <td>{details.shoe.category}</td>
                            </tr>
                            <tr>
                                <td>Size range</td>
                                <td>{details.shoe.sizes.length > 0 && `${details.shoe.sizes[0].size} - ${details.shoe.sizes[details.shoe.sizes.length-1].size}`}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td><b>{ priceFormat(details.shoe.price)}</b></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="sizes">
                        <h4 className="text-center">Sizes</h4>
                        <div className="size-container text-center">
                            {
                                details.shoe.sizes.map((sizeObj)=>
                                <span key={sizeObj.size} className={`size ${details.selectedSize === sizeObj.size && "selected"}`} onClick={()=>{
                                    setDetails({...details,selectedSize:sizeObj.size})}} data-status={"out of stock"}>
                                    {sizeObj.size}
                                    <span className="size-status">
                                        {(sizeObj.quantity ===0 && "out of stock") || (sizeObj.quantity <= 5 && `${sizeObj.quantity} remaining`) || <span className="text-success">In Stock</span>}
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
                            {details.shoe.description}
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