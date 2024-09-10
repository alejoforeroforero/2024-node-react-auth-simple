import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/redux/states/authActions";

const Register = () => {
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(credentials));
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
          <button type="submit">Register</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

export default Register;
