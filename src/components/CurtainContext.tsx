"use client";

import React, { createContext, useContext } from "react";

interface CurtainContextType {
  isOpen: boolean;
  openCurtain: () => void;
  closeCurtain: () => void;
}

const CurtainContext = createContext<CurtainContextType>({
  isOpen: false,
  openCurtain: () => {},
  closeCurtain: () => {},
});

export const useCurtain = () => useContext(CurtainContext);

export default CurtainContext;
