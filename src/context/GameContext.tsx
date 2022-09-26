import axios from "axios";
import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";
import { Games } from "../pages/Home";

interface GamesProps {}

export const GameContext = createContext({} as GamesProps);

export const GameProvider = (props: { children: ReactNode }) => {
  return (
    <GameContext.Provider value={{}}>{props.children}</GameContext.Provider>
  );
};
