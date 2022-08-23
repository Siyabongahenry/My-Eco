import "./style.css";
import profileImg from "./user.png"
import { Link } from "react-router-dom";
const Profile =({user})=>{
    return (
        <div className="profile-container p-2">
            <h1 className="text-start">Profile</h1>
            <div className="text-center">
                <img src={profileImg} width="50px"/>
            </div>
            {
                !user.login || user === null?(<div>Please login to see your profile<br/><Link to="/login/profile" className="btn btn-primary">Login</Link></div>):
                (<div className="d-inline-block p-2 text-start bg-white">
                    <div>
                        First Name: {user.details?.firstName}
                    </div>
                    <div>
                        Last Name: {user.details?.lastName}
                    </div>
                    <div>
                        Email: {user.details?.email}
                    </div>
                    <div>
                        Cell No: {user.details?.cellNo}
                    </div>
                    <div>
                        Address: {user.details?.address}
                    </div>
                </div>)
            }
            
        </div>
    );
}
export default Profile;