import React, { useEffect, useState } from 'react';

import { useWindowSize } from '@react-hook/window-size';

import { ROLE_SECTION_ANCHOR } from '../../constants/roles';
import { getMenuPoint } from '../../elemUtils/getMenuPoint';

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
  if (menuPoints.length == 1) {
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

  const scrollFps = 12;
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

    const resizeObserver = new ResizeObserver((entries) => {
      if (!(window as any).___resizeObserverId) {
        (window as any).___resizeObserverId = setTimeout(() => {
          const sectionAnchors = document.querySelectorAll(
            `[data-role="${ROLE_SECTION_ANCHOR}"]`,
          );
          let newMenuPoints = [{ id: '_', posY: 0 }];
          sectionAnchors.forEach((a) => {
            newMenuPoints.push({
              id: a.id,
              posY: getMenuPoint(a),
            });
          }),
            (newMenuPoints = newMenuPoints.sort((k, l) => l.posY - k.posY));
          setMenuPoints(newMenuPoints);
          (window as any).___resizeObserverId = null;
        }, 1000 / scrollFps);
      }
    });
    // start observing a DOM node
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('scroll', scrollEventHandler);
      resizeObserver.disconnect();
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
