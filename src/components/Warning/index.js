import React, { useState } from "react";
import styled from "styled-components";
import warningSvg from "@images/warning.svg";
import xSvg from "@images/x.svg";

const WarningContainer = styled.div`
  position: absolute;
  max-width: 500px;
  min-height: 20px;
  margin: auto;
  z-index: 2;
  @media only screen and (max-width: 600px) {
    width: 400px;
  }
`;

const WarningInner = styled.div`
  background: #bfbfbf;
  display: block;
  min-height: 50px;
  width: 100%;
  -webkit-box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.75);
  border: 1.4px solid white;
`;

const WarningBar = styled.div`
  width: 100%;
  background: #01007a;
  height: 23px;
`;

const WarningTitle = styled.div`
  color: white;
  letter-spacing: 0.5px;
  word-spacing: 0.5px;
  padding-left: 5px;
  float: left;
  font-weight: 600;
`;

const WarningExit = styled.div`
  height: 100%;
  display: block;
  float: right;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 5px;
  padding-right: 5px;
`;

const WarningButtonExit = styled.div`
  background: #bfbfbf;
  font-weight: 600;
  color: #6f6f6f;
  height: 100%;
  width: 19px;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  border-left: 1px solid white;
  border-top: 1px solid white;
  font-size: 55%;
  margin: auto;
  text-align: center;
`;

const WarningContent = styled.div`
  height: 250px;
  width: 100%;
  clear: both;
  border-radius: 1px;
  border: 1.2px solid black;
  overflow: hidden;
  padding: 20px 30px;
  @media only screen and (max-width: 600px) {
    height: 200px;
  }
`;

const WarningIcon = styled.div`
  height: 50px;
  width: 50px;
  display: block;
  text-align: center;
  padding-top: 4px;
  font-size: 20px;
  font-weight: 300;
  float: left;
`;

const WarningMessage = styled.div`
  margin-left: 50px;
  max-width: 500px;
  font-weight: 600;
  .underscore {
    text-decoration: underline;
  }
  a {
    color: blue;
  }
  @media only screen and (max-width: 600px) {
    p {
      font-size: 11px;
    }
  }
`;

const WarningButton = styled.button`
  margin: auto;
  display: block;
  text-align: center;
  padding: 5px;
  background-color: #bfbfbf;
  border-top: 1px solid black;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  border-left: 1px solid black;
  // margin: 20px 160px;
`;

const WarningButtonBox = styled.span`
  * {
    box-sizing: border-box;
  }
`;

const WarningButtonText = styled.span`
  font-weight: 600;
  border: 1px dotted black;
  padding: 3px 40px;
  display: block;
`;

/** Windows Warning Window */
const Warning = props => {
  const { upState } = props;
  const {
    click: [state, setState]
  } = { click: useState(false), ...(upState || {}) };
  const handleClick = () => setState(!state);
  return (
    <WarningContainer>
      <WarningInner>
        <WarningBar>
          <WarningTitle>Warning!</WarningTitle>
          <WarningExit>
            <WarningButtonExit>
              <img src={xSvg} alt="x" />
            </WarningButtonExit>
          </WarningExit>
        </WarningBar>
        <WarningContent>
          <WarningIcon>
            <img src={warningSvg} alt="warning" />
          </WarningIcon>
          <WarningMessage>
            <p>
              "<span className="underscore">underscore</span>" has started to
              activate the system.
            </p>
            <p>
              You must reboot your senses <br />
              before the new settings will take effect.
            </p>
            <p>
              Click OK to access{" "}
              <a href="https://instagram.com/mullaeinstant">@mullaeinstant</a>{" "}
              now.
            </p>
          </WarningMessage>
          <WarningButton onClick={handleClick}>
            <WarningButtonBox>
              <WarningButtonText>OK</WarningButtonText>
            </WarningButtonBox>
          </WarningButton>
        </WarningContent>
      </WarningInner>
    </WarningContainer>
  );
};

export default Warning;
