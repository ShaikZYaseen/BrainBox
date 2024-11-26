import React from 'react';

interface YoutubeProps {
  youtubeLink: string;
}

const YoutubeCard: React.FC<YoutubeProps> = (props) => {
  return (
    <div className="w-full max-w-[560px] mx-auto">
      <iframe
        width="100%" // Make the width 100% to be responsive
        height="315"
        src={props.youtubeLink}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeCard;
