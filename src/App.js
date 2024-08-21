import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  ForgotPasswordForm,
  LogInForm,
  ResetPasswordForm
} from "./authentication";
import {
  Home,
} from "./Pages";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Campaign from "./Pages/campaign/Campaign";
import AddCampaign from "./Pages/campaign/AddCampaign";
import EditCampaign from "./Pages/campaign/EditCampaign";

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
        <Route exact path="/auth/reset-password/:id/:token" element={<ResetPasswordForm />} />
        <Route
          exact
          path="/auth/forgot-password"
          element={<ForgotPasswordForm />}
        />
        <Route exact path="/campaign" element={<Campaign />} />
        <Route exact path="/campaign/add" element={<AddCampaign />} />
        <Route exact path="/campaign/edit/:id" element={<EditCampaign />} />

      </Routes>
    </>
  );
}

export default App;
