import React, { useState } from 'react';

import useScrollPosition from '@react-hook/window-scroll';
import { useWindowSize } from '@react-hook/window-size';

export interface AppContextProps {
  scrollY: number;
  windowWidth: number;
  windowHeight: number;
  selectedMenuId: string;
  addMenuPoints: (menuId: string, position: number) => void;
}
export const AppContext = React.createContext({} as AppContextProps);

const getMenuId = (
  posY: number,
  menuPoints: { id: string; posY: number }[],
) => {
  if (menuPoints.length == 0) {
    return '';
  }
  for (const menuPoint of menuPoints) {
    if (menuPoint.posY < posY) {
      return menuPoint.id;
    }
  }
  return menuPoints[menuPoints.length - 1].id;
};

export const AppContextProvider = (props: any) => {
  const [menuPoints, setMenuPoints] = useState<{ id: string; posY: number }[]>(
    [],
  );
  const [width, height] = useWindowSize();
  const scrollY = useScrollPosition();

  return (
    <AppContext.Provider
      value={{
        windowHeight: height,
        windowWidth: width,
        scrollY: scrollY,
        selectedMenuId: getMenuId(scrollY, menuPoints),
        addMenuPoints: (menuId: string, posY: number) => {
          const newMenuPoints = [...menuPoints, { id: menuId, posY: posY }];
          setMenuPoints(newMenuPoints.sort((k, l) => l.posY - k.posY));
        },
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
