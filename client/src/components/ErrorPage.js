import React from "react";
import { FaBomb } from "react-icons/fa";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <Wrapper>
        <FaBomb style={{ width: "50px", height: "50px" }} />
        <ErrorMsg>An unknown error has occurred.</ErrorMsg>
        <p>
          Please try refreshing the page, or <a href="#">contact support</a> if
          the problem persists.
        </p>
      </Wrapper>
    </ErrorContainer>
  );
};
const ErrorContainer = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  top: 50px;

  width: 500px;
  height: 500px;
  border: 1px solid #727272;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 3px 25px 2px #727272;
`;

const ErrorMsg = styled.p`
  font-size: 1.5em;
  font-weight: bolder;
  margin-top: 50px;
`;
export default ErrorPage;
