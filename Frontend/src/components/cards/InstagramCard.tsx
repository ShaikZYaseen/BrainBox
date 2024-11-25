import  { useEffect } from 'react';

interface InstagramCardProps {
  link: string;
  title: string;
  height?: string;
  width?: string;
}

function InstagramCard({
  link,
  title,
}: InstagramCardProps) {

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
      className={`p-4 border border-gray-300 rounded-2xl shadow-lg flex flex-col items-center w-[400px]`}
    >
      <h2 className="text-lg font-bold mb-2 w-full flex justify-start">{title}</h2>
      <div className="relative w-full">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={link}
          data-instgrm-version="14"
        ></blockquote>
      </div>
    </div>
  );
}

export default InstagramCard;
