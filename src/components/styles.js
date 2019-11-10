import styled from "styled-components";

export const IntroContainer = styled.div`
  position: absolute;
  width: 100vw;
  min-height: -webkit-fill-available;
  margin: 0;
  padding: 0;
  background-color: #272727;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow-x: hidden;
`;

export const ScrollContainer = styled.div`
  position: absolute;
  overflow: auto;
  top: 0px;
  width: 100%;
  height: 100vh;
  font-size: 20em;
  font-weight: 800;
  line-height: 0.9em;
  div {
    height: "525vh";
  }
`;
export const WarningContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
