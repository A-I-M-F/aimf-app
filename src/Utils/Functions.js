import {DAYS, MONTHS, THAKHAROUBTS} from './Constants';

export const getFrDate = (date, time = false) => {
  if (date instanceof Date) {
    return `${date.getDate().toString().padStart(2, '0')}/${`${
      parseInt(date.getMonth().toString(), 10) + 1
    }`.padStart(2, '0')}/${date.getFullYear()}${
      time ? date.toLocaleTimeString('fr') : ''
    }`;
  }
  return date;
};

export const isoDateToFr = (isoDate: string, withTime = true) => {
  const fullDate = isoDate.split(' ');
  const date = fullDate[0].split('-');
  let time = '';
  if (withTime) {
    time = fullDate.length === 2 ? fullDate[1] : '';
  }
  return `${date[2]}/${date[1]}/${date[0]} ${time}`;
};

export const getIsoDate = (date) => {
  if (date instanceof Date) {
    return `${date.getFullYear()}-${`${
      parseInt(date.getMonth().toString(), 10) + 1
    }`.padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
  return date;
};

export const formatDateAsApiDate = (dateMillseconde) => {
  const d = new Date(dateMillseconde);
  const year = d.getFullYear(); // 2019
  const month = `${parseInt(d.getMonth().toString(), 10) + 1}`.padStart(2, '0'); // 12
  const day = d.getDate().toString().padStart(2, '0'); // 01
  const hours = d.getHours(); // 18
  const minutes = d.getMinutes(); // 00

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const formatDateWithDayAndMonthName = (apiDate) => {
  let date = null;
  if (typeof apiDate === 'number' || typeof apiDate === 'object') {
    date = new Date(apiDate);
  } else {
    date = new Date(`${apiDate.substring(0, 10)}T${apiDate.substring(11, 19)}`);
  }

  return `${DAYS[date.getDay()]} ${date.getDate()} ${
    MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;
};

export const getFullName = ({lastName, firstName}) => {
  return lastName && firstName
    ? `${lastName.toUpperCase()} ${firstName
        .charAt(0)
        .toUpperCase()}${firstName.slice(1).toLowerCase()}`
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
