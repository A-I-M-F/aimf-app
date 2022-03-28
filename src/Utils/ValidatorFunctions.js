export const isCorrectName = (name) => {
  return !!(
    !name ||
    !name.trim() ||
    name
      .trim()
      .match(/^[a-zA-Z\u00C0-\u017F]+(\s{0,1}[a-zA-Z- \u00C0-\u017F])*$/)
  );
};

export const isCorrectEmailAddress = (email) => {
  // eslint-disable-next-line no-useless-escape
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(email.trim()).toLowerCase());
};

export const isCorrectPassword = (password) => {
  return (
    password.length > 7 &&
    password.match(/[a-z]/) &&
    password.match(/[A-Z]/) &&
    password.match(/\W/)
  );
};

export const isCorrectZipCode = (zipCode) => {
  return zipCode === '' || !!zipCode.match(/^[0-9]{5}$/);
};

export const isCorrectNumberCopie = (nbCopie) => {
  return !!nbCopie.match(/^\d+$/);
};

export const isCorrectPhoneNumber = (phone) => {
  return !!phone.match(/^0[1-9][0-9]{8}$/);
};
