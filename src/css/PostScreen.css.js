import {StyleSheet} from 'react-native';
import {backgroundColor, mainColorButton} from '../Utils/colors';

const styles = StyleSheet.create({
  view: {
    paddingTop: 60,
    textAlign: 'center',
    backgroundColor,
  },
  inputItem: {
    marginBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    paddingHorizontal: 10,
    paddingLeft: 5,
    borderRadius: 10,
    height: 45,
    backgroundColor: '#FFF',
  },
  textInput: {
    width: '100%',
    height: 180,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: mainColorButton,
  },
  textItem: {
    marginBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 0,
    paddingLeft: 0,
    height: 180,
    borderColor: 'transparent',
    backgroundColor: '#FFF',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 30,
    width: 300,
  },
  input: {
    fontSize: 15,
    paddingLeft: 10,
  },
  spinnerButton: {
    height: 50,
    width: 140,
    borderRadius: 10,
    marginTop: 25,
  },

  buttonText: {
    fontSize: 17,
    color: '#FFF',
  },
  buttonIcon: {
    fontSize: 16,
    color: '#FFF',
  },
  green: {
    color: 'green',
  },
  red: {
    color: 'red',
  },
});

export default styles;
