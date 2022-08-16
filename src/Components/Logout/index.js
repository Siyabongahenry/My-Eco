import { Link } from "react-router-dom";
import { useEffect } from "react";
const Logout = ({userLogout})=>{
    useEffect(()=>{userLogout()},[]);
    return (
    <div className="text-center">
        You're now logged out<br/>
        <Link className="btn btn-primary" to="/login/My-Eco">Login</Link>
    </div>
    );
}

export default Logout;