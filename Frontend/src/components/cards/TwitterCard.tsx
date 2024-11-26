import React from 'react';

interface TwitterProps {
  tweetUrl: string;
  text: string;
}

const TwitterCard = (props:TwitterProps) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg max-w-[300px] mx-auto">
      <div className="h-[350px] w-full">
        <h3 className="font-semibold text-xl mb-2">{props.text}</h3>
        <blockquote className="twitter-tweet">
          <a href={props.tweetUrl}></a>
        </blockquote>
      </div>
    </div>
  );
};

export default TwitterCard;
