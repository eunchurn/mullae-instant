import React, { useState } from 'react';
import {
  ListView,
  ListViewHeader,
  ListViewFooter,
  ListViewSection,
  ListViewSectionHeader,
  ListViewRow,
  ListViewSeparator,
  Text,
} from 'react-desktop/macOs';
import styled from 'styled-components';
import HddIcon from '@images/hdd-color.svg';
import Layout from './Layout';
import SubFolder from './SubFolder';
import mullaeInstant from './data';

const MainFolderContainer = styled.div`
  width: 300px;
`;

const SubFolderContainer = styled.div`
  width: 300px;
`;

const ContentContainer = styled.div`
  width: 300px;
`;

const Home = () => {
  const [state, setState] = useState({ selected: 1, itemSelected: null });
  const renderSectionHeader = title => {
    return <ListViewSectionHeader>{title}</ListViewSectionHeader>;
  };

  const renderItem = (title, info) => {
    return (
      <ListViewRow
        onClick={() => setState({ itemSelected: title })}
        background={state.itemSelected === title ? '#d8dadc' : null}
      >
        <HddIcon />
        <Text color="#414141" size="13">
          {info}
        </Text>
      </ListViewRow>
    );
  };

  return (
    <Layout>
      <MainFolderContainer>
        <ListView background="#f1f2f4">
          <ListViewHeader>
            <Text size="11" color="#696969">
              Order by name
            </Text>
          </ListViewHeader>
          {mullaeInstant.data.map(item => {
            return (
              <ListViewSection
                header={renderSectionHeader(item.name)}
                key={item.name}
              >
                {item.items.map(mainFolder =>
                  renderItem(mainFolder.id, mainFolder.title),
                )}
              </ListViewSection>
            );
          })}

          <ListViewFooter>
            <Text size="11" color="#696969">
              Main Folder
            </Text>
          </ListViewFooter>
        </ListView>
      </MainFolderContainer>
      <SubFolderContainer>
        <SubFolder />
      </SubFolderContainer>
      <ContentContainer />
    </Layout>
  );
};

export default Home;
