import { useState } from "react";
import Login from "@/components/Login";
import Register from "@/components/Register";


const AuthPage = () => {
  const [isSigningUp, setIsSigninup] = useState(false);

  return (
    <div>
      {isSigningUp && (
        <>
          <Register />
          <div className="message">
            <p>¿Ya tienes una cuenta?</p>
            <a onClick={() => setIsSigninup(false)}>Login</a>
          </div>
        </>
      )}
      {!isSigningUp && (
        <>
          <Login />
          <div className="message">
            <p>¿No tienes una cuenta?</p>
            <a onClick={() => setIsSigninup(true)}>Signup</a>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthPage;
