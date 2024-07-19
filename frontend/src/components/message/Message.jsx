import React from "react";
import BotIcon from "../../../public/assets/images/bot.svg";
import UserIcon from "../../../public/assets/images/user.svg";

const Message = ({ sender, message, youtubeResults }) => {
  return (
    <div
      data-testid="chatbot-message"
      className={`m-2 ${sender === "user" ? "text-right" : "text-left"}`}
    >
      <p>
        {sender === "user" ? (
          <>
            <img
              src={UserIcon}
              alt="User Icon"
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
      {youtubeResults && youtubeResults.length > 0 && (
        <div className="mt-2">
          {youtubeResults.map((video, index) => (
            <div key={index} className="mb-2">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-center">
                  <img
                    src={`https://img.youtube.com/vi/${
                      video.url.split("=")[1]
                    }/0.jpg`}
                    alt={video.title}
                    className="h-20 w-32 mr-4"
                  />
                  <div>
                    <p className="font-bold">{video.title}</p>
                    <p className="text-sm">{video.description}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Message;
