import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Tweet from "./Tweet";
import TweetStatus from "./TweetStatus";
import TweetList from "./TweetList";
import { TweetProvider, TweetContext } from "./TweetContext";
import { COLORS } from "../constants";

const HomeFeed = () => {
  const { tweetsById, tweetIds } = React.useContext(TweetContext);

  return (
    tweetIds &&
    tweetsById && (
      <Wrapper>
        <HomeHeading>Home</HomeHeading>
        <TweetStatus />
        <TweetList />
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  margin-left: 30%;
  max-width: 60%;
  border-right: ${COLORS.divider};
`;
const HomeHeading = styled.h1`
  font-size: 20px;
  padding-left: 20px;
  padding-bottom: 10px;
  margin-bottom: 0px;
  border-bottom: 2px solid ${COLORS.divider};
`;
export default HomeFeed;
