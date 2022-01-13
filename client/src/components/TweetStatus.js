import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { createContext, useState, useReducer } from "react";

import { COLORS, AVATAR } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";
import { TweetContext } from "./TweetContext";
import { LoadingState } from "./LoadingState";

const TweetStatus = () => {
  const maxChNum = 280;
  const { currentUser, status } = React.useContext(CurrentUserContext);
  const { updateTweet, setUpdateTweet, setHomeTweetsStatus } =
    React.useContext(TweetContext);
  const [textLimit, setTextLimit] = useState({
    remainingCh: maxChNum,
    textColor: "grey",
  });
  const [tweetText, setTweetText] = useState("");
  const [posting, setPosting] = useState(false);
  const [isInvalidTweet, setIsInValidTweet] = useState(true);
  const handleInput = (e) => {
    const inputLength = e.target.value.length;

    setTweetText(e.target.value);
    const remainingLength = maxChNum - inputLength;
    let textColor;

    if (remainingLength <= 55) {
      textColor = "orange";
    }
    if (remainingLength < 0) {
      textColor = "red";
    }
    if (remainingLength >= maxChNum || remainingLength < 0) {
      setIsInValidTweet(true);
    } else {
      setIsInValidTweet(false);
    }
    // if (remainingLength > 0 && remainingLength < maxChNum) {
    //   setIsInValidTweet(false);
    // }
    setTextLimit({ remainingCh: remainingLength, textColor: textColor });
  };
  // get content from tweettext, send it to server.
  const handleMeow = (e) => {
    setPosting(true);
    fetch("/api/tweet", {
      method: "POST",
      body: JSON.stringify({ status: tweetText }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("JSON", json);
        setUpdateTweet(!updateTweet);
        setPosting(false);
      })
      .catch((err) => {
        setHomeTweetsStatus("error");
        console.log(err);
      });
  };
  // console.log("after", updateTweet);
  return status === "idle" ? (
    <StatusPost>
      <Wrapper>
        <div>
          <img style={AVATAR} src={currentUser.profile.avatarSrc} />
        </div>
        <TextArea
          placeholder="What's happening?"
          onChange={handleInput}
          type="text"
        ></TextArea>
      </Wrapper>
      <Bottom>
        <Number style={{ color: textLimit.textColor }}>
          {textLimit.remainingCh}
        </Number>
        <Button onClick={handleMeow} disabled={isInvalidTweet}>
          {posting ? <LoadingState size="10" /> : "Meow"}
        </Button>
      </Bottom>
    </StatusPost>
  ) : (
    <LoadingState />
  );
  // status==="loading" &&(
  //     <CircularProgress color="secondary" />
};
const StatusPost = styled.div`
  border-bottom: 10px solid ${COLORS.divider};
  height: 170px;
`;
const Wrapper = styled.div`
  display: flex;
`;
/* border-bottom: 10px solid ${COLORS.divider};
`; */
const TextArea = styled.textarea`
  padding-top: 10px;
  width: 100%;
  height: 100px;
  border: 0px;

  margin-left: 20px;
`;
const Bottom = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`;
const Button = styled.button`
  width: 70px;
  height: 40px;
  border: none;

  text-align: center;
  color: white;
  font-size: 15px;
  padding: 5px 10px 5px 10px;
  border-radius: 20px;
  margin: 10px 10px 5px 5px;
  background-color: ${COLORS.primary};
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    color: white;
    background-color: ${COLORS.hoverPurple};
  }
`;
const Number = styled.p`
  text-align: center;
  align-self: center;
`;

export default TweetStatus;
