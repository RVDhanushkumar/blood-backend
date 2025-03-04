import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.js";
import "./index.css";
import ErrorBoundary from "./ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
