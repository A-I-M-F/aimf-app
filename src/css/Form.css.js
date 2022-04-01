import {StyleSheet} from 'react-native';
import {mainColorButton, textColor1} from '../Utils/colors';

const FormStyles = StyleSheet.create({
  inputItem: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
    paddingLeft: 5,
    height: 45,
    backgroundColor: '#FFF',
    borderColor: 'transparent',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    color: textColor1,
  },
  input: {
    fontSize: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: mainColorButton,
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 55,
  },
  linkedBtn: {
    color: textColor1,
    fontFamily: 'Helvetica Neue',
    backgroundColor: 'transparent',
    marginBottom: 5,
    marginTop: 5,
  },
  spinnerButton: {
    width: 256,
    height: 58,
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: mainColorButton,
  },
  datePicker: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default FormStyles;
