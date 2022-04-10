import {THAKHAROUBTS} from './Constants';

export const getFullName = ({lastName, firstName}) => {
  return lastName || firstName
    ? `${lastName?.toUpperCase()} ${firstName
        .charAt(0)
        .toUpperCase()}${firstName?.slice(1).toLowerCase()}`
    : '';
};

export const formatKhatma = (id, beginAt, isOpen, association) => {
  return {
    id,
    beginAt,
    isOpen,
    takharoubts: THAKHAROUBTS,
    association,
  };
};

export const replaceElement = (arr, newElement) => {
  const newArr = Object.values(arr).filter((element) => {
    return element.id !== newElement.id;
  });
  return newArr.concat(newElement);
};
