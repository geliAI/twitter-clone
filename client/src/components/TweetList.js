import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { COLORS, AVATAR } from "../constants";
import { LoadingState } from "./LoadingState";
import { TweetContext } from "./TweetContext";
import Tweet from "./Tweet";
import ActionBar from "./ActionBar";

const TweetList = () => {
  const { tweetsById, tweetIds, homeTweetsStatus } =
    React.useContext(TweetContext);

  return homeTweetsStatus === "idle" ? (
    <>
      {tweetIds.map((tweetid) => {
        return (
          //   <Link to={`/items/${tweetid}`}>
          <Tweet tweet={tweetsById[tweetid]} tweetid={tweetid} key={tweetid} />
          //   </Link>
        );
      })}
    </>
  ) : (
    <LoadingState />
  );
};

export default TweetList;
