import React from "react";
import styled from "styled-components";
// import { TweetContext } from "./TweetContext";
import { format } from "date-fns";
import { AVATAR } from "../constants";
import { useHistory } from "react-router-dom";
import { DisplayName } from "./TweetDetail";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const TweetHeader = ({ tweet }) => {
  const { profileChangeStatus, setProfileChangeStatus } =
    React.useContext(CurrentUserContext);
  const avatarSrc = tweet.author.avatarSrc;
  const displayName = tweet.author.displayName;
  const username = tweet.author.handle;

  const history = useHistory();
  const handleDisplaynameClick = (e) => {
    e.stopPropagation();
    setProfileChangeStatus(!profileChangeStatus);
    history.push(`/${username}`);
  };

  return (
    <Wrapper>
      <Avatar style={AVATAR} src={avatarSrc} />
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
      <Timestamp>{format(new Date(tweet.timestamp), "PP")}</Timestamp>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Avatar = styled.img``;

const Name = styled.div`
  flex: 1;
  display: flex;

  padding: 0px 16px;
`;
const Timestamp = styled.div`
  color: rgb(101, 119, 134);
  font-size: 14px;
  padding-bottom: 16px;
`;

// const DisplayName = styled.div`
//   font-size: 15px;
//   line-height: 20px;
//   font-weight: bold;
//   transition: transform 200ms ease-in-out;
//   &:hover {
//     transform: translateY(-2px);
//     text-shadow: 2px 2px 3px rgb(101, 119, 134);
//     cursor: pointer;
//   }
// `;

const Username = styled.div`
  font-size: 15px;
  line-height: 20px;
  margin-left: 5px;
  color: rgb(101, 119, 134);
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
export default TweetHeader;
