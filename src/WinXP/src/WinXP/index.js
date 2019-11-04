import React, { useReducer, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import useMouse from 'react-use/lib/useMouse';
import ga from 'react-ga';
import { DashedBox } from '@winxp/src/components';
import bg from '../assets/winxp.mp4';
import {
  ADD_APP,
  DEL_APP,
  FOCUS_APP,
  MINIMIZE_APP,
  TOGGLE_MAXIMIZE_APP,
  FOCUS_ICON,
  SELECT_ICONS,
  FOCUS_DESKTOP,
  START_SELECT,
  END_SELECT,
  POWER_OFF,
  CANCEL_POWER_OFF,
} from './constants/actions';
import { FOCUSING, POWER_STATE } from './constants';
import { defaultIconState, defaultAppState, appSettings } from './apps';
import Modal from './Modal';
import Footer from './Footer';
import Windows from './Windows';
import Icons from './Icons';

const initState = {
  apps: defaultAppState,
  nextAppID: defaultAppState.length,
  nextZIndex: defaultAppState.length,
  focusing: FOCUSING.WINDOW,
  icons: defaultIconState,
  selecting: false,
  powerState: POWER_STATE.START,
};
const reducer = (state, action = { type: '' }) => {
  ga.event({
    category: 'XP interaction',
    action: action.type,
  });
  switch (action.type) {
    case ADD_APP:
      const app = state.apps.find(
        _app => _app.component === action.payload.component,
      );
      if (action.payload.multiInstance || !app) {
        return {
          ...state,
          apps: [
            ...state.apps,
            {
              ...action.payload,
              id: state.nextAppID,
              zIndex: state.nextZIndex,
            },
          ],
          nextAppID: state.nextAppID + 1,
          nextZIndex: state.nextZIndex + 1,
          focusing: FOCUSING.WINDOW,
        };
      }
      const apps = state.apps.map(app =>
        app.component === action.payload.component
          ? { ...app, zIndex: state.nextZIndex, minimized: false }
          : app,
      );
      return {
        ...state,
        apps,
        nextZIndex: state.nextZIndex + 1,
        focusing: FOCUSING.WINDOW,
      };
    case DEL_APP:
      return {
        ...state,
        apps: state.apps.filter(app => app.id !== action.payload),
        focusing:
          state.apps.length > 1
            ? FOCUSING.WINDOW
            : state.icons.find(icon => icon.isFocus)
            ? FOCUSING.ICON
            : FOCUSING.DESKTOP,
      };
    case FOCUS_APP: {
      const apps = state.apps.map(app =>
        app.id === action.payload
          ? { ...app, zIndex: state.nextZIndex, minimized: false }
          : app,
      );
      return {
        ...state,
        apps,
        nextZIndex: state.nextZIndex + 1,
        focusing: FOCUSING.WINDOW,
      };
    }
    case MINIMIZE_APP: {
      const apps = state.apps.map(app =>
        app.id === action.payload ? { ...app, minimized: true } : app,
      );
      return {
        ...state,
        apps,
        focusing: FOCUSING.WINDOW,
      };
    }
    case TOGGLE_MAXIMIZE_APP: {
      const apps = state.apps.map(app =>
        app.id === action.payload ? { ...app, maximized: !app.maximized } : app,
      );
      return {
        ...state,
        apps,
        focusing: FOCUSING.WINDOW,
      };
    }
    case FOCUS_ICON: {
      const icons = state.icons.map(icon => {
        if (icon.id === action.payload)
          return {
            ...icon,
            isFocus: true,
          };
        return {
          ...icon,
          isFocus: false,
        };
      });
      return {
        ...state,
        focusing: FOCUSING.ICON,
        icons,
      };
    }
    case SELECT_ICONS: {
      const icons = state.icons.map(icon => ({
        ...icon,
        isFocus: action.payload.includes(icon.id),
      }));
      return {
        ...state,
        icons,
        focusing: FOCUSING.ICON,
      };
    }
    case FOCUS_DESKTOP:
      return {
        ...state,
        focusing: FOCUSING.DESKTOP,
        icons: state.icons.map(icon => ({
          ...icon,
          isFocus: false,
        })),
      };
    case START_SELECT:
      return {
        ...state,
        focusing: FOCUSING.DESKTOP,
        icons: state.icons.map(icon => ({
          ...icon,
          isFocus: false,
        })),
        selecting: action.payload,
      };
    case END_SELECT:
      return {
        ...state,
        selecting: null,
      };
    case POWER_OFF:
      return {
        ...state,
        powerState: action.payload,
      };
    case CANCEL_POWER_OFF:
      return {
        ...state,
        powerState: POWER_STATE.START,
      };
    default:
      return state;
  }
};

const WinXP = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const ref = useRef(null);
  const videoRef = useRef();
  const mouse = useMouse(ref);
  const getFocusedAppId = () => {
    const focusedApp = [...state.apps]
      .sort((a, b) => b.zIndex - a.zIndex)
      .find(app => !app.minimized);
    return focusedApp ? focusedApp.id : -1;
  };
  const focusedAppId = getFocusedAppId();
  const onFocusApp = useCallback(id => {
    dispatch({ type: FOCUS_APP, payload: id });
  }, []);
  const onMaximizeWindow = useCallback(
    id => {
      if (focusedAppId === id && state.focusing === FOCUSING.WINDOW) {
        dispatch({ type: TOGGLE_MAXIMIZE_APP, payload: id });
      }
    },
    [focusedAppId, state.focusing],
  );
  const onMinimizeWindow = useCallback(
    id => {
      if (focusedAppId === id && state.focusing === FOCUSING.WINDOW) {
        dispatch({ type: MINIMIZE_APP, payload: id });
      }
    },
    [focusedAppId, state.focusing],
  );
  const onCloseApp = useCallback(
    id => {
      if (focusedAppId === id && state.focusing === FOCUSING.WINDOW) {
        dispatch({ type: DEL_APP, payload: id });
      }
    },
    [focusedAppId, state.focusing],
  );
  const onMouseDownFooterApp = id => {
    if (focusedAppId === id) {
      dispatch({ type: MINIMIZE_APP, payload: id });
    } else {
      dispatch({ type: FOCUS_APP, payload: id });
    }
  };
  const onMouseDownIcon = id => {
    dispatch({ type: FOCUS_ICON, payload: id });
  };
  const onDoubleClickIcon = component => {
    const appSetting = Object.values(appSettings).find(
      setting => setting.component === component,
    );
    dispatch({ type: ADD_APP, payload: appSetting });
  };
  const onMouseDownFooter = () => dispatch({ type: FOCUS_DESKTOP });

  const onClickMenuItem = o => {
    if (o === 'Internet')
      dispatch({ type: ADD_APP, payload: appSettings['Internet Explorer'] });
    else if (o === 'Minesweeper')
      dispatch({ type: ADD_APP, payload: appSettings.Minesweeper });
    else if (o === 'My Computer')
      dispatch({ type: ADD_APP, payload: appSettings['My Computer'] });
    else if (o === 'Notepad')
      dispatch({ type: ADD_APP, payload: appSettings.Notepad });
    else if (o === 'Winamp')
      dispatch({ type: ADD_APP, payload: appSettings.Winamp });
    else if (o === 'Paint')
      dispatch({ type: ADD_APP, payload: appSettings.Paint });
    else if (o === 'Log Off')
      dispatch({ type: POWER_OFF, payload: POWER_STATE.LOG_OFF });
    else if (o === 'Turn Off Computer')
      dispatch({ type: POWER_OFF, payload: POWER_STATE.TURN_OFF });
    else
      dispatch({
        type: ADD_APP,
        payload: {
          ...appSettings.Error,
          injectProps: { message: 'C:\\\nApplication not found' },
        },
      });
  };
  const onMouseDownDesktop = e => {
    if (e.target === e.currentTarget)
      dispatch({
        type: START_SELECT,
        payload: { x: mouse.docX, y: mouse.docY },
      });
  };
  const onMouseUpDesktop = e => dispatch({ type: END_SELECT });

  const onIconsSelected = iconIds =>
    dispatch({ type: SELECT_ICONS, payload: iconIds });

  const onClickModalButton = text => {
    dispatch({ type: CANCEL_POWER_OFF });
    dispatch({
      type: ADD_APP,
      payload: appSettings.Error,
    });
  };
  const onModalClose = () => dispatch({ type: CANCEL_POWER_OFF });
  useEffect(() => {
    const video = document.querySelector('video');
    video.playbackRate = 1;
  }, []);
  return (
    <Container
      ref={ref}
      onMouseUp={onMouseUpDesktop}
      onMouseDown={onMouseDownDesktop}
      state={state.powerState}
    >
      <VideoWrapper>
        <video autoPlay loop muted playsInline>
          <source src={bg} type="video/mp4" />
        </video>
      </VideoWrapper>
      <Icons
        icons={state.icons}
        onMouseDown={onMouseDownIcon}
        onDoubleClick={onDoubleClickIcon}
        displayFocus={state.focusing === FOCUSING.ICON}
        appSettings={appSettings}
        mouse={mouse}
        selecting={state.selecting}
        setSelectedIcons={onIconsSelected}
      />
      <DashedBox startPos={state.selecting} mouse={mouse} />
      <Windows
        apps={state.apps}
        onMouseDown={onFocusApp}
        onClose={onCloseApp}
        onMinimize={onMinimizeWindow}
        onMaximize={onMaximizeWindow}
        focusedAppId={focusedAppId}
      />
      <Footer
        apps={state.apps}
        onMouseDownApp={onMouseDownFooterApp}
        focusedAppId={focusedAppId}
        onMouseDown={onMouseDownFooter}
        onClickMenuItem={onClickMenuItem}
      />
      {state.powerState !== POWER_STATE.START && (
        <Modal
          onClose={onModalClose}
          onClickButton={onClickModalButton}
          mode={state.powerState}
        />
      )}
    </Container>
  );
};

