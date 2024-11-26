import  { useEffect } from 'react';

interface InstagramReelCardProps {
  reelLink: string;  
  title: string;     
  height?: string;  
  width?: string;    
}

function InstagramReelCard({
  reelLink,
  title,
}: InstagramReelCardProps) {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className={`p-2 border border-gray-300 rounded-lg shadow-lg flex flex-col items-center h-full w-[350px]`}
    >
      <h2 className="text-lg font-bold mb-2 flex justify-start">{title}</h2>
      <div className="relative w-full">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={reelLink}
          data-instgrm-version="14"
        ></blockquote>
      </div>
    </div>
  );
}

export default InstagramReelCard;
