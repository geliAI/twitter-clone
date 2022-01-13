import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { TweetProvider } from "./components/TweetContext";
import { CurrentUserProvider } from "./components/CurrentUserContext";
// import { ProfileProvider } from "./components/ProfileContext";

ReactDOM.render(
  <CurrentUserProvider>
    <TweetProvider>
      <App />
    </TweetProvider>
  </CurrentUserProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
