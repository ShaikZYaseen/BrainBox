import  { useEffect } from 'react';

interface TwitterVideoCardProps {
  tweetUrl: string;
  title: string;
  height?: string;
  width?: string;
}

function TwitterVideoCard({
  tweetUrl,
  title
}: TwitterVideoCardProps) {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className={`p-4 border border-gray-300 rounded-lg shadow-lg flex flex-col items-center h-full w-[300px]`}
    >
      <h2 className="text-lg font-bold w-full mb-2 flex justify-start">{title}</h2>

      <div className="relative w-full">
        <blockquote
          className="twitter-tweet"
          data-lang="en"
        >
          <a href={tweetUrl}></a>
        </blockquote>
      </div>
    </div>
  );
}

export default TwitterVideoCard;
