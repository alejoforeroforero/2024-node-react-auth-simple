import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import { useDispatch } from "react-redux";
import { verifyRefreshTokenUser } from "./redux/states/authActions";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyRefreshTokenUser());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <NavBar />
      <section>
        <Outlet />
      </section>
    </>
  );
}

export default App;
