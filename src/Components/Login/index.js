import "./style.css";
import { FaLock } from "react-icons/fa";
import { useParams,useNavigate } from "react-router-dom";
import { useState } from "react";
const Login =({userLogin})=>{
    const{returnUrl} = useParams();
    const navigate = useNavigate();
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState("");
    const handleSubmit =(e)=>{
        console.log(email+" + "+password);
        e.preventDefault();
        if(!userLogin(email,password))
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
        <form onSubmit={handleSubmit}>
            <div>
                <small>Email</small>
                <input type="email" className="form-control" placeholder="type email.." onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
                <small><FaLock/>Password</small>
                <input type="password" className="form-control" placeholder="type password.." onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className="text-danger p-2">
                <small>{error}</small>
            </div>
            <div className="text-center p-2">
                <button className="btn-login">Login</button>
            </div>
            <div>
                <span className="text-danger">This is a fake website, use the information below to login</span>
                <div>
                    <div>
                        email: user@myeco.com
                    </div>
                    <div>
                        password: 2022*MyEco
                    </div>
                </div>
            </div>
        </form>
    </div>
    )
}
export default Login;