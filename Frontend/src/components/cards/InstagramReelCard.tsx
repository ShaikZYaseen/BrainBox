import { useEffect } from "react";
import { deleteContent, getContent } from "../../services/content";
import toast, { Toaster } from "react-hot-toast";
import DeleteIcon from "../icons/DeleteIcon";

interface InstagramReelCardProps {
  reelLink: string;
  title: string;
  height?: string;
  width?: string;
  _id: string;
}

function InstagramReelCard({ reelLink, title, _id }: InstagramReelCardProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleDelete = async (id: string) => {
    const response = await deleteContent(id);
    if (response.success) {
      await getContent();
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div
      className={`p-2 border border-gray-300 rounded-lg shadow-lg flex flex-col items-center h-full w-[350px]`}
    >
      <Toaster />
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-2 flex justify-start">{title}</h2>

        <span
          className="hover:text[30px] cursor-pointer"
          onClick={() => handleDelete(_id)}
        >
          <DeleteIcon />
        </span>
      </div>
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
