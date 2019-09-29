import React from "react";
import styled from "styled-components";
// import ReactMarkdown from 'react-markdown';

const Container = styled.div`
  // position: relative;
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:500,700&display=swap');
  top: 0;
  width: 100%;
  height: 100%;
  div::-webkit-scrollbar-thumb {
    background: #000;
  }
  div::-webkit-scrollbar {
    width: 0.25rem;
    height: 0.25rem;
  }
  div::-webkit-scrollbar-track {
    background: #000;
  }
  div::selection {
    background: transparent;
    color: #2828ff;
    text-shadow: none;
  }
`;

const ContentCover = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.05rem;
  line-height: 1.15;
`;
const Recto = styled.div`
  right: 0.5%;
  width: 49.5%;
  position: absolute;
  top: 0;
  bottom: 0;
  // width: 50%;
  overflow-y: scroll;
  padding: 1.5rem 2rem 2rem 2rem;
  box-sizing: border-box;
  background-color: #fff;
  list-style: none;
`;

const Verso = styled.div`
  left: 0;
  margin-left: 0.124rem;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  overflow-y: scroll;
  padding: 1.5rem 2rem 2rem 2rem;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 100%;
  font-weight: 700;
  list-style: none;
  li {
    cursor: pointer;
    font-family: 'Noto Sans KR', sans-serif;
    text-rendering: optimizeLegibility;
    font-feature-settings: "liga";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 2.57rem;
    line-height: 1.1;
    line-height: 1.08;
    word-spacing: -0.2rem;
  }
`;
const Main = ({ className }) => {
  return (
    <div className={className}>
      <Container>
        <Recto>
          <ContentCover>
            <h2>DESCRIPTION</h2>
            <h3>
              문래 인스턴트는 ‘작업실’을 테마로, 작업의 작동방식(modus
              operandi)를 탐구하는 프로젝트이다. 언더스코어는 ‘문래창작촌’이라는
              실재의 공간을 담론적 장소로 상정하고, ‘작업’이라는 행위와 그러한
              행위가 이루어지는 장소로서의 ‘작업실’에 대한 사유를 통해 ‘창작’의
              몸체를 더듬어 나간다. 이를 위해서, 언더스코어는 유동하는
              시각장이자 또는 시각체제를 매개하는 일종의 장치로서 사이버
              스페이스를 활용하여 수행적 행위가 미디어에 의해 물화되고,
              유통되고, 재생산되고, 분산되는 과정을 추적함으로써 무대의
              물리적/개념적 탄성(elasticity)을 실험한다.
            </h3>
            <h3>
              underscore presumes the real space of ‘Mullae Art Village’ as a
              discursive place, and senses through the body of 'creation' by the
              action of 'working' and thoughts on 'workroom' as where that
              action takes place. To do so, underscore utilizes the cyberspace
              as a flowing visual field as well as an appartus mediating the
              visual system, and traces the process of performative action being
              reified, circulated, reproduced, and dispersed through media.
              #mullae_instant is thus an experiment on the physical/conceptual
              elasticity of the stage.
            </h3>
            <h2>CREDIT</h2>
            <h3>
              <li>Conceived by underscore</li>
              <li>Assisted by Dasom Kim</li>
              <li>Sound and Web Programming by eunchurn</li>
              <li>Designed by Inkyung Baik</li>
              <li>Translation by Hakyung Sim</li>
              <li>
                Sponsored by SFAC (Seoul Foundation for Arts and Culture), Seoul
                Art Space Mullae, GS SHOP
              </li>
              <br />
              <li>
                *This project has been selected as part of the 2019 MEET
                program* 
              </li>
            </h3>
          </ContentCover>
        </Recto>
        <Verso>
          <ContentCover>
            <h1>#mullae_instant Wiki</h1>
            <h3>Coming Soon...</h3>
          </ContentCover>
        </Verso>
      </Container>
    </div>
  );
};

export default Main;
