import React, { useEffect, useState } from 'react';

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
    if (menuPoint.posY <= posY) {
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
  const [scrollY, setScrollY] = useState<number>(0);

  const scrollFps = 30;
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (!(window as any).___scrollTimeoutId) {
        (window as any).___scrollTimeoutId = setTimeout(() => {
          setScrollY(window.scrollY);
          (window as any).___scrollTimeoutId = null;
        }, 1000 / scrollFps);
      }
    });
    setScrollY(window.scrollY);
  }, []);

  return (
    <AppContext.Provider
      value={{
        windowHeight: height,
        windowWidth: width,
        scrollY: scrollY,
        selectedMenuId: getMenuId(scrollY, menuPoints),
        addMenuPoints: (menuId: string, posY: number) => {
          setMenuPoints((prev) => {
            const newMenuPoints = [...prev, { id: menuId, posY: posY }];
            return newMenuPoints.sort((k, l) => l.posY - k.posY);
          });
        },
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
