import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import antiheroic from './anti-heroic.md';
import artwork from "./artwork.md";
import beingmoved from "./being-moved.md";
import camp from "./camp.md";
import choreography from "./choreography.md";
import defacto from "./defacto.md";
import digital from "./digital.md";
import glamour from "./glamour.md";
import makebelieve from "./makebelieve.md";
import manifesto from "./manifesto.md";
import modusoperandi from "./modusoperandi.md";
import moving from "./moving.md";
import spectacle from "./spectacle.md";
import spectator from "./spectator.md";
import stage from "./stage.md";
import starimage from "./starimage.md";
import style from "./style.md";
import supplement from "./supplement.md";
import transcendency from "./transcendency.md";
import transformation from "./transformation.md";
import virtuosity from "./virtuosity.md";
import wiles from "./wiles.md";

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
  font-feature-settings: 'liga';
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
    font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 2.57rem;
    line-height: 1.1;
    line-height: 1.08;
    word-spacing: -0.2rem;
  }
`;

const Main = ({ className }) => {
  const [state, setState] = useState(antiheroic);
  return (
    <div className={className}>
      <Container>
        <Recto>
          <ContentCover>
            <ReactMarkdown source={state} />
          </ContentCover>
        </Recto>
        <Verso>
          <ContentCover>
            <h1>#mullae_instant Wiki</h1>
            <div onClick={() => setState(antiheroic)}><h3>#anti-heroic</h3></div>
            <div onClick={() => setState(artwork)}><h3>#artwork</h3></div>
            <div onClick={() => setState(beingmoved)}><h3>#being-moved</h3></div>
            <div onClick={() => setState(camp)}><h3>#camp</h3></div>
            <div onClick={() => setState(choreography)}><h3>#choreography</h3></div>
            <div onClick={() => setState(defacto)}><h3>#De_facto</h3></div>
            <div onClick={() => setState(digital)}><h3>#digital</h3></div>
            <div onClick={() => setState(glamour)}><h3>#glamour</h3></div>
            <div onClick={() => setState(makebelieve)}><h3>#make-believe</h3></div>
            <div onClick={() => setState(manifesto)}><h3>#manifesto</h3></div>
            <div onClick={() => setState(modusoperandi)}><h3>#modus_operandi</h3></div>
            <div onClick={() => setState(moving)}><h3>#moving</h3></div>
            <div onClick={() => setState(spectacle)}><h3>#spectacle</h3></div>
            <div onClick={() => setState(spectator)}><h3>#spectator</h3></div>
            <div onClick={() => setState(stage)}><h3>#stage</h3></div>
            <div onClick={() => setState(starimage)}><h3>#star_image</h3></div>
            <div onClick={() => setState(style)}><h3>#style</h3></div>
            <div onClick={() => setState(supplement)}><h3>#supplement</h3></div>
            <div onClick={() => setState(transcendency)}><h3>#transcendency</h3></div>
            <div onClick={() => setState(transformation)}><h3>#transformation</h3></div>
            <div onClick={() => setState(virtuosity)}><h3>#virtuosity</h3></div>
            <div onClick={() => setState(wiles)}><h3>#wiles</h3></div>
          </ContentCover>
        </Verso>
      </Container>
    </div>
  );
};

export default Main;
