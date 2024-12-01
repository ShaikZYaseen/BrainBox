import React from "react";
import { deleteContent, getContent } from "../../services/content";
import toast, { Toaster } from "react-hot-toast";
import DeleteIcon from "../icons/DeleteIcon";

interface TwitterProps {
  tweetUrl: string;
  text: string;
  _id: string;
}

const handleDelete = async (id: string) => {
  const response = await deleteContent(id);
  if (response.success) {
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
};

const TwitterCard = (props: TwitterProps) => {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-lg  mt-2">
      <Toaster />
      <div className="h-full w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-black text-sm mb-2">
            {props.text}
          </h3>
          <span
            className="hover:text[30px] cursor-pointer"
            onClick={() => handleDelete(props._id)}
          >
            <DeleteIcon />
          </span>
        </div>

        <blockquote className="twitter-tweet">
          <a href={props.tweetUrl}></a>
        </blockquote>
      </div>
    </div>
  );
};

export default TwitterCard;
