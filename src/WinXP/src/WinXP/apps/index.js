import iePaper from '@winxp/src/assets/windowsIcons/ie-paper.png';
import ie from '@winxp/src/assets/windowsIcons/ie.png';
import mine from '@winxp/src/assets/minesweeper/mine-icon.png';
import error from '@winxp/src/assets/windowsIcons/897(16x16).png';
import computer from '@winxp/src/assets/windowsIcons/676(16x16).png';
import computerLarge from '@winxp/src/assets/windowsIcons/676(32x32).png';
import notepad from '@winxp/src/assets/windowsIcons/327(16x16).png';
import notepadLarge from '@winxp/src/assets/windowsIcons/327(32x32).png';
import winamp from '@winxp/src/assets/windowsIcons/winamp.png';
import paintLarge from '@winxp/src/assets/windowsIcons/680(32x32).png';
import paint from '@winxp/src/assets/windowsIcons/680(16x16).png';
import folder from '@winxp/src/assets/windowsIcons/318(48x48).png';
import recycle from '@winxp/src/assets/windowsIcons/recycle-full.png';
import pdf from '@winxp/src/assets/windowsIcons/pdf.png';
// import chatbot from '@winxp/src/assets/windowsIcons/unicorn-face_1f984.png';
import Paint from './Paint';
import Winamp from './Winamp';
import Readme from './Readme';
import Notepad from './Notepad';
import MyComputer from './MyComputer';
import Recycle from './Recycle';
import ErrorBox from './ErrorBox';
import Minesweeper from './Minesweeper';
import InternetExplorer from './InternetExplorer';
import Post from './Postit';
import Noti from '../../components/Noti';
import Instruction from './Instruction';

