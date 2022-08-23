import "./style.css";
import { Link,useNavigate} from "react-router-dom";
import { useState } from "react";
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

    const isValidCellNo = ()=>{
        let cellNoPattern = /^0\d{9}$/;
        if(user.cellNo.search(cellNoPattern) >= 0)
        {
            setError({...error,cellNo:""});
            return true;
        }
        setError({...error,cellNo:" your cell no are not valid in SA, for the sake of this project use 10 random numbers."});
        return false;
    }
    const isValidName = (_name)=>{
        let namePattern = /^[a-zA-Z]{3,15}$/;
        if(_name.search(namePattern) >= 0)
        {
            return true;
        }
        return false;
    }
    const isValidFirstName = ()=>{
        if(isValidName(user.firstName))
        {
            setError({...error,firstName:""});
            return true;
        }
        setError({...error,firstName:"Please enter a valid first name"});
        return false;
    }
    const isValidLastName = ()=>{
        if(isValidName(user.lastName))
        {
            setError({...error,lastName:""});
            return true;
        }
        setError({...error,lastName:"Please enter a valid last name"});
        return false;
    }
    const isValidEmail = ()=>{
        let emailPattern = /^.+@gmail.com$/;
        if(user.email.search(emailPattern) > 0)
        {
            setError({...error,email:""});
            return true;
        }
        setError({...error,email:" is not a valid email"});
        return false;
    }
    const isValidPassword =()=>{
        if(user.password >= 6)
        {
            setError({...error,password:""});
            return true;
        }
        setError({...error,password:"password should contain more than 6 digit"});
        return false;
    }
    const handleSubmit = (e)=>{
        e.preventDefault();

        if(!isValidFirstName()) return;
        
        if(!isValidLastName()) return;
        
        if(!isValidCellNo()) return;
        
        if(!isValidEmail()) return;
        
        if(!isValidPassword()) return;
        
        registerUser(user);
        navigate("/login/My-Eco"); 
    }

    
    return (
        <div className="register-container">
            <h1 className="text-center">Register at <span>My-Eco</span>.com</h1>
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