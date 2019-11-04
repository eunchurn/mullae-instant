import React, { useState } from 'react';
import ga from 'react-ga';

import go from '@winxp/src/assets/windowsIcons/290.png';
import search from '@winxp/src/assets/windowsIcons/299(32x32).png';
import computer from '@winxp/src/assets/windowsIcons/676(16x16).png';
import back from '@winxp/src/assets/windowsIcons/back.png';
import forward from '@winxp/src/assets/windowsIcons/forward.png';
import up from '@winxp/src/assets/windowsIcons/up.png';
import viewInfo from '@winxp/src/assets/windowsIcons/view-info.ico';
import remove from '@winxp/src/assets/windowsIcons/302(16x16).png';
import control from '@winxp/src/assets/windowsIcons/300(16x16).png';
import network from '@winxp/src/assets/windowsIcons/693(16x16).png';
import document from '@winxp/src/assets/windowsIcons/308(16x16).png';
import folderSmall from '@winxp/src/assets/windowsIcons/318(16x16).png';
import menu from '@winxp/src/assets/windowsIcons/358(32x32).png';
import folder from '@winxp/src/assets/windowsIcons/318(48x48).png';
import folderOpen from '@winxp/src/assets/windowsIcons/337(32x32).png';
import disk from '@winxp/src/assets/windowsIcons/334(48x48).png';
import cd from '@winxp/src/assets/windowsIcons/111(48x48).png';
import dropdown from '@winxp/src/assets/windowsIcons/dropdown.png';
import pullup from '@winxp/src/assets/windowsIcons/pullup.png';
import instagram from '@images/instagram.png';
import udscr from '@images/udscr.png';

import SharedDoc from './SharedDoc';
import UserDoc from './UserDoc';
import Icon from './Icon';

const Main = () => {
  const [state, setState] = useState({ route: 'main' });
  const onDoubleClickSD = () => {
    setState({ route: 'shared' });
  };

  const onDoubleClickUD = () => {
    setState({ route: 'users' });
  };

  const goMain = () => {
    setState({ route: 'main' });
  };
  return (
    <>
      <section className="com__function_bar">
        <div
          onClick={goMain}
          className={`com__function_bar__button${
            state.route === 'main' ? '--disable' : ''
          }`}
        >
          <img className="com__function_bar__icon" src={back} alt="" />
          <span className="com__function_bar__text">Back</span>
          <div className="com__function_bar__arrow" />
        </div>
        <div className="com__function_bar__button--disable">
          <img className="com__function_bar__icon" src={forward} alt="" />
          <div className="com__function_bar__arrow" />
        </div>
        <div className="com__function_bar__button">
          <img className="com__function_bar__icon--normalize" src={up} alt="" />
        </div>
        <div className="com__function_bar__separate" />
        <div className="com__function_bar__button">
          <img
            className="com__function_bar__icon--normalize "
            src={search}
            alt=""
          />
          <span className="com__function_bar__text">Search</span>
        </div>
        <div className="com__function_bar__button">
          <img
            className="com__function_bar__icon--normalize"
            src={folderOpen}
            alt=""
          />
          <span className="com__function_bar__text">Folders</span>
        </div>
        <div className="com__function_bar__separate" />
        <div className="com__function_bar__button">
          <img
            className="com__function_bar__icon--margin12"
            src={menu}
            alt=""
          />
          <div className="com__function_bar__arrow" />
        </div>
      </section>
      <section className="com__address_bar">
        <div className="com__address_bar__title">Address</div>
        <div className="com__address_bar__content">
          <img
            src={state.route === 'main' ? computer : folder}
            alt="ie"
            className="com__address_bar__content__img"
          />
          <div className="com__address_bar__content__text">
            {state.route === 'main'
              ? 'My Computer'
              : state.route === 'shared'
              ? 'Shared Documents'
              : "User's Documents"}
          </div>
          <img
            src={dropdown}
            alt="dropdown"
            className="com__address_bar__content__img"
          />
        </div>
        <div className="com__address_bar__go">
          <img className="com__address_bar__go__img" src={go} alt="go" />
          <span className="com__address_bar__go__text">Go</span>
        </div>
      </section>
      <div className="com__content">
        <div className="com__content__inner">
          <div className="com__content__left">
            <div className="com__content__left__card">
              <div className="com__content__left__card__header">
                <div className="com__content__left__card__header__text">
                  System Tasks
                </div>
                <img
                  src={pullup}
                  alt=""
                  className="com__content__left__card__header__img"
                />
              </div>
              <div className="com__content__left__card__content">
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={viewInfo}
                    alt="view"
                  />
                  <div className="com__content__left__card__text link">
                    View system information
                  </div>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={remove}
                    alt="remove"
                  />
                  <div className="com__content__left__card__text link">
                    Add or remove programs
                  </div>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={control}
                    alt="control"
                  />
                  <div className="com__content__left__card__text link">
                    Change a setting
                  </div>
                </div>
              </div>
            </div>
            <div className="com__content__left__card">
              <div className="com__content__left__card__header">
                <div className="com__content__left__card__header__text">
                  Other Places
                </div>
                <img
                  src={pullup}
                  alt=""
                  className="com__content__left__card__header__img"
                />
              </div>
              <div className="com__content__left__card__content">
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={network}
                    alt="network"
                  />
                  <div className="com__content__left__card__text link">
                    My Network Places
                  </div>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={document}
                    alt="document"
                  />
                  <div className="com__content__left__card__text link">
                    My Documents
                  </div>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={folderSmall}
                    alt="folder"
                  />
                  <div className="com__content__left__card__text link">
                    Shared Documents
                  </div>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={control}
                    alt="control"
                  />
                  <div className="com__content__left__card__text link">
                    Control Panel
                  </div>
                </div>
              </div>
            </div>
            <div className="com__content__left__card">
              <div className="com__content__left__card__header">
                <div className="com__content__left__card__header__text">
                  Favorites
                </div>
                <img
                  src={pullup}
                  alt=""
                  className="com__content__left__card__header__img"
                />
              </div>
              <div className="com__content__left__card__content">
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={udscr}
                    alt="control"
                  />
                  <ga.OutboundLink
                    eventLabel="https://studio-underscore.com"
                    to="https://studio-underscore.com"
                    className="com__content__left__card__text link"
                    target="_blank"
                  >
                    studio-underscore
                  </ga.OutboundLink>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={instagram}
                    alt="control"
                  />
                  <ga.OutboundLink
                    eventLabel="https://instagram.com/mullaeinstant"
                    to="https://instagram.com/mullaeinstant"
                    className="com__content__left__card__text link"
                    target="_blank"
                  >
                    @mullaeinstant
                  </ga.OutboundLink>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={instagram}
                    alt="control"
                  />
                  <ga.OutboundLink
                    eventLabel="https://instagram.com/____________underscore"
                    to="https://instagram.com/____________underscore"
                    className="com__content__left__card__text link"
                    target="_blank"
                  >
                    _underscore
                  </ga.OutboundLink>
                </div>
              </div>
            </div>
          </div>
          {state.route === 'main' ? (
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
                    <div className="com__content__right__card__text">
                      CD Drive (D:)
                    </div>
                  </div>
                </div>
              </div>
              <div className="com__content__right__card com__content__right__card--me">
                <div className="com__content__right__card__header">
                  Favorites
                </div>
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
                    <div className="com__content__right__card__text">
                      underscore
                    </div>
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
          ) : state.route === 'shared' ? (
            <SharedDoc />
          ) : (
            <UserDoc />
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
