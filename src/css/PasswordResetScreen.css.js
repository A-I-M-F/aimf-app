import {StyleSheet} from 'react-native';
import {mainColorButton} from '../Utils/colors';

const styles = StyleSheet.create({
  mainContainer: {},
  subContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  inputItem: {
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {},
  submitButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  submitButton: {
    height: 50,
    width: 300,
    borderRadius: 10,
    backgroundColor: mainColorButton,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputItemLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 10,
    width: 300,
  },
});

export default styles;
