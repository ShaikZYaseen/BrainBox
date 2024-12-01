import React, { useEffect, useState } from "react";
import { InstagramIcon } from "./icons/Instagram";
import { TwitterIcon } from "./icons/Twitter";
import { YoutubeIcon } from "./icons/Youtube";
import { userState } from "./recoil/auth";
import { useRecoilValue } from "recoil";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./ui/LogoutButton";
import { Logoutauth } from "../services/auth";
import AddButton from "./ui/AddButton";
import { Content } from "./Content";
import { getContent } from "../services/content";

// Define types
interface ContentItem {
  _id: string;
  title: string;
  link: string;
  tags: string;
}

function Home() {
  const options: Array<string> = ["Twitter", "Youtube", "Instagram"];
  const user = useRecoilValue(userState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false); // Set initial state to false
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

  const getData = async (option: string) => {
    const response = await getContent(option);
    setContent(response.content);
  };

  const toggleOptions = () => {
    setIsOptionsOpen((prev) => !prev); // Properly toggle the options visibility
  };

  return (
    <div className="w-screen h-screen bg-black flex relative">
      <Toaster />
      <span
        onClick={handleLogout}
        className="fixed m-2 top-2 p-0 right-4 z-50 cursor-pointer"
      >
        <LogoutButton />
      </span>

      {/* Side Menu */}

      {isOptionsOpen ? (
        <div
          className={`bg-white h-screen flex flex-col justify-center items-center transition-all duration-300 ease-in-out ${
            isOptionsOpen ? "w-[15vw]" : "w-0"
          }`}
        >
          {options.map((option, index) => (
            <div
              key={option}
              className="w-full p-3 font-bold transition duration-300 rounded-2xl ease-in-out hover:bg-gray-100 flex items-center cursor-pointer space-x-2"
            >
              <div>{icons[index]}</div>
              <span onClick={() => getData(option)} className="text-[13px]">
                {option}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      <button
        onClick={toggleOptions}
        className="fixed top-4 left-4 z-50 text-2xl text-gray-400"
      >
        {isOptionsOpen ? "✖" : "≡"}
      </button>

      <div className="flex-grow  h-full overflow-y-scroll bg-black">
        <div onClick={handleAdd} className="m-3  fixed top-2 right-20">
          <AddButton />
        </div>
        <div>
          <Content
            isModalOpen={isModalOpen}
            content={content}
            setContent={setContent}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
