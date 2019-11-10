import React, { useContext } from "react";
import Warning from "@components/Warning";
import { AppContext } from "@components/Context";
import styled, { createGlobalStyle } from "styled-components";
import Intro from "@components/Intro";
import Div100vh from "react-div-100vh";
import WinXPComponent from "@winxp/src";

const Main = () => {
  const {
    clickWarning: [click],
    clickDown: [clickDown],
  } = useContext(AppContext);

  return (
    <>
      <GlobalStyle />
      {clickDown && (
        <WinXPWrapper>
          <WinXPComponent />
        </WinXPWrapper>
      )}
      {!clickDown && (
        <Div100vh>
          {!clickDown && <Intro showScene={click} />}
          {!click && <Warning />}
        </Div100vh>
      )}
    </>
  );
};

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

html,
#root {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #272727;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
}

html,
*,
*::before,
*::after,
*::focus {
  outline: 0;
}

body {
  position: fixed;
  overflow: hidden;
  margin: 0px;
  overscroll-behavior-y: none;
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial,
    sans-serif;
  color: black;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`;

const WinXPWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  margin: 0;
  overflow: hidden;
`;

export default Main;
