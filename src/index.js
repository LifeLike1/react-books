import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/static/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import FavouriteBookContextProvider from "./Components/context/FavouriteBookContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <FavouriteBookContextProvider>
        <App />
      </FavouriteBookContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
