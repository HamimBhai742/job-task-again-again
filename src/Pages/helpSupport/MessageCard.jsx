import React from "react";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import Lottie from "lottie-react";
import animationData from "../../JSONFile/aibot.json";
import animationDatadata from "../../JSONFile/user.json";

const MessageCard = ({ msg, index }) => {
  const normalDate = dayjs(msg?.timeStamp).format("DD-MM-YYYY hh:mm A");
  return (
    <div
      key={index}
      className={` flex max-w-xl  w-fit overflow-auto ${
        msg.sender === "You"
          ? "ml-auto bg-blue-300 text-black justify-end p-2 rounded-lg  "
          : "mr-auto bg-gray-300 text-black justify-start p-2 rounded-lg"
      }`}
    >
      <div className="p-2">
        <div>
          {msg.sender === "You" ? (
            <Lottie
              animationData={animationDatadata}
              loop={true}
              style={{ width: 40, height: 40 }}
            />
          ) : (
            <Lottie
              animationData={animationData}
              loop={true}
              style={{ width: 40, height: 40 }}
            />
          )}
        </div>

        <p className="text-sm my-2">
          <ReactMarkdown>{msg.message}</ReactMarkdown>
        </p>
        <div className="text-xs text-right opacity-70 mt-1">{normalDate}</div>
      </div>
    </div>
  );
};

export default MessageCard;
