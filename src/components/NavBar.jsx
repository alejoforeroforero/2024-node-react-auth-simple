import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Logout from "@/components/Logout";


const NavBar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav>
      <div className="login-btn">
        <Link to="/">Home</Link>
      </div>
      {user && (
        <div className="login-btn">
          <Link to="/user-form">Edit Profile</Link>
        </div>
      )}
      {/* {user && <Logout />} */}
      {!user && (
        <div className="login-btn">
          <Link to="/auth">Auth</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
