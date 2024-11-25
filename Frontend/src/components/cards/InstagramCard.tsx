import React from 'react';

interface InstagramCardProps {
  link: string;
  title: string;
  height?: string;
  width?: string;
}

function InstagramCard({
  link,
  title,
  height = 'h-[300px]',  // Reduced height of card
  width = 'w-[250px]',   // Reduced width of card
}: InstagramCardProps) {
  return (
    <div
      className={`p-4 border border-gray-300 rounded-lg shadow-lg flex flex-col items-center ${width} ${height}`}
    >
      {/* Title Section */}
      <h2 className="text-lg font-semibold mb-2 text-center">{title}</h2> {/* Reduced title font size */}

      {/* Instagram Post Embed */}
      <div className="relative w-full"> {/* Aspect ratio 4:5 */}
        <blockquote
          className="instagram-media absolute top-0 left-0 w-full h-full"
          data-instgrm-permalink={link}
          data-instgrm-version="14"
        ></blockquote>
      </div>
      {/* Instagram Embed Script */}
      <script async src="//www.instagram.com/embed.js"></script>
    </div>
  );
}

export default InstagramCard;
