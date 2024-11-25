import React from 'react';
import { InstagramIcon } from './icons/Instagram';
import { TwitterIcon } from './icons/Twitter';
import { YoutubeIcon } from './icons/Youtube';
import Content from './Content';

function Home() {
  const options: Array<string> = ['Twitter', 'Youtube', 'Instagram'];
  const icons: Array<React.ReactElement> = [<TwitterIcon />, <YoutubeIcon />, <InstagramIcon />];

  return (
    <div className="w-screen h-screen bg-black flex">
      <div className="bg-gray-50 h-screen w-[15vw] flex flex-col justify-center items-center">
        {options &&
          options.map((option, index) => (
            <div key={option} className="w-full p-3 hover:bg-gray-300 flex items-center cursor-pointer space-x-2">
              <div className="">{icons[index]}</div>
              <span className='text-[13px]'>{option}</span>
            </div>
          ))}
      </div>
      <div className="flex-grow bg-gray-800 flex justify-center items-center">
        <Content/>
      </div>
    </div>
  );
}

export default Home;
