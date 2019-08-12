import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import Div100vh from 'react-div-100vh'
import { WarningContainer } from '@components/styles';
import MiIntro from '@images/miIntro.svg';
import WarningWindow from './window';

// const Background = styled(MiIntro)`
//   position: absolute;
//   margin-top: 0;
// `;

const Background = styled.div`
  position: absolute;
  background-color: blue;
`;


const Warning = () => {
  return (
    <Div100vh>
      <Background />
      <Draggable>
        <WarningContainer>
          <WarningWindow />
        </WarningContainer>
      </Draggable>
    </Div100vh>
  );
};

export default Warning;
