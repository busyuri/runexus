import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/UserContext"; // yolunu uyarlarsın

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserProvider>
        <App />
    </UserProvider>
);

