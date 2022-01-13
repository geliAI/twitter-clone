import React, { useState } from "react";
import styled from "styled-components";
import { MapPin } from "react-feather";
import { Calendar } from "react-feather";

import { LoadingState } from "./LoadingState";
import { DisplayName } from "./TweetDetail";
import { COLORS } from "../constants";
import format from "date-fns/format";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ProfileTab from "./ProfileTab";
import ErrorPage from "./ErrorPage";

import { CurrentUserContext } from "./CurrentUserContext";

const Profile = () => {
  const { profileChangeStatus, setProfileChangeStatus } =
    React.useContext(CurrentUserContext);
  // fetch profile data
  const initialState = {
    profile: null,
  };
  const { profileId } = useParams();
  // console.log(`/api/${profileId}/profile`);
  const [profileData, setProfileData] = useState(initialState);
  const [profileStatus, setProfileStatus] = useState("loading");

  React.useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        console.log("fetched");
        setProfileData(data);
        setProfileStatus("idle");
      })
      .catch((err) => {
        setProfileStatus("error");
        // console.log(err);
      });
  }, [profileChangeStatus]);

  if (profileStatus === "error") {
    return <ErrorPage />;
  }
  if (profileStatus === "loading") {
    return <LoadingState />;
  }
  // console.log(profileData);
  const profile = profileData.profile;
  // console.log(profile);

  // return <div>{profile.bio}</div>;

  return (
    <ProfileContainer>
      <Wrapper bannerSrc={profile.bannerSrc}>
        <Flex>
          <Avatar src={profile.avatarSrc} />
          <Button>Following</Button>
        </Flex>
        <ProfileInfo>
          <DisplayName>{profile.displayName}</DisplayName>
          <div style={{ marginTop: "6px" }}>
            <Handle>@{profile.handle}</Handle>
            {profile.isFollowingYou && (
              <IsFollowingMeTag>Follows you</IsFollowingMeTag>
            )}
          </div>
          <Bio>{profile.bio}</Bio>
        </ProfileInfo>
        <MoreInfo>
          <Div>
            <MapPin style={{ width: "20px" }} /> {profile.location}
          </Div>
          <Div>
            <Calendar style={{ width: "20px" }} />
            Joined {format(new Date(profile.joined), "PP")}
          </Div>
        </MoreInfo>
        <MoreInfo>
          <Div>
            <Bold>{profile.numFollowing}</Bold> Following
          </Div>
          <Div>
            <Bold>{profile.numFollowers}</Bold> Followers
          </Div>
        </MoreInfo>
      </Wrapper>
      <ProfileTab profileId={profileId} />
    </ProfileContainer>
  );
};
const ProfileContainer = styled.div`
  margin-left: 30%;
  max-width: 60%;
`;
const Wrapper = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  background: ${(props) => `url(${props.bannerSrc})`};

  background-repeat: no-repeat;
  background-size: 100% 200px;
  min-height: 50vh;
`;

const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 125px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid white;
  padding: 0;
`;

const ProfileInfo = styled.div`
  margin-top: 15px;
`;

const IsFollowingMeTag = styled.span`
  background-color: #ddd;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: small;
`;
const Button = styled.button`
  width: 100px;
  height: 40px;
  border: none;

  text-align: center;
  color: white;
  font-size: 15px;
  padding: 5px 10px 5px 10px;
  border-radius: 20px;

  background-color: ${COLORS.primary};
  &:hover {
    cursor: pointer;
  }
`;
const Bio = styled.div`
  margin: 20px 0;
`;

const Handle = styled.span`
  color: grey;
  margin-right: 5px;
`;
const MoreInfo = styled.div`
  display: flex;
  opacity: 0.7;
  margin-bottom: 10px;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  justify-content: space-between;
`;
const Bold = styled.span`
  font-weight: bold;
  color: black;
  margin-right: 5px;
`;
export default Profile;
