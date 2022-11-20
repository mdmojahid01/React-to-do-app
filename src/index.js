import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./AuthContext";
import DataContextProvider from "./DataContext";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <AuthContextProvider>
    <DataContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </DataContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
