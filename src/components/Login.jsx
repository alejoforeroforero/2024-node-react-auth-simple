import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/redux/states/authActions";

const Login = () => {
  const error = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();


  useEffect(() => {
    if (token) {
      navigate("/"); 
    }
  }, [token, navigate]);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            placeholder="email"
          />
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
        
      </div>
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default Login;
