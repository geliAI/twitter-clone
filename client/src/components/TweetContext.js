import React, { createContext, useState, useReducer } from "react";
import ErrorPage from "./ErrorPage";

export const TweetContext = React.createContext(null);

export const TweetProvider = ({ children }) => {
  const initialState = {
    tweetsById: null,
    tweetIds: null,
  };
  const [homeTweets, setHomeTweets] = useState(initialState);
  const [homeTweetsStatus, setHomeTweetsStatus] = useState("loading");
  const [updateTweet, setUpdateTweet] = useState(false);

  React.useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setHomeTweets(data);
        setHomeTweetsStatus("idle");
      })
      .catch((err) => {
        setHomeTweetsStatus("error");
        console.log(err);
      });
  }, [updateTweet]);

  if (homeTweetsStatus === "error") {
    return <ErrorPage />;
  }
  //   console.log(status, currentUser);
  // Fetch the user data from the API (/me/profile)
  // When the data is received, update currentUser.
  // Also, set `status` to `idle`

  return (
    <TweetContext.Provider
      value={{
        tweetsById: homeTweets["tweetsById"],
        tweetIds: homeTweets["tweetIds"],
        homeTweetsStatus,
        setHomeTweetsStatus,
        updateTweet,
        setUpdateTweet,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
