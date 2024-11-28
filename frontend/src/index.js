import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/tailwind.css";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container); // Create a root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);