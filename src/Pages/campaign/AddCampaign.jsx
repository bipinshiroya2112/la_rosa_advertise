import React, { useRef, useState } from 'react'
import Layout1 from '../../Layouts/Layout1'
import AgentSquareEdit from '../../assets/AgentSquareEdit.png'
import AgentRoundEdit from '../../assets/AgentRoundEdit.png'
import pasteRedIcon from '../../assets/pasteRedIcon.png'
import uploadSingleImage from '../../uploadImage/uploadSingleImage'
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { cityList } from './states-and-cities'
import Select from 'react-select'
import './campaign.css'

const AddCampaign = () => {
  const filterNames = cityList.map(state => state.cities).flat();
  const cityNames = filterNames.map((item) => { return { value: item, label: item } })
  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    advertiseType: "",
    title: "",
    city: [],
    description: "",
    link: ""
  })
  const [isLoader, setIsLoader] = useState(false)
  const companyLogoRef = useRef(null);
  const advertisePropertyImgRef = useRef(null);

  const [campaignImages, setCampaignImages] = useState({
    companyLogoImg: null,
    advertisePropertyImg: null,
  });

  const onChangeImages = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setCampaignImages({
      ...campaignImages,
      [name]: URL.createObjectURL(file),
    });
  };

  const onDeleteImages = (e) => {
    setCampaignImages({
      ...campaignImages,
      [e]: null,
      [`${e}Show`]: null,
    });
  };

  const getvalue = (e) => {
    const { name } = e.target;
    navigator.clipboard.readText().then((clipboard_value) => {
      setDetail({ ...detail, [name]: clipboard_value });
    });
  };

  const PasteValue = (e) => {
    const { name } = e.target;
    var x = document.getElementById(name).value;
    setDetail({ ...detail, [name]: x });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };


  const handelFinalSubmit = async () => {
    try {
      setIsLoader(true);
      let logoImageUpload;
      let advertiseImageUpload;
      if (companyLogoRef.current.files[0] !== undefined) {
        const upload = await uploadSingleImage(companyLogoRef);
        logoImageUpload = upload.url
      }
      if (advertisePropertyImgRef.current.files[0] !== undefined) {
        const upload = await uploadSingleImage(advertisePropertyImgRef);
        advertiseImageUpload = upload.url
      }
      const data = {
        ...detail,
        companyLogoImage: logoImageUpload,
        advertiseImage: advertiseImageUpload
      }
      await axiosInstanceAuth
        .post(`/advertise/add`, data)
        .then((res) => {
          if (res.data.status) {
            setIsLoader(false);
            toast.success("Advertise Listed Successfully");
            navigate(`/campaign`);
          } else {
            setIsLoader(false);
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log("------>> Error", err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    // Updating the state with the selected cities
    setDetail((prevDetail) => ({
      ...prevDetail,
      city: selectedOptions ? selectedOptions.map(option => option.value) : []
    }));
  };

  return (
    <Layout1>
      {isLoader ? <div className="loading">Loading&#8230;</div> : null}
      <div className="w-full bg-white rounded-t-xl">
        <div className="bg-[#E5002A] text-white font-semibold text-sm md:text-base lg:text-lg rounded-t-xl p-5">
          Advertise Profile
        </div>
        <div className="p-6">
          <div className="text-black font-semibold text-sm md:text-base lg:text-lg my-4 mb-8">
            Mandatory fields are marked with an asterisk (
            <span className="text-[#E5002A]">*</span>)
          </div>
          <div className="font-semibold text-[#E5002A] my-5 md:my-8">
            About the listing
          </div>
          <div className="w-full mb-3">
            <div className="font-medium text-[#171717] text-xs md:text-sm ">
              Advertise type:<span className="px-1 text-red-500">*</span>
            </div>
            <select
              name="advertiseType"
              value={detail.advertiseType}
              onChange={onInputChange}
              className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
            >
              <option value="">Select advertise type</option>
              <option value="top">Top of listing</option>
              <option value="between">Between listing</option>
              <option value="vertical">Vertical banners on right hand side of listing</option>
            </select>
          </div>
          <div className="w-full">
            <div className="font-medium text-[#171717] text-xs md:text-sm ">
              Title<span className="px-1 text-red-500">*</span>
            </div>
            <input
              type="title"
              value={detail.title}
              name="title"
              onChange={onInputChange}
              placeholder="Enter Title"
              className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
            />
          </div>
          <div className="w-full">
            <div className="text-[#404040] font-semibold text-sm md:text-base mt-4 md:mt-6">
              Company Logo Image
            </div>
            <div className="text-[#737373] font-medium text-xs md:text-sm mt-3">
              This is a professional style portrait head shot and will be used
              on realestate.com.au. We will resize your profile photo to the
              required sizes (For best results upload as 300px wide by 400px
              high).
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-8 my-6 md:my-8">
              <div className="w-full sm:w-[50%] flex flex-row justify-start items-center gap-5">
                <div className="w-[50%] grid place-content-center">
                  {campaignImages?.companyLogoImg ? (
                    <img
                      src={campaignImages?.companyLogoImg}
                      alt="profile"
                      className="border-2 border-dashed border-black rounded-lg"
                    />
                  ) : (
                    <img
                      src={AgentSquareEdit}
                      alt="profile"
                      className="border-2 border-dashed border-black rounded-lg"
                    />
                  )}
                </div>
                <div className="w-[50%] grid place-content-center">
                  {campaignImages?.companyLogoImg ? (
                    <img
                      src={campaignImages?.companyLogoImg}
                      alt="profile"
                      className="border-2 border-dashed border-black aspect-square w-60 rounded-full"
                    />
                  ) : (
                    <img
                      src={AgentRoundEdit}
                      alt="profile"
                      className="border-2 border-dashed border-black aspect-square w-60 rounded-full"
                    />
                  )}
                </div>
              </div>
              <div className="w-full sm:w-[50%] text-center text-[#3B8FD4] font-medium text-sm md:text-base">
                <label
                  htmlFor="companyLogoImg"
                  className="px-2 cursor-pointer"
                  onClick={() => { }}
                >
                  Replace
                  <input
                    id="companyLogoImg"
                    type="file"
                    name="companyLogoImg"
                    ref={companyLogoRef}
                    onChange={onChangeImages}
                  />
                </label>
                |
                <span
                  className="px-2 cursor-pointer"
                  onClick={(e) => onDeleteImages(`companyLogoImg`)}
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="text-[#404040] font-semibold text-sm md:text-base mt-4 md:mt-6">
              Advertise Property Image
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-8 my-6 md:my-8">
              <div className="w-full sm:w-[50%] flex flex-row justify-start items-center gap-5">
                <div className="w-[50%] grid place-content-center">
                  {campaignImages?.advertisePropertyImg ? (
                    <img
                      src={campaignImages?.advertisePropertyImg}
                      alt="profile"
                      className="border-2 border-dashed border-black rounded-lg"
                    />
                  ) : (
                    <img
                      src={AgentSquareEdit}
                      alt="profile"
                      className="border-2 border-dashed border-black rounded-lg"
                    />
                  )}
                </div>
                {/* <div className="w-[50%] grid place-content-center">
                  {campaignImages?.advertisePropertyImg ? (
                    <img
                      src={campaignImages?.advertisePropertyImg}
                      alt="profile"
                      className="border-2 border-dashed border-black aspect-square w-60 rounded-full"
                    />
                  ) : (
                    <img
                      src={AgentRoundEdit}
                      alt="profile"
                      className="border-2 border-dashed border-black aspect-square w-60 rounded-full"
                    />
                  )}
                </div> */}
              </div>
              <div className="w-full sm:w-[50%] text-center text-[#3B8FD4] font-medium text-sm md:text-base">
                <label
                  htmlFor="advertisePropertyImg"
                  className="px-2 cursor-pointer"
                  onClick={() => { }}
                >
                  Replace
                  <input
                    id="advertisePropertyImg"
                    type="file"
                    name="advertisePropertyImg"
                    ref={advertisePropertyImgRef}
                    onChange={onChangeImages}
                  />
                </label>
                |
                <span
                  className="px-2 cursor-pointer"
                  onClick={(e) => onDeleteImages(`advertisePropertyImg`)}
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full md:w-[50%] mt-4 md:mt-6">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                City:<span className="px-1 text-red-500">*</span>
              </div>
              <Select
                defaultValue={detail.city}
                isMulti
                name="city"
                options={cityNames}
                className="round custom-select w-full font-medium !text-[#737373] text-xs md:text-sm outline-none rounded-[28px] mt-3"
                classNamePrefix="select"
                onChange={handleSelectChange}
              />
              {/* <select
                name="city"
                value={detail.city}
                onChange={onInputChange}
                className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              >
                <option value="">Select city</option>
                {
                  cityNames.map((item, i) => {
                    return (
                      <option value={item} key={i}>{item}</option>
                    )
                  })
                }
              </select> */}
            </div>
            <div className="w-full md:w-[50%] mt-4 md:mt-6">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                Advertise URL
              </div>
              <div className="flex flex-row justify-start items-center gap-2 outline-none border border-[#E5E5E5] rounded-3xl py-3 px-5 mt-2">
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={detail.link}
                  onChange={PasteValue}
                  placeholder="Paste URL here"
                  className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none"
                />{" "}
                <img
                  onClick={getvalue}
                  name="link"
                  className="w-5 cursor-pointer"
                  src={pasteRedIcon}
                  alt="img"
                />
              </div>
            </div>
          </div>
          <div className="w-full mt-4">
            <div className="font-medium text-[#171717] text-xs md:text-sm">
              Description<span className="px-1 text-red-500">*</span>
            </div>
            <textarea
              rows={5}
              type="text"
              value={detail.description}
              name="description"
              onChange={onInputChange}
              placeholder="Type here...."
              className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-xl py-3 px-5  mt-3"
            />
          </div>
          <div className="flex justify-end items-center gap-4 mt-3">
            <button
              className="bg-[#E5002A] text-white font-medium text-sm px-9 py-3 rounded-3xl shadow outline-none"
              onClick={handelFinalSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Layout1>
  )
}

export default AddCampaign