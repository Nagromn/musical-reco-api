import React, { useState } from "react";
import axios from "axios";
import Message from "./Message";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newChatHistory = [...chatHistory, { sender: "user", message }];
    setChatHistory(newChatHistory);

    try {
      const response = await axios.post("http://localhost:5000/recommend", {
        message,
      });

      const botMessage = response.data.message;
      setChatHistory([
        ...newChatHistory,
        { sender: "bot", message: botMessage },
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="chat-history max-h-96 overflow-y-auto mb-4 border p-4 rounded">
        {chatHistory.map((chat, index) => (
          <Message key={index} sender={chat.sender} message={chat.message} />
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