const powerOffAnimation = keyframes`
  0% {
    filter: brightness(1) grayscale(0);
  }
  30% {
    filter: brightness(1) grayscale(0);
  }
  100% {
    filter: brightness(0.6) grayscale(1);
  }
`;
const animation = {
  [POWER_STATE.START]: '',
  [POWER_STATE.TURN_OFF]: powerOffAnimation,
  [POWER_STATE.LOG_OFF]: powerOffAnimation,
};

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');
  font-family: Tahoma, 'Noto Sans KR', sans-serif;
  height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 0;
  // background: url(https://i.imgur.com/Zk6TR5k.jpg) no-repeat center center fixed;
  // background-size: cover;
  animation: ${({ state }) => animation[state]} 5s forwards;
  *:not(input):not(textarea) {
    user-select: none;
  }
`;

const VideoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  // z-index: -3;
  pointer-events: none;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  iframe {
    // width: 100vw;
    // height: 56.25vw; /* Given a 16:9 aspect ratio, 9/16*100 = 56.25 */
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    // min-height: 100vh;
    // min-width: 177.77vh; /* Given a 16:9 aspect ratio, 16/9*100 = 177.77 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  video {
    /* Make video to at least 100% wide and tall */
    min-width: 100%;
    min-height: 100%;

    /* Setting width & height to auto prevents the browser from stretching or squishing the video */
    width: auto;
    height: auto;

    /* Center the video */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default WinXP;
