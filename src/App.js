import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  LogInForm
} from "./authentication";
import {
  Home
} from "./Pages";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const getPath = useLocation().pathname.split("/")?.[2];
  const getUrl = useLocation().pathname.split("/")?.[1];
  const checkAuth = localStorage.getItem("AdminToken");
  useEffect(() => {
    if (checkAuth === undefined || checkAuth === null) {
      if (getPath === "reset-password") {
      } else if (getPath === "forgot-password") {
      } else if (getUrl === "sign-up") {
      } else {
        navigate("/log-in");
      }
    }
  }, [checkAuth, navigate, getPath, getUrl]);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/log-in" element={<LogInForm />} />
      </Routes>
    </>
  );
}

export default App;
