import React from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import { ArrowLeft } from "react-feather";

import { TweetProvider, TweetContext } from "./TweetContext";
import { COLORS, AVATAR } from "../constants";
import { LoadingState } from "./LoadingState";
import ActionBar from "./ActionBar";

const TweetDetail = () => {
  const { tweetsById, homeTweetsStatus } = React.useContext(TweetContext);
  const { tweetid } = useParams();

  const history = useHistory();
  if (homeTweetsStatus === "loading") {
    return <LoadingState />;
  }
  const handleDisplaynameClick = () => {
    history.push(`/${username}`);
  };
  const handleGoBack = () => {
    window.history.back();
  };
  const tweet = tweetsById[tweetid];
  const avatarSrc = tweet.author.avatarSrc;
  const displayName = tweet.author.displayName;
  const username = tweet.author.handle;

  return (
    <Wrapper>
      <Return>
        <ArrowLeftStyle onClick={handleGoBack} />
        <Meow>Meow</Meow>
      </Return>
      <Header>
        <Avatar src={avatarSrc} style={AVATAR} />
        <Name>
          <DisplayName
            onClick={handleDisplaynameClick}
            onKeyPress={handleDisplaynameClick}
            aria-label="View tweet"
            tabIndex="0"
          >
            {displayName}
          </DisplayName>

          <Username>@{username}</Username>
        </Name>
      </Header>

      <TweetContents>{tweet.status}</TweetContents>
      {tweet.media.length !== 0 && <Img src={tweet.media[0].url} />}
      <Timestamp>{format(new Date(tweet.timestamp), "pp PPP")}</Timestamp>
      <ActionBar
        isLiked={tweet.isLiked}
        tweetid={tweetid}
        numLikes={tweet.numLikes}
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  margin-left: 30%;
  margin-top: 0px;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 10px 20px;
`;
const TweetContents = styled.div`
  font-size: 20px;
  padding: 10px 0;
  margin-left: 10px;
`;
const Return = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  border-bottom: 1px solid ${COLORS.divider};
`;
const ArrowLeftStyle = styled(ArrowLeft)`
  transition: transform 200ms ease-in;
  padding: 10px;
  &:hover {
    cursor: pointer;
    transform: translateX(-3px);
    box-shadow: 4px 4px 5px #bababa;
    border-radius: 10px;
  }
`;
const Meow = styled.p`
  padding-bottom: 0px;
  margin-left: 10px;
`;
const Avatar = styled.img``;

const Header = styled.div`
  display: flex;
  margin-bottom: 15px;
`;
const Img = styled.img`
  margin-top: 20px;
  margin-left: 30px;
  width: 80%;
  max-height: 800px;
  border-radius: 20px;
`;
const Name = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0px 16px;
`;
const Timestamp = styled.div`
  color: rgb(101, 119, 134);
  font-size: 18px;
  padding-bottom: 16px;
  margin-top: 20px;
`;

export const DisplayName = styled.div`
  font-size: 15px;
  line-height: 20px;
  font-weight: bold;
  transition: transform 200ms ease-in-out;
  &:hover {
    transform: translateY(-2px);
    text-shadow: 2px 2px 3px #bababa;
    cursor: pointer;
  }
`;

const Username = styled.div`
  font-size: 15px;
  line-height: 20px;
  margin-left: 5px;
  color: rgb(101, 119, 134);
`;
export default TweetDetail;
