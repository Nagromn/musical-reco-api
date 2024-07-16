import React from "react";
import Chatbot from "./components/Chatbot";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Music Recommendation Chatbot</h1>
      </header>
      <Chatbot />
    </div>
  );
};

export default App;
