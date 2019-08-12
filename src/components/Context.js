import React, { createContext, useState} from 'react';

export const AppContext = createContext();

const AppProvider = ({children}) => {
  const [clickWarning, setClickWarning] = useState(false);
  const [clickDown, setClickDown] = useState(false);
  
  return (
    <AppContext.Provider value={{clickWarning: [clickWarning, setClickWarning], clickDown: [clickDown, setClickDown]}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
