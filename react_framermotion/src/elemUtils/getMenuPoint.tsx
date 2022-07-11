import { getOffsetTop } from './getOffsetTop';

export const getMenuPoint = (element: any) => {
  return getOffsetTop(element) - element.offsetHeight;
};
