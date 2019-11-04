import React from 'react';
import styled from 'styled-components';

const Icon = ({ icon, title }) => {
  return (
    <Container>
      <div className="com__content__right__card__item">
        <img src={icon} alt="icon" className="com__content__right__card__img" />
        <div className="com__content__right__card__img-container">
          <div className="com__content__right__card__text">{title}</div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .com__content__right {
    height: 100%;
    overflow: auto;
    background-color: #fff;
    flex: 1;
  }
  .com__content__right__card__header {
    width: 300px;
    font-weight: 700;
    padding: 2px 0 3px 12px;
    position: relative;
    &:after {
      content: '';
      display: block;
      background: linear-gradient(to right, #70bfff 0, #fff 100%);
      position: absolute;
      bottom: 0;
      left: -12px;
      height: 1px;
      width: 100%;
    }
  }
  .com__content__right__card__content {
    display: flex;
    align-items: center;
    padding-right: 0;
    flex-wrap: wrap;
    padding: 15px 15px 0;
  }
  .com__content__right__card__item {
    display: flex;
    align-items: center;
    width: 200px;
    margin-bottom: 15px;
    height: auto;
  }
  .com__content__right__card__img {
    width: 45px;
    height: 45px;
    margin-right: 5px;
    filter: ${({ isFocus, displayFocus }) =>
      isFocus && displayFocus ? 'drop-shadow(0 0 blue)' : ''};
  }
  .com__content__right__card__text {
    white-space: nowrap;
    height: 100%;
    background-color: ${({ isFocus, displayFocus }) =>
      isFocus && displayFocus ? '#0b61ff' : 'transparent'};
  }
  .com__content__right__card--me {
    .com__content__right__card__header:after,
    .com__content__right__card__header {
      transition: 0.4s;
    }
    &:hover {
      .com__content__right__card__header:after {
        width: 0;
      }
      .com__content__right__card__header {
        transform: scale(1.2) translate(20px, 5px);
      }
    }
  }
  .com__content__right__card__item--me {
    display: flex;
    align-items: center;
    width: 200px;
    margin-bottom: 15px;
    height: auto;
    & > * {
      transition: transform 0.2s;
    }
    &:hover .com__content__right__card__img {
      transform: rotate(-10deg) scale(0.9);
    }
    &:hover .com__content__right__card__text {
      transform: scale(1.2);
      transition-timing-function: cubic-bezier(0.23, 1.93, 0.59, -0.15);
    }
  }
`;

export default Icon;
