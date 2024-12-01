import React, { useEffect, useState } from "react";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Select from "./ui/Select";
import { Button } from "./ui/Button";
import { addContent, getContent } from "../services/content";
import toast from "react-hot-toast";
import Loader from "./ui/Loader";
import TwitterCard from "./cards/TwitterCard";
import TwitterVideoCard from "./cards/TwitterVideoCard";
import YoutubeCard from "./cards/YoutubeCard";
import InstagramReelCard from "./cards/InstagramReelCard";

interface contentProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: itemType[]; // Change content type to an array of itemType
  setContent: React.Dispatch<React.SetStateAction<itemType[]>>; // Correct type for setContent
}

interface itemType {
  link: string;
  title: string;
  tags: string;
  _id: string;
}

export function Content(props: contentProps) {
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const type: { value: string; label: string }[] = [
    { value: "Twitter post", label: "Twitter post" },
    { value: "Twitter video post", label: "Twitter video post" },
    { value: "Youtube", label: "YouTube" },
    { value: "Instagram post", label: "Instagram post" },
    { value: "Instagram video post", label: "Instagram video post" },
  ];

  const handleAdd = async () => {
    setLoading(true);
    const data = { title, link, selectedType };
    const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

    if (!urlRegex.test(link)) {
      toast.error("Please enter a valid link");
      setLoading(false);
      return;
    }

    const response = await addContent(data);

    setTimeout(() => {
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    }, 2000);

    await getData(); // Ensure to await the content fetching
    props.setIsModalOpen(false);
  };

  const getData = async () => {
    setLoading(true);
    const response = await getContent("");
    props.setContent(response.content);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Modal
            onClose={() => props.setIsModalOpen(false)}
            isOpen={props.isModalOpen}
          >
            <div>
              <p className="font-bold font-sans">Title:</p>
              <Input
                size="sm"
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter the title"
              />
            </div>
            <div className="mt-2">
              <p className="font-bold font-sans">Enter your link:</p>
              <Input
                size="sm"
                type="text"
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter your link"
              />
            </div>
            <div className="mt-2">
              <p className="font-bold font-sans">Enter type of link:</p>
              <Select
                options={type}
                value={selectedType}
                onChange={(value: string) => setSelectedType(value)}
                placeholder="Select a type"
              />
            </div>
            <div className="mt-2 max-w-full flex justify-center items-center">
              <Button
                onClick={handleAdd}
                variant="primary"
                text="Add"
                size="sm"
              />
            </div>
          </Modal>

          <div className="flex justify-around flex-wrap items-center h-full mt-[70px]">
            {props.content &&
              props.content.map((item: itemType) => {
                if (item?.tags === "Twitter post") {
                  return (
                    <div
                      className="w-full sm:w-1/2 lg:w-1/3 p-2"
                      key={item.link}
                    >
                      <TwitterCard
                        _id={item._id}
                        tweetUrl={item.link}
                        text={item.title}
                      />
                    </div>
                  );
                }

                if (item?.tags === "Twitter video post") {
                  return (
                    <div
                      className="w-full sm:w-1/2 lg:w-1/3 p-2"
                      key={item.link}
                    >
                      <TwitterVideoCard
                        _id={item._id}
                        tweetUrl={item.link}
                        title={item.title}
                      />
                    </div>
                  );
                }

                if (item?.tags === "Youtube") {
                  return (
                    <div
                      className="w-full sm:w-1/2 lg:w-1/3 p-2"
                      key={item.link}
                    >
                      <YoutubeCard
                        _id={item._id}
                        youtubeLink={item.link}
                        title={item.title}
                      />
                    </div>
                  );
                }

                if (item?.tags === "Instagram post") {
                  return (
                    <div
                      className="w-full sm:w-1/2 lg:w-1/3 p-2"
                      key={item.link}
                    >
                      <InstagramReelCard
                        _id={item._id}
                        reelLink={item.link}
                        title={item.title}
                      />
                    </div>
                  );
                }

                return null; // If no matching tag, return nothing
              })}
          </div>
        </>
      )}
    </>
  );
}
