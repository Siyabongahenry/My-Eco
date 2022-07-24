import "./style.css";
import { FaLock } from "react-icons/fa";
const Login =()=>{
    return (
    <div className="login">
        <h1>Login at My-Eco<span>.com</span></h1>
        <form>
            <div>
                <small>Email</small>
                <input type="email" className="form-control" placeholder="type email.."/>
            </div>
            <div>
                <small><FaLock/>Password</small>
                <input type="password" className="form-control" placeholder="type password.."/>
            </div>
            <div className="text-center p-2">
                <button className="btn-login">Login</button>
            </div>
        </form>
    </div>
    )
}
export default Login;