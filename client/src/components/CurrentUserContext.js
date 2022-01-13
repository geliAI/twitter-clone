import React, { createContext, useState, useReducer } from "react";
import ErrorPage from "./ErrorPage";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);

  const [status, setStatus] = React.useState("loading");
  const [profileChangeStatus, setProfileChangeStatus] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
        console.log(err);
      });
  }, []);
  if (status === "error") {
    return <ErrorPage />;
  }
  //   console.log(status, currentUser);
  // Fetch the user data from the API (/me/profile)
  // When the data is received, update currentUser.
  // Also, set `status` to `idle`

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        status,
        profileChangeStatus,
        setProfileChangeStatus,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
