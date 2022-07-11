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
  const [menuPoints, setMenuPoints] = useState<{ id: string; posY: number }[]>([
    { id: '_', posY: 0 },
  ]);
  const [width, height] = useWindowSize();
  const [scrollY, setScrollY] = useState<number>(0);

  const scrollFps = 30;
  useEffect(() => {
    const scrollEventHandler = () => {
      if (!(window as any).___scrollTimeoutId) {
        (window as any).___scrollTimeoutId = setTimeout(() => {
          setScrollY(window.scrollY);
          (window as any).___scrollTimeoutId = null;
          const selectedMenuId = getMenuId(window.scrollY, menuPoints);
          if (selectedMenuId && selectedMenuId != '_') {
            history.replaceState(
              undefined,
              undefined as any as string,
              `#${selectedMenuId}`,
            );
          } else if (selectedMenuId == '_') {
            history.pushState(
              '',
              document.title,
              window.location.pathname + window.location.search,
            );
          }
        }, 1000 / scrollFps);
      }
    };
    window.addEventListener('scroll', scrollEventHandler);
    setScrollY(window.scrollY);
    return () => {
      window.removeEventListener('scroll', scrollEventHandler);
    };
  }, [menuPoints]);

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
