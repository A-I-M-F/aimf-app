import {StyleSheet} from 'react-native';
import {backgroundColor, mainColor} from '../Utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  myAccountText: {
    textAlign: 'center',
    fontSize: 22,
    color: '#595959',
    marginBottom: 20,
  },
  updateIcon: {
    color: '#595959',
    fontSize: 20,
    marginLeft: 2,
  },
  fullnameText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#595959',
    marginBottom: 20,
  },
  accountValidationText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#cb8347',
    marginBottom: 20,
  },

  logoutButton: {
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#cb8347',
  },
  activateAccContainer: {
    padding: 10,
  },
  activateAccBtnContainer: {
    paddingVertical: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activateAccBtn: {
    backgroundColor: mainColor,
    padding: 10,
    borderRadius: 5,
    margin: 2,
  },
  activateAccLabelBtn: {
    color: '#fff',
  },
});

export default styles;
