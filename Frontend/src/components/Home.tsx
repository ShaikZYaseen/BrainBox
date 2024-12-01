import React, { useEffect, useState } from "react";
import { InstagramIcon } from "./icons/Instagram";
import { TwitterIcon } from "./icons/Twitter";
import { YoutubeIcon } from "./icons/Youtube";
import Content from "./Content";
import { userState } from "./recoil/auth";
import { useRecoilValue } from "recoil";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./ui/LogoutButton";
import { Logoutauth } from "../services/auth";
import AddButton from "./ui/AddButton";

function Home() {
  const options: Array<string> = ["Twitter", "Youtube", "Instagram"];
  const user = useRecoilValue(userState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const icons: Array<React.ReactElement> = [
    <TwitterIcon />,
    <YoutubeIcon />,
    <InstagramIcon />,
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      toast.error("You have logged out. Please login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      const response = await Logoutauth();
      if (!response.error) {
        localStorage.removeItem("token");
        navigate("/login");
        toast.success(response.message);
      } else {
        toast.error("Failed to logout");
      }
    } catch (error) {
      toast.error("An error occurred during logout");
    }
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-screen h-screen bg-black flex">
      <Toaster />
      <div className="bg-gray-300 h-screen w-[15vw] flex flex-col justify-center items-center relative">
        <span
          onClick={handleLogout}
          className="fixed top-2 p-0 right-2 z-50 cursor-pointer"
        >
          <LogoutButton />
        </span>

        {options.map((option, index) => (
          <div
            key={option}
            className="w-full p-3 font-bold transition duration-300 rounded-2xl ease-in-out hover:bg-gray-100 flex items-center cursor-pointer space-x-2"
          >
            <div>{icons[index]}</div>
            <span className="text-[13px]">{option}</span>
          </div>
        ))}
      </div>
      <div className="flex-grow h-full overflow-y-scroll bg-black">
        <div onClick={handleAdd} className="">
          <span className="fixed top-2 left-2 z-50 cursor-pointer">
            <AddButton />
          </span>
        </div>
        <Content isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
}

export default Home;
