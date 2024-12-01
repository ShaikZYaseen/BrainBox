import React from "react";
import DeleteIcon from "../icons/DeleteIcon";
import { deleteContent } from "../../services/content";
import toast, { Toaster } from "react-hot-toast";

interface YoutubeProps {
  youtubeLink: string;
  title: string;
  _id: string;
}

const YoutubeCard: React.FC<YoutubeProps> = ({ youtubeLink, title, _id }) => {
  const handleDelete = async (id: string) => {
    const response = await deleteContent(id);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="w-full max-w-[560px] mx-auto bg-white p-3 m-2">
      <Toaster />
      <div className="flex justify-between p-1">
        <h3 className="font-semibold text-black text-sm mb-2">{title}</h3>
        <span
          className="hover:text[30px] cursor-pointer"
          onClick={() => handleDelete(_id)}
        >
          <DeleteIcon />
        </span>
      </div>
      <div className="relative" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={youtubeLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default YoutubeCard;
