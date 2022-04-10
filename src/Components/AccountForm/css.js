import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
  },
  registerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 150,
    borderRadius: 10,
    backgroundColor: '#cb8347',
    marginTop: 35,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  refreshButton: {
    height: 20,
    width: 20,
    backgroundColor: '#FFF',
    borderRadius: 80,
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff',
  },

  loginLink: {
    marginTop: 30,
    marginBottom: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  green: {
    color: 'green',
  },
  red: {
    color: 'red',
  },
});

export default styles;
