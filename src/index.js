import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
import reportWebVitals from "./reportWebVitals";
import FirebaseProvider from "./context/FirebaseContext";
import CurrentUserProvider from "./context/CurrentUser";
import SecondUserProvider from "./context/SecondUserContext";
// import Navbar from "./components/navbar/Navbar";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <FirebaseProvider>
    <CurrentUserProvider>
      <SecondUserProvider>
        <App />
      </SecondUserProvider>
    </CurrentUserProvider>
  </FirebaseProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
