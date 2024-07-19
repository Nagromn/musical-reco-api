import React, { useState } from "react";
import axios from "axios";
import Message from "../message/Message";
import Loader from "../loader/Loader";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim() || loading) return;

    const newChatHistory = [...chatHistory, { sender: "user", message }];
    setChatHistory(newChatHistory);
    setLoading(true);
    setSubmitButtonDisabled(true);

    try {
      const response = await axios.post(`${process.env.APP_URL}/recommend`, {
        message,
      });

      const { botMessage, youtubeResults } = response.data;
      setChatHistory([
        ...newChatHistory,
        { sender: "bot", message: botMessage, youtubeResults },
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    } finally {
      setLoading(false);
      setSubmitButtonDisabled(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <div data-testid="app-chatbot" className="h-screen">
        <div className="flex flex-col h-full">
          <div className="p-4 overflow-y-auto">
            {chatHistory.map((chat, index) => (
              <Message
                key={index}
                sender={chat.sender}
                message={chat.message}
                youtubeResults={chat.youtubeResults}
              />
            ))}
            {loading && <Loader />}
          </div>
          <div className="flex justify-center m-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Chatbot"
              className="rounded-l-lg p-4 w-full focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              className="rounded-r-lg bg-green-500 text-white p-4 transition-colors duration-300 ease-in-out hover:bg-green-600 hover:text-gray-100"
              disabled={submitButtonDisabled}
            >
              {submitButtonDisabled ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
