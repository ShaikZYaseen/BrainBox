import { useEffect } from "react";
import { deleteContent, getContent } from "../../services/content";
import toast, { Toaster } from "react-hot-toast";
import DeleteIcon from "../icons/DeleteIcon";

interface InstagramCardProps {
  link: string;
  title: string;
  height?: string;
  width?: string;
  _id: string;
}

function InstagramCard({ link, title, _id }: InstagramCardProps) {
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
      toast.success(response.message);
      await getContent();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div
      className={`p-4 border border-gray-300 rounded-2xl shadow-lg flex flex-col items-center w-[400px]`}
    >
      <Toaster />
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-2 w-full flex justify-start">
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
