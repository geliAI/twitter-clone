import styled from "styled-components";

import { Heart } from "react-feather";
import { Repeat } from "react-feather";
import { MessageCircle } from "react-feather";
import { Upload } from "react-feather";
import React, { createContext, useState, useReducer } from "react";

import { TweetContext } from "./TweetContext";

const ActionBar = ({ isLiked, numLikes, tweetid }) => {
  const [isLikedStatus, setIsLikedStatus] = useState(isLiked);
  const [likesNum, setLikesNum] = useState(numLikes);
  const { updateTweet, setUpdateTweet } = React.useContext(TweetContext);
  const handleToggleLike = (e) => {
    e.stopPropagation();
    if (e.key === "Enter" || e.type === "click") {
      fetch(`/api/tweet/${tweetid}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ like: !isLikedStatus }),
      })
        .then((response) => response.text())
        .then((text) => {
          console.log(text);
          setUpdateTweet(!updateTweet);
          setIsLikedStatus(!isLikedStatus);
          isLikedStatus ? setLikesNum(likesNum - 1) : setLikesNum(likesNum + 1);
        });
    }
    // setIsLikedStatus(!isLikedStatus);
    // isLikedStatus ? setLikesNum(likesNum - 1) : setLikesNum(likesNum + 1);
  };

  return (
    <Wrapper>
      <Action>
        <MessageCircle size={20} />
      </Action>
      <Action>
        <Repeat size={20} />
      </Action>
      <Action
        onClick={(e) => {
          handleToggleLike(e);
          console.log(likesNum);
        }}
        onKeyPress={handleToggleLike}
        aria-label="View tweet"
        tabIndex="0"
      >
        <StyledHeart
          size={20}
          style={{
            fill: isLikedStatus ? "rgb(224, 36, 94)" : "none",
          }}
        />
      </Action>
      {isLikedStatus && <NumLike>{likesNum}</NumLike>}
      <Action>
        <Upload size={20} />
      </Action>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 48px;
`;

const StyledHeart = styled(Heart)``;

const Action = styled.button`
  width: 35px;
  height: 35px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: 0px;
  background-color: white;
  font-weight: 0.5em;

  &:focus,
  &:hover {
    border-radius: 50%;
    background-color: rgb(245, 135, 169, 30%);
  }
`;
const NumLike = styled.div`
  display: flex;
  margin-left: -100px;
`;

export default ActionBar;
