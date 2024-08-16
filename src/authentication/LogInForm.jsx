import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../apiInstances/axiosInstance";
import logo from "../assets/logo.png";

const LogInForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = localStorage.getItem("AdminToken");

    if (checkAuth === undefined || checkAuth === null) {
    } else {
      navigate("/");
    }
  }, [navigate]);

  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const value = e.target.value.replace(/^\s+|\s+$/gm, "");
    const name = e.target.name;

    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    navigate("/");
    // const encryptedData = JSON.stringify({
    //   email: fields?.email,
    //   password: fields?.password,
    //   role: "admin",
    // });
    // await axiosInstance
    //   .post("admin/sign-in", encryptedData)
    //   .then((res) => {
    //     if (res?.data?.status) {
    //       localStorage.setItem("AdminToken", res?.data?.data?.data);
    //       localStorage.setItem("userId", res?.data?.data?.userId);
    //       navigate("/");
    //       toast.success(res?.data?.message);
    //     } else {
    //       toast.error(res?.data?.message);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("err --->", err);
    //   });
  };

  const InputBox =
    "w-full md:w-[445px] text-xs md:text-sm rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] my-3 md:my-5 py-5 px-8 outline-none";

  const OuterBox =
    "min-w-[40%] rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.25)] bg-white p-5";

  return (
    <>
      <section className="mx-auto px-5 h-screen">
        <div className="h-full grid place-items-center">
          <div
            className={`flex flex-col justify-center items-center text-gray-800 ${OuterBox}`}
          >
            <div className="max-w-xs">
              <img
                src={logo}
                alt="logo"
                className="rounded-md cursor-pointer"
                onClick={(checkAuth) => {
                  if (!checkAuth) {
                    navigate("/");
                  }
                }}
              />
            </div>
            <div className="max-w-md">
              {/* ---- Email input ---- */}
              <input
                type="email"
                className={`${InputBox}`}
                placeholder="Email"
                name="email"
                value={fields?.email}
                onChange={onChangeInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              {/* ---- Password input ---- */}
              <input
                type="password"
                className={`${InputBox}`}
                placeholder="Password"
                name="password"
                value={fields?.password}
                onChange={onChangeInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              {/* ---- Forgot Password ---- */}
              <div className="flex justify-end items-center">
                <button
                  className="text-xs md:text-sm text-gray-500 hover:text-gray-900 mx-3"
                  onClick={() => navigate("/auth/forgot-password")}
                >
                  Forgot Password
                </button>
              </div>
              {/* ---- Submit button ---- */}
              <div className="flex justify-center items-center">
                <button
                  className="my-5 py-3 px-8 rounded-lg bg-[#E5002A] hover:bg-[#E5002A] text-white text-sm md:text-base font-medium"
                  onClick={handleSubmit}
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogInForm;
