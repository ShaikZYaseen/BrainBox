import React, { useEffect } from 'react';
import { InstagramIcon } from './icons/Instagram';
import { TwitterIcon } from './icons/Twitter';
import { YoutubeIcon } from './icons/Youtube';
import Content from './Content';
import { userState } from './recoil/auth';
import { useRecoilValue } from 'recoil';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './ui/LogoutButton';
import { Logoutauth } from '../services/auth';

function Home() {
  const options: Array<string> = ['Twitter', 'Youtube', 'Instagram'];
  const user = useRecoilValue(userState)
  const navigate = useNavigate();
  const icons: Array<React.ReactElement> = [<TwitterIcon />, <YoutubeIcon />, <InstagramIcon />];

  useEffect(()=>{
    const token = localStorage.getItem('token');
      if(!token){
          navigate("/login");
          toast.error("You have logged out. Please login")
      }
  },[user])

  const handleLogout = async() => {
    const response = await Logoutauth();
    if(!response.error){
    localStorage.removeItem("token");
      navigate("/login")
      toast.success(response.message)
    }else{
      toast.error("Failed to logout")
    }
  }

  return (
    <div className="w-screen h-screen bg-black flex">
      <Toaster/>
      <div className="bg-gray-50 h-screen w-[15vw] flex flex-col justify-center items-center">
        <span onClick={handleLogout} className='fixed top-2 p-0 right-2 z-50'>
          <LogoutButton></LogoutButton>
        </span>
        {options &&
          options.map((option, index) => (
            <div key={option} className="w-full p-3 hover:bg-gray-300 flex items-center cursor-pointer space-x-2">
              <div className="">{icons[index]}</div>
              <span className='text-[13px]'>{option}</span>
            </div>
          ))}
      </div>
      <div className="flex-grow bg-black flex justify-center items-center">
        <Content/>
      </div>
    </div>
  );
}

export default Home;
