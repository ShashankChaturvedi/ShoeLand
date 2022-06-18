import React, { Fragment,useEffect} from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Profile.css"
const Profile = () => {
    const navigate=useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  
  useEffect(() => {
    if(isAuthenticated===false){
        navigate("/login")
    }
  }, [navigate,isAuthenticated])
  
  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h3>Full Name</h3>
                <p>{user.name}</p>
              </div>
              <div>
                <h3>Email</h3>
                <p>{user.email}</p>
              </div>
              <div>
                <h3>Joined On</h3>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
