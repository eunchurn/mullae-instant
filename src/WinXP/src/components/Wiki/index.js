import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import antiheroic from './anti-heroic.md';
import artwork from './artwork.md';
import beingmoved from './being-moved.md';
import camp from './camp.md';
import choreography from './choreography.md';
import defacto from './defacto.md';
import digital from './digital.md';
import glamour from './glamour.md';
import makebelieve from './makebelieve.md';
import manifesto from './manifesto.md';
import modusoperandi from './modusoperandi.md';
import moving from './moving.md';
import spectacle from './spectacle.md';
import spectator from './spectator.md';
import stage from './stage.md';
import starimage from './starimage.md';
import style from './style.md';
import supplement from './supplement.md';
import transcendency from './transcendency.md';
import transformation from './transformation.md';
import virtuosity from './virtuosity.md';
import wiles from './wiles.md';
import mullaeinstant from './mullaeinstant-dic.md';

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

const ContentTitle = styled.div`
  padding-left: 10px;
  font-weight: 600;
  font-size: 24px;
`;
const TagContainer = styled.div`
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`;

const Tag = styled.span`
  margin-top: 20px;
  padding-left: 10px;
  display: inline-block;
  cursor: help;
`;

const Main = ({ className }) => {
  const [state, setState] = useState(mullaeinstant);
  return (
    <div className={className}>
      <Container>
        <Recto>
          <ContentCover>
            <ReactMarkdown source={state} escapeHtml={false} />
          </ContentCover>
        </Recto>
        <Verso>
          <ContentCover>
            <ContentTitle onClick={() => setState(mullaeinstant)}>
              <span role="img" aria-label="book">
                underscore dictionary 📒
              </span>
            </ContentTitle>
            <TagContainer>
              <Tag onClick={() => setState(antiheroic)}>#anti-heroic</Tag>
              <Tag onClick={() => setState(artwork)}>#artwork</Tag>
              <Tag onClick={() => setState(beingmoved)}>#being-moved</Tag>
              <Tag onClick={() => setState(camp)}>#camp</Tag>
              <Tag onClick={() => setState(choreography)}>#choreography</Tag>
              <Tag onClick={() => setState(defacto)}>#De_facto</Tag>
              <Tag onClick={() => setState(digital)}>#digital</Tag>
              <Tag onClick={() => setState(glamour)}>#glamour</Tag>
              <Tag onClick={() => setState(makebelieve)}>#make-believe</Tag>
              <Tag onClick={() => setState(manifesto)}>#manifesto</Tag>
              <Tag onClick={() => setState(modusoperandi)}>#modus_operandi</Tag>
              <Tag onClick={() => setState(moving)}>#moving</Tag>
              <Tag onClick={() => setState(spectacle)}>#spectacle</Tag>
              <Tag onClick={() => setState(spectator)}>#spectator</Tag>
              <Tag onClick={() => setState(stage)}>#stage</Tag>
              <Tag onClick={() => setState(starimage)}>#star_image</Tag>
              <Tag onClick={() => setState(style)}>#style</Tag>
              <Tag onClick={() => setState(supplement)}>#supplement</Tag>
              <Tag onClick={() => setState(transcendency)}>#transcendency</Tag>
              <Tag onClick={() => setState(transformation)}>
                #transformation
              </Tag>
              <Tag onClick={() => setState(virtuosity)}>#virtuosity</Tag>
              <Tag onClick={() => setState(wiles)}>#wiles</Tag>
            </TagContainer>
          </ContentCover>
        </Verso>
      </Container>
    </div>
  );
};

export default Main;
