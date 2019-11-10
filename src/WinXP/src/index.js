import React from "react";

import WinXP from "./WinXP";
import { useGA } from "./hooks";

const WinXPComponent = () => {
  useGA("UA-145369997-2", "winXP");
  return <WinXP />;
};

export default WinXPComponent;
