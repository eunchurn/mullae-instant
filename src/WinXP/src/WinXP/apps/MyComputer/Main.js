import React from 'react';
import styled from 'styled-components';
import ga from 'react-ga';

import Icon from './Icon';
import disk from '@winxp/src/assets/windowsIcons/334(48x48).png';
import folder from '@winxp/src/assets/windowsIcons/318(48x48).png';

const Main = () => {
  return (
    <div className="com__content__right">
      <div className="com__content__right__card">
        <div className="com__content__right__card__header">
          Files Stored on This Computer
        </div>
        <div className="com__content__right__card__content">
          <Icon
            title="Shared Documents"
            icon={folder}
            onDoubleClick={onDoubleClickSD}
          />
          <Icon
            title="User's Documents"
            icon={folder}
            onDoubleClick={onDoubleClickUD}
          />
        </div>
      </div>
      <div className="com__content__right__card">
        <div className="com__content__right__card__header">
          Hard Disk Drives
        </div>
        <div className="com__content__right__card__content">
          <div className="com__content__right__card__item">
            <img
              src={disk}
              alt="disk"
              className="com__content__right__card__img"
            />
            <div className="com__content__right__card__img-container">
              <div className="com__content__right__card__text">
                Local Disk (C:)
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="com__content__right__card">
        <div className="com__content__right__card__header">
          Devices with Removable Storage
        </div>
        <div className="com__content__right__card__content">
          <div className="com__content__right__card__item">
            <div className="com__content__right__card__img-container">
              <img
                src={cd}
                alt="cd"
                className="com__content__right__card__img"
              />
            </div>
            <div className="com__content__right__card__text">CD Drive (D:)</div>
          </div>
        </div>
      </div>
      <div className="com__content__right__card com__content__right__card--me">
        <div className="com__content__right__card__header">Favorites</div>
        <div className="com__content__right__card__content">
          <ga.OutboundLink
            eventLabel="https://studio-underscore.com"
            to="https://studio-underscore.com"
            className="com__content__right__card__item--me"
            target="_blank"
          >
            <img
              className="com__content__right__card__img"
              src={udscr}
              alt="control"
            />
            <div className="com__content__right__card__text">underscore</div>
          </ga.OutboundLink>
          <ga.OutboundLink
            eventLabel="https://instagram.com/mullaeinstant"
            to="https://instagram.com/mullaeinstant"
            className="com__content__right__card__item--me"
            target="_blank"
          >
            <img
              className="com__content__right__card__img"
              src={instagram}
              alt="control"
            />
            <div className="com__content__right__card__text">
              @mullaeinstant
            </div>
          </ga.OutboundLink>
        </div>
      </div>
    </div>
  );
};

export default Main;
