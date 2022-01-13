import React from "react";
import { ReactComponent as MyIcon } from "../logo.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { COLORS } from "../constants";

import styled from "styled-components";
import { Home } from "react-feather";
import { User } from "react-feather";
import { Bell } from "react-feather";
import { Bookmark } from "react-feather";
const HomeIconStyle = { marginTop: "11px" };
const SideBar = () => {
  return (
    <Wrapper>
      <Logo>
        <MyIcon width="50" height="50" />
      </Logo>
      <Nav>
        <NavLinkStyle style={{ paddingTop: "10px" }} exact to="/">
          <Icon>
            <Home style={HomeIconStyle} />
          </Icon>
          <p>Home</p>

          {/* <Icon>{FiHome}</Icon> */}
        </NavLinkStyle>

        <NavLinkStyle to="/treasurymog">
          <Icon>
            <User />
          </Icon>
          Profile
        </NavLinkStyle>
        <NavLinkStyle to="/notifications">
          <Icon>
            <Bell />
          </Icon>
          Notifications
        </NavLinkStyle>
        <NavLinkStyle to="/bookmarks">
          <Icon>
            <Bookmark />
          </Icon>
          Bookmarks
        </NavLinkStyle>
      </Nav>
      <Button>Meow</Button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 30%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  overflow-x: hidden;
  border-right: 2px solid ${COLORS.divider};
  /* overflow: hidden; */

  /* font-family: "Raleway";
  height: 100%;
  width: 160px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 20px; */
`;
const Logo = styled.div`
  align-self: center;
  margin-bottom: 20px;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
`;
const NavLinkStyle = styled(NavLink)`
  display: flex;
  padding: 10px;
  padding-top: 10px;
  text-decoration: none;
  color: black;
  margin-top: 10px;
  vertical-align: baseline;

  &.active {
    color: ${COLORS.primary};
    background-color: ${COLORS.hoverPurple};
    border-radius: 20px;
  }
`;
const Icon = styled.div`
  margin-right: 20px;

  /* vertical-align: center; */
`;
const Button = styled.button`
  width: 150px;
  background-color: ${COLORS.primary};
  padding: 10px;
  color: white;
  font-size: 15px;
  border-radius: 20px;
  margin-top: 20px;
  border-style: none;
`;

export default SideBar;
