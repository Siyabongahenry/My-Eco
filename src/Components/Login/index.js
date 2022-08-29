import "./style.css";
import lock from "./lock.png";
import { FaLock } from "react-icons/fa";
import { useParams,useNavigate,Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
const Login =({userLogin})=>{
    const user = useContext(UserContext);
    const{returnUrl} = useParams();
    const navigate = useNavigate();
    const[error,setError] = useState("");
    const [userInput,setUserInput] = useState({
        "email":"",
        "password":""
    });
    const handleChange = (e)=>{
        setUserInput({...userInput,[e.target.name]:e.target.value});
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!userLogin(userInput.email,userInput.password))
        {
            setError("The provided user name or password is invalid");
        }
        else{
            navigate(`/${returnUrl}/`);
        }
    }
    return (
    <div className="login">
        <h1>Login at My-Eco<span>.com</span></h1>
        <div className="text-center">
            <img src={lock} width="60px" alt="lock"/>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
                <small>Email</small>
                <input type="email" name="email" className="form-control" placeholder="type email.." onChange={handleChange}/>
            </div>
            <div>
                <small><FaLock/>Password</small>
                <input type="password" name="password" className="form-control" placeholder="type password.." onChange={handleChange}/>
            </div>
            <div className="text-danger p-2">
                <small>{error}</small>
            </div>
            <div className="text-center p-2">
                <button className="btn-login" name="login" >Login</button><br/>
                <Link className="text-primary" to="/register">Forgot password</Link><br/>
                <Link className="text-primary" to="/register">Create new account</Link>
            </div>
            { 
                user.details.email === "user@myeco.com" &&
                <div>
                    <span className="text-danger">If not registered use the information below</span>
                    <div>
                        <div>
                            email: user@myeco.com
                        </div>
                        <div>
                            password: 2022*MyEco
                        </div>
                    </div>
                </div>
            }
        </form>
    </div>
    )
}
export default Login;