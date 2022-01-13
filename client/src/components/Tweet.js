import React from "react";
import styled from "styled-components";
import { TweetContext } from "./TweetContext";
import { format } from "date-fns";
import ActionBar from "./ActionBar";
import { COLORS } from "../constants";
import { Repeat } from "react-feather";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import TweetHeader from "./TweetHeader";

const Tweet = ({ tweet, tweetid }) => {
  const handleTweetContentsClick = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      history.push(`/tweet/${tweetid}`);
    }
  };
  const history = useHistory();
  const numLikes = tweet["numLikes"];
  const isLiked = tweet["isLiked"];
  const numRetweets = tweet["numRetweets"];
  return (
    <Wrapper
      onClick={handleTweetContentsClick}
      onKeyPress={handleTweetContentsClick}
      aria-label="View tweet"
      tabIndex="0"
    >
      {tweet.retweetFrom && (
        <RetweetFrom>
          <Repeat style={{ width: "13px", marginRight: "5px" }} />
          {tweet.retweetFrom.displayName}
        </RetweetFrom>
      )}
      <TweetHeader tweet={tweet} />
      {/* <StyledLink to={`/tweet/${tweetid}`}> */}
      <TweetContents>{tweet.status}</TweetContents>
      {tweet.media.length !== 0 && <Img src={tweet.media[0].url} />}
      {/* </StyledLink> */}
      {/* <Timestamp>{format(new Date(tweet.timestamp), "PP")}</Timestamp> */}
      <ActionBar
        isLiked={isLiked}
        numLikes={numLikes}
        numRetweets={numRetweets}
        tweetid={tweetid}
      />
      <Divider />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: white;

  padding: 5px 5px 5px 10px;
  text-align: left;
  border-right: 1px solid ${COLORS.divider};
`;

const TweetContents = styled.div`
  font-size: 15px;
  padding: 10px 0;
  margin-left: 70px;
`;

const RetweetFrom = styled.div`
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 45px;
  font-size: 14px;
  color: rgb(101, 119, 134);
`;
const Img = styled.img`
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 60px;
  max-width: 50%;
  max-height: 800px;
  border-radius: 20px;
`;
const Divider = styled.div`
  height: 1px;
  background: ${COLORS.divider};
`;

export default Tweet;
