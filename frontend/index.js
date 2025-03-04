import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.js"
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </Router>
);