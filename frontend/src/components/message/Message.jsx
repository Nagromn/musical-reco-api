import React from "react";
import BotIcon from "../../../public/assets/images/bot.svg";
import UserIcon from "../../../public/assets/images/user.svg";

const Message = ({ sender, message }) => {
  return (
    <div className={`m-2 ${sender === "user" ? "text-right" : "text-left"}`}>
      <p>
        {sender === "user" ? (
          <>
            <img
              src={UserIcon}
              alt="Bot Icon"
              className="inline-block h-10 w-10 my-2 mr-2"
            />
            <strong>User :</strong>
          </>
        ) : (
          <>
            <img
              src={BotIcon}
              alt="Bot Icon"
              className="inline-block h-10 w-10 my-2 mr-2"
            />
            <strong>Bot :</strong>
          </>
        )}
      </p>
      <p className="bg-gray-200 rounded-lg p-2 inline-block max-w-max break-words">
        {message}
      </p>
    </div>
  );
};

export default Message;
