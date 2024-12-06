import React from "react";
import ReactDOM from "react-dom";
import "./styles/tailwind.css";
import App from "./app.js";

ReactDOM.render(
  <React.StrictMode>
    <App />
import App from "./app";
import "./styles/tailwind.css";
import { UserProvider } from "./context/userContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
