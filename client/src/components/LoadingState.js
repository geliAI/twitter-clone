import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

export const LoadingState = () => {
  return (
    <Loading>
      <CircularProgress color="secondary" />
    </Loading>
  );
};
const Loading = styled.div`
  height: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
`;
