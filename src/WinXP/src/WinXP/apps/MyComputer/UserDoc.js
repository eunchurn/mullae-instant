import React from 'react';

import jpeg from '@winxp/src/assets/windowsIcons/jpeg.png';
import pdf from '@winxp/src/assets/windowsIcons/pdf.png';
import hwp from '@winxp/src/assets/windowsIcons/hwp.png';
import Icon from './Icon';

const SharedDoc = () => {
  return (
    <div className="com__content__right">
      <div className="com__content__right__card">
        {/* <div className="com__content__right__card__header">
        Files Stored on This Computer
      </div> */}

        <div className="com__content__right__card__content">
          <Icon icon={pdf} title="작업실임대차계약서" />
          <Icon icon={pdf} title="사업변경신청서" />
          <Icon icon={pdf} title="교부신청서" />
          <Icon icon={hwp} title="기획서초안" />
          <Icon icon={hwp} title="기획서수정중" />
          <Icon icon={hwp} title="기획서최종" />
          <Icon icon={hwp} title="기획서진짜최종" />
          <Icon icon={hwp} title="기획서이게레알최종" />
        </div>
      </div>
    </div>
  );
};

export default SharedDoc;
