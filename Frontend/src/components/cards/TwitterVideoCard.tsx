import { useEffect } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import { deleteContent } from "../../services/content";
import toast, { Toaster } from "react-hot-toast";

interface TwitterVideoCardProps {
  tweetUrl: string;
  title: string;
  height?: string;
  width?: string;
  _id: string;
}

function TwitterVideoCard({ tweetUrl, title, _id }: TwitterVideoCardProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleDelete = async (id: string) => {
    const response = await deleteContent(id);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div
      className={`p-3 border bg-white border-gray-300 rounded-lg shadow-lg flex flex-col  mt-2  h-full w-[300px]`}
    >
      <Toaster />
      <div className="flex justify-between items-center">
        <h2 className="text-lg text-black  font-bold w-full mb-2 flex justify-start">
          {title}
        </h2>
        <span
          className="hover:text[30px] cursor-pointer"
          onClick={() => handleDelete(_id)}
        >
          <DeleteIcon />
        </span>
      </div>

      <div className="relative w-full">
        <blockquote className="twitter-tweet" data-lang="en">
          <a href={tweetUrl}></a>
        </blockquote>
      </div>
    </div>
  );
}

export default TwitterVideoCard;
