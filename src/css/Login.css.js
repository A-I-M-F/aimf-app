import {StyleSheet} from 'react-native';
import {mainColorButton} from '../Utils/colors';

const styles = StyleSheet.create({
  bodyWrapper: {
    backgroundColor: '#fff',
    height: 550,
    paddingTop: 100,
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 70,
  },
  forgotPasswd: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  createAccount: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
  },
  inputItem: {
    marginBottom: 15,
    marginLeft: 35,
    marginRight: 35,
    paddingHorizontal: 10,
    paddingLeft: 5,
    height: 45,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  input: {
    fontSize: 15,
  },
  loginButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    height: 50,
    width: 150,
    borderRadius: 10,
    backgroundColor: mainColorButton,
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default styles;
