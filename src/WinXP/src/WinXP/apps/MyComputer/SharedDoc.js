import React from "react";
import pdf from "@winxp/src/assets/windowsIcons/pdf.png";
import hwp from "@winxp/src/assets/windowsIcons/hwp.png";
import Icon from "./Icon";

const SharedDoc = () => {
  return (
    <div className="com__content__right">
      <div className="com__content__right__card">
        {/* <div className="com__content__right__card__header">
        Files Stored on This Computer
      </div> */}

        <div className="com__content__right__card__content">
          <Icon icon={pdf} title="솔르윗SolLeWitt" />
          <Icon icon={pdf} title="아나이스닌AnaisNin" />
          <Icon icon={pdf} title="이본레이너YvonneRainer" />
          <Icon icon={pdf} title="캐롤리슈니만CaroleeSchneemann" />
          <Icon icon={pdf} title="소피칼SophieCalle" />
          <Icon icon={hwp} title="개념미술_번역" />
          <Icon icon={hwp} title="매니페스토_정리" />
          <Icon icon={hwp} title="Portrait_historie" />
        </div>
      </div>
    </div>
  );
};

export default SharedDoc;
