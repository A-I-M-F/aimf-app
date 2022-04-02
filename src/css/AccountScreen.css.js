import {StyleSheet} from 'react-native';
import {
  backgroundColor,
  mainColor,
  textColor1,
} from '../Utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: textColor1,
    fontSize: 20,
    marginLeft: 2,
  },
  fullnameText: {
    textAlign: 'center',
    fontSize: 22,
    marginRight: 7,
    color: textColor1,
    marginBottom: 27,
    fontWeight: 'bold',
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
    borderTopColor: textColor1,
    borderTopWidth: 1,
    padding: 10,
    paddingTop: 25,
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
