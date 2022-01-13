import React, { useState } from "react";
import styled from "styled-components";

import { LoadingState } from "./LoadingState";
import Tweet from "./Tweet";
import ErrorPage from "./ErrorPage";
import { CurrentUserContext } from "./CurrentUserContext";

const ProfileTab = ({ profileId }) => {
  const { profileChangeStatus, setProfileChangeStatus } =
    React.useContext(CurrentUserContext);
  const initialState = {
    tweetsById: null,
    tweetIds: null,
  };

  // console.log(`/api/${profileId}/profile`);
  const [profileTabData, setProfileTabData] = useState(initialState);
  const [profileTabStatus, setProfileTabStatus] = useState("loading");

  React.useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((data) => {
        setProfileTabData(data);
        setProfileTabStatus("idle");
      })
      .catch((err) => {
        setProfileTabStatus("error");
        console.log(err);
      });
  }, [profileChangeStatus]);

  if (profileTabStatus === "error") {
    return <ErrorPage />;
  }
  if (profileTabStatus === "loading") {
    return <LoadingState />;
  }
  //   console.log(profileTabData);
  const tweetIds = profileTabData.tweetIds;
  const tweetsById = profileTabData.tweetsById;
  return (
    <Wrapper>
      {tweetIds.map((tweetid) => {
        return (
          //   <Link to={`/items/${tweetid}`}>
          <Tweet tweet={tweetsById[tweetid]} tweetid={tweetid} key={tweetid} />
          //   </Link>
        );
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div``;
export default ProfileTab;
