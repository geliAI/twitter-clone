import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import GlobalStyle from "./GlobalStyles";
import SideBar from "./components/SideBar";
import HomeFeed from "./components/HomeFeed";
import Profile from "./components/Profile";
import TweetDetail from "./components/TweetDetail";
import { CurrentUserContext } from "./components/CurrentUserContext";

const App = (props) => {
  const { currentUser, status } = React.useContext(CurrentUserContext);

  return (
    <Router>
      <GlobalStyle />

      <SideBar />

      <Switch>
        <Route exact={true} path="/">
          <HomeFeed />
        </Route>
        <Route exact={true} path="/notifications"></Route>
        <Route exact={true} path="/bookmarks"></Route>
        <Route exact={true} path="/tweet/:tweetid">
          <TweetDetail />
        </Route>
        <Route exact={true} path="/:profileId">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
