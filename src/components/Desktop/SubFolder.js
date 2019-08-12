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

const SubFolder = () => {
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
        <svg
          x="0px"
          y="0px"
          width="18"
          height="12"
          viewBox="0 0 18 12"
          style={{ marginRight: '6px' }}
        >
          <path
            fill="#727476"
            d="M13.2,0H4.9L0,6.8v3.7C0,11.3,0.7,12,1.5,12h15c0.8,0,1.5-0.7,1.5-1.5V6.8L13.2,0z M13.8,6.8L12.3,9L5.9,9L4.2,6.8l-3.1,0l4.2-6h7.4l4.2,6L13.8,6.8z"
          />
          <polygon
            fill="#C9CBCD"
            points="13.8,6.8 12.3,9 5.9,9 4.2,6.8 1.2,6.7 5.4,0.8 12.8,0.817,6.7 "
          />
        </svg>
        <Text color="#414141" size="13">
          {info}
        </Text>
      </ListViewRow>
    );
  };
  return (
    <ListView background="#f1f2f4" width="400">
      <ListViewHeader>
        <Text size="11" color="#696969">
          Order by name
        </Text>
      </ListViewHeader>
      <ListViewSection header={renderSectionHeader('사진작업 모음')}>
        {renderItem('subItem 1', 'photo_2019-08-04_00-49-18.jpg')}
        {renderItem('subItem 2', '스크린샷 002.png')}
        {renderItem('subItem 3', '스크린샷 003.png')}
      </ListViewSection>
      <ListViewFooter>
        <Text size="11" color="#696969">
          {'Sub Folder'}
        </Text>
      </ListViewFooter>
    </ListView>
  );
};

export default SubFolder;
