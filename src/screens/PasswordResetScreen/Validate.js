import {isCorrectEmailAddress} from '../../Utils/ValidatorFunctions';

const checkFormValues = (values) => {
  if (!values.email) {
    return 'Veuillez renseigner votre email';
  }
  if (!isCorrectEmailAddress(values.email)) {
    return 'Veuillez etrer une adresse mail valide';
  }

  return null;
};

export default checkFormValues;
