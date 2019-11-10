import React from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import Div100vh from "react-div-100vh";
import { WarningContainer } from "@components/styles";
import MyComputer from "@images/myComputer.svg";
import NetworkNeighborhood from "@images/networkNeighborhood.svg";
import RecycleBin from "@images/recycleBin.svg";
import Folder from "@images/folderIntro.svg";
import BottomBack from "@images/footer.svg";
import StartWarning from "@images/startWarning.svg";
import WarningWindow from "./window";

const Wrapper = styled.div`
  position: absolute;
  background-color: #00207f;
  width: 100vw;
  height: 100vh;
`;

const GridWrap = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 38px;
  grid-template-areas:
    "leftup rightup"
    "footer footer";
`;

const LeftUp = styled.div`
  grid-area: leftup;
  display: flex;
  flex-direction: column;
`;

const Footer = styled.div`
  grid-area: footer;
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: column;
  justify-content: flex-end;
`;

const FooterContainer = styled.div`
  display: flex;
  position: relative;
  height: 38px;
  flex-direction: row;
  justify-content: space-between;
  z-index: 5;
`;

const Bottom = styled(BottomBack)`
  position: fixed;
  z-index: 4;
`;
const iconSize = "80";

const Warning = () => {
  const Default = (
    <Div100vh>
      <Wrapper>
        <GridWrap>
          <LeftUp>
            <MyComputer width={iconSize} />
            <NetworkNeighborhood width={iconSize} />
            <RecycleBin width={iconSize} />
            <Folder width={iconSize} />
          </LeftUp>
          <Footer>
            <Bottom height="38px" />
            <FooterContainer>
              <StartWarning />
            </FooterContainer>
          </Footer>
        </GridWrap>
      </Wrapper>
      <Draggable>
        <WarningContainer>
          <WarningWindow />
        </WarningContainer>
      </Draggable>
    </Div100vh>
  );
  // const Windows = <Win95 />;
  return Default;
};

export default Warning;
