import "./style.css";
import { Link,useNavigate} from "react-router-dom";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
const Register = ({registerUser})=>{

    const navigate = useNavigate();
    const[user,setUser]= useState({
            firstName:"",
            lastName:"",
            cellNo:"",
            address:"",
            email:"",
            password:""
    });
    const[error,setError] = useState({
        firstName:"",
        lastName:"",
        cellNo:"",
        address:"",
        email:"",
        password:""
    });
   
    const handleChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const validateName = (_name)=>{
        let namePattern = /^[a-zA-Z]{3,15}$/;
        if(_name.search(namePattern) >= 0)
        {
            return true;
        }
        return false;
    }
    const validateFirstName = ()=>{
        if(validateName(user.firstName))
        {
            setError((prevErr)=>({...prevErr,firstName:""}));
            return true;
        }
        setError((prevErr)=>({...prevErr,firstName:"Please enter a valid first name"}));
        return false;
    }
    const validateLastName = ()=>{
        if(validateName(user.lastName))
        {
            setError((prevErr)=>({...prevErr,lastName:""}));
            return true;
        }
        setError((prevErr)=>({...prevErr,lastName:"Please enter a valid last name"}));
        return false;
    }
    const validateCellNo = ()=>{
        let cellNoPattern = /^0\d{9}$/;
        if(user.cellNo.search(cellNoPattern) >= 0)
        {
            setError((prevErr)=>({...prevErr,cellNo:""}));
            return true;
        }
        setError((prevErr)=>({...prevErr,cellNo:" your cell no are not valid in SA, for the sake of this project use 10 random numbers."}));
        return false;
    }
    const validateAddress = ()=>{
        if(user.address.length > 10)
        {
            setError((prevErr)=>({...prevErr,address:""}));
            return true;
        }
        setError((prevErr)=>({...prevErr,address:"This is not a valid address."}));
        return false;
    }
    const validateEmail = ()=>{
        let emailPattern = /^(.+)@(.+){2,}\.(.+){2,}$/;
        if(user.email.search(emailPattern) >= 0)
        {
            setError((prevErr)=>({...prevErr,email:""}));
            return true;
        }
        setError((prevErr)=>({...prevErr,email:"This email is invalid"}));
        return false;
    }
    const validatePassword =()=>{
        if(user.password.length >= 6)
        {
            setError((prevErr)=>({...prevErr,password:""}));
            return true;
        }
        setError((prevErr)=>({...prevErr,password:" Your password should contain atleast 6 digits"}));
        return false;
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        
        let isValidFirstName = validateFirstName();
        let isValidLastName = validateLastName();
        let isValidCellNo = validateCellNo();
        let isValidAddress = validateAddress();
        let isValidEmail = validateEmail();
        let isValidPassword = validatePassword();
       
        if(isValidFirstName && isValidLastName && isValidCellNo && isValidAddress && isValidEmail && isValidPassword)
        {
            registerUser(user);
            navigate("/login/My-Eco"); 
        }
    }

    
    return (
        <div className="register-container">
            <h1 className="text-center">Register at <span>My-Eco</span>.com</h1>
            <small className="text-info"><FaInfoCircle/> You can use fake details.</small>
            <form onSubmit={handleSubmit}>
                <div className="input-container"> 
                    <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={handleChange} placeholder="First Name"/>
                    <span className="text-danger">{error.firstName}</span>
                </div>
                <div className="input-container">
                    <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={handleChange} placeholder="Last Name"/> 
                    <span className="text-danger">{error.lastName}</span>
                </div>
                <div className="input-container">
                    <input type="tel" className="form-control" name="cellNo" value={user.cellNo} onChange={handleChange} placeholder="+27..."/> 
                    <span className="text-danger">{error.cellNo}</span>
                </div>
                <div className="input-container">
                    <textarea type="text" className="form-control" name="address" value={user.address} onChange={handleChange} placeholder="Current Address e.g house no, street name, town/city, province"/> 
                    <span className="text-danger">{error.address}</span>
                </div>
                <div className="input-container">
                    <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} placeholder="email"/>
                    <span className="text-danger">{error.email}</span>
                </div>
                <div className="input-container">
                    <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} placeholder="password"/>
                    <span className="text-danger">{error.password}</span>
                </div>
                <div className="p-2 text-center">
                    <button className="btn btn-primary m-2" type="submit">Register</button> 
                    <Link className="text-primary" to="/login/My-Eco">or Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;