const gen = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};
const genId = gen();
const genIndex = gen();
export const defaultAppState = [
  // {
  //   component: InternetExplorer,
  //   header: {
  //     title: 'Internet Explorer',
  //     icon: iePaper,
  //   },
  //   defaultSize: {
  //     width: 900,
  //     height: 500,
  //   },
  //   defaultOffset: {
  //     x: 130,
  //     y: 20,
  //   },
  //   resizable: true,
  //   minimized: false,
  //   maximized: window.innerWidth < 800,
  //   id: genId(),
  //   zIndex: genIndex(),
  // },
  // {
  //   component: Minesweeper,
  //   header: {
  //     title: 'Minesweeper',
  //     icon: mine,
  //   },
  //   defaultSize: {
  //     width: 0,
  //     height: 0,
  //   },
  //   defaultOffset: {
  //     x: 180,
  //     y: 170,
  //   },
  //   resizable: false,
  //   minimized: false,
  //   maximized: false,
  //   id: genId(),
  //   zIndex: genIndex(),
  // },
  {
    component: Winamp,
    header: {
      title: 'Winamp',
      icon: winamp,
      invisible: true,
    },
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 700,
      y: 100,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    id: genId(),
    zIndex: genIndex(),
  },
  {
    component: Instruction,
    header: {
      title: '오디오 가이드 메뉴얼',
      icon: pdf,
      invisible: false,
    },
    defaultSize: {
      width: 700,
      height: 850,
    },
    defaultOffset: {
      x: 400,
      y: 10,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    id: genId(),
    zIndex: genIndex(),
  },
  // {
  //   component: Readme,
  //   header: {
  //     title: 'README.txt - Notepad',
  //     icon: notepad,
  //     invisible: false,
  //   },
  //   defaultSize: {
  //     width: 700,
  //     height: 500,
  //   },
  //   defaultOffset: {
  //     x: 300,
  //     y: 30,
  //   },
  //   resizable: true,
  //   minimized: false,
  //   maximized: window.innerWidth < 800,
  //   id: genId(),
  //   zIndex: genIndex(),
  // },
  // {
  //   component: MyComputer,
  //   header: {
  //     title: 'My Computer',
  //     icon: computer,
  //   },
  //   defaultSize: {
  //     width: 660,
  //     height: 500,
  //   },
  //   defaultOffset: {
  //     x: 250,
  //     y: 40,
  //   },
  //   resizable: true,
  //   minimized: false,
  //   maximized: window.innerWidth < 800,
  //   id: genId(),
  //   zIndex: genIndex(),
  // },
];

export const defaultIconState = [
  {
    id: 0,
    icon: winamp,
    title: 'Winamp',
    component: Winamp,
    isFocus: false,
  },
  {
    id: 1,
    icon: notepadLarge,
    title: 'README.txt',
    component: Readme,
    isFocus: false,
  },
  {
    id: 2,
    icon: computerLarge,
    title: 'My Computer',
    component: MyComputer,
    isFocus: false,
  },
  {
    id: 3,
    icon: mine,
    title: 'Minesweeper',
    component: Minesweeper,
    isFocus: false,
  },
  {
    id: 4,
    icon: ie,
    title: 'Internet Explorer',
    component: InternetExplorer,
    isFocus: false,
  },
  {
    id: 5,
    icon: recycle,
    title: 'Recycle Bin',
    component: Recycle,
    isFocus: false,
  },
  {
    id: 6,
    icon: paintLarge,
    title: 'Paint',
    component: Paint,
    isFocus: false,
  },
  {
    id: 7,
    icon: notepadLarge,
    title: 'Notepad',
    component: Notepad,
    isFocus: false,
  },
  {
    id: 8,
    icon: pdf,
    title: '오디오 가이드 안내문',
    component: Instruction,
    isFocus: false,
  },
];

export const appSettings = {
  'Internet Explorer': {
    header: {
      icon: iePaper,
      title: 'InternetExplorer',
    },
    component: InternetExplorer,
    defaultSize: {
      width: 900,
      height: 600,
    },
    defaultOffset: {
      x: 140,
      y: 30,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  Minesweeper: {
    header: {
      icon: mine,
      title: 'Minesweeper',
    },
    component: Minesweeper,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 190,
      y: 180,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  Error: {
    header: {
      icon: error,
      title: 'Warning',
      buttons: ['close'],
      noFooterWindow: true,
    },
    component: ErrorBox,
    defaultSize: {
      width: 380,
      height: 0,
    },
    defaultOffset: {
      x: window.innerWidth / 2 - 190,
      y: window.innerHeight / 2 - 60,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  Notification: {
    header: {
      icon: error,
      title: 'Warning',
      buttons: ['close'],
      noFooterWindow: true,
    },
    component: Noti,
    defaultSize: {
      width: 380,
      height: 0,
    },
    defaultOffset: {
      x: window.innerWidth / 2 - 190,
      y: window.innerHeight / 2 - 60,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  Instruction: {
    header: {
      icon: pdf,
      title: '오디오 가이드 메뉴얼',
      buttons: ['close'],
      noFooterWindow: true,
    },
    component: Instruction,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 400,
      y: 10,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  'My Computer': {
    header: {
      icon: computer,
      title: 'My Computer',
    },
    component: MyComputer,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 260,
      y: 50,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: false,
  },
  Notepad: {
    header: {
      icon: notepad,
      title: 'Untitled - Notepad',
    },
    component: Notepad,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 270,
      y: 60,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  Readme: {
    header: {
      icon: notepad,
      title: 'README.txt - Notepad',
    },
    component: Readme,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 280,
      y: 70,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  Winamp: {
    header: {
      icon: winamp,
      title: 'Winamp',
      invisible: true,
    },
    component: Winamp,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 0,
      y: 0,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
  Paint: {
    header: {
      icon: paint,
      title: 'Untitled - Paint',
    },
    component: Paint,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 280,
      y: 70,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  'Recycle Bin': {
    header: {
      icon: recycle,
      title: 'Recycle Bin',
    },
    component: Recycle,
    defaultSize: {
      width: 900,
      height: 600,
    },
    defaultOffset: {
      x: 260,
      y: 50,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: false,
  },
};

export {
  InternetExplorer,
  Minesweeper,
  ErrorBox,
  MyComputer,
  Notepad,
  Readme,
  Recycle,
  Winamp,
  Post,
  Noti,
  Instruction,
};
