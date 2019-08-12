import React, { useState } from 'react';
import { Window, TitleBar, Toolbar, SearchField } from 'react-desktop/macOs';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const Wrapper = styled.div`
  // box-sizing: border-box;
  // max-width: 10000px;
  display: flex;
  justify-content: center;
  padding: 1em;
  // background: white;
`;

const Container = styled.div`
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  width: 100%;
`;

const Footer = styled.div`
  align-items: flex-end;
  padding: 1em;
  font-size: 11px;
  text-align: right;
  color: '#696969';
`;

const Layout = ({ children }) => {
  const [state, setState] = useState({ isFullscreen: false });
  const handleChange = e => console.log(e.target.value);
  return (
    <>
      <Wrapper>
        <Draggable>
          <Window chrome padding="1em" height="90vh" width="70vw">
            <TitleBar
              title="문래 인스턴트 v1.0"
              inset
              controls
              isFullscreen={state.isFullscreen}
              onCloseClick={() => console.log('Close window')}
              onMinimizeClick={() => console.log('Minimize window')}
              onMaximizeClick={() => console.log('Mazimize window')}
              onResizeClick={() =>
                setState({ isFullscreen: !state.isFullscreen })}
            >
              <SearchField
                placeholder="Search"
                defaultValue=""
                onChange={handleChange}
              />
            </TitleBar>
            <Container>{children}</Container>
          </Window>
        </Draggable>
      </Wrapper>
      <Footer>© 2019 underscore. all rights reserved.</Footer>
    </>
  );
};

export default Layout;
