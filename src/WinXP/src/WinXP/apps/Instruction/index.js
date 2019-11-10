import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { WindowDropDowns } from "@winxp/src/components";
import instruction from "./instruction.md";
import dropDownData from "./dropDownData";

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  background-color: #ffffff;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  min-width: 500px;
`;

const Instruction = ({ onClose }) => {
  function onClickOptionItem(item) {
    switch (item) {
      case "Close":
        onClose();
        break;
      default:
    }
  }
  return (
    <Div>
      <section className="np__toolbar">
        <WindowDropDowns items={dropDownData} onClickItem={onClickOptionItem} />
      </section>
      <Container>
        <ReactMarkdown source={instruction} escapeHtml={false} />
      </Container>
    </Div>
  );
};

const Div = styled.div`
  height: 100%;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .np__toolbar {
    position: relative;
    height: 21px;
    flex-shrink: 0;
    border-bottom: 1px solid white;
  }
`;

export default Instruction;
