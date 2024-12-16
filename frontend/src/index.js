import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles/tailwind.css";

import { UserProvider } from "./context/userContext";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
);
