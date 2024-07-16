import React from "react";

const Message = ({ sender, message }) => {
  return (
    <div className={`mb-2 ${sender === "user" ? "text-right" : "text-left"}`}>
      <strong>{sender === "user" ? "User" : "Bot"}:</strong> {message}
    </div>
  );
};

export default Message;
