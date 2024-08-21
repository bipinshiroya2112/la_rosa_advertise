import React, { useEffect, useState } from "react";
import Layout1 from "../../Layouts/Layout1";
import axiosInstanceAuth from '../../apiInstances/axiosInstanceAuth'
import { toast } from "react-toastify";

const UserDashBoard = () => {
  const [Total, setTotal] = useState({});

  useEffect(() => {
    GetTotalCount();
  }, []);

  const GetTotalCount = async () => {
    await axiosInstanceAuth
      .get(`/advertise/totalCount`)
      .then((res) => {
        if (res.data.status) {
          setTotal(res.data.data);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const DashboardCard = [
    {
      title: "Total Advertise",
      count: Total.totalAdvertise,
    },
    {
      title: "Total Top Listing",
      count: Total.topListLength,
    },
    {
      title: "Total Between Listing",
      count: Total.bannerListLength,
    },
    {
      title: "Total Vertical Listing",
      count: Total.verticalListLength,
    },
  ];

  return (
    <Layout1>
      <div className="p-5 xl:px-16">
        <div className="container mx-auto">
          <div className="flex flex-col justify-start items-start gap-1">
            <div className="text-black font-bold text-xl md:text-2xl lg:text-3xl">
              Welcome back
            </div>
            {/* <div className="text-black font-extrabold text-2xl md:text-3xl lg:text-5xl">
              how can we help you today?
            </div> */}
          </div>

          {/* <<----- Dashboard Cards ----->> */}
          <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-5 md:gap-8 my-6 md:my-16">
            {DashboardCard?.length > 0 &&
              DashboardCard?.map((i, index) => (
                <div
                  key={index}
                  className="h-full w-full flex flex-col justify-center items-center gap-5 bg-white rounded-2xl py-7 md:py-10 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <p className="font-bold text-[#262626] text-center text-sm md:text-base lg:text-lg mx-5">
                    {i?.title}
                  </p>
                  <p className="font-bold text-[#262626] text-center text-sm md:text-base lg:text-lg mx-5">
                    {i?.count}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout1>
  );
};

export default UserDashBoard;
