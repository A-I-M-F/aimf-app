import {StyleSheet} from 'react-native';
import {mainColor} from '../Utils/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fce3ba',
  },
  noneLiveContainer: {
    backgroundColor: '#fce3ba',
    flex: 1,
    justifyContent: 'center',
  },
  noneLiveText: {
    textAlign: 'center',
    fontSize: 22,
    color: '#595959',
    marginBottom: 20,
  },
  noneLiveLogo: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  noneLiveLogoText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  player: {
    alignSelf: 'stretch',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 50,
    backgroundColor: '#fff',
  },
  topHeaderBtn: {
    backgroundColor: mainColor,
    padding: 10,
    borderRadius: 5,
    margin: 2,
  },
  navigationText: {fontSize: 16, marginLeft: 10, color: '#fff'},
});

export default styles;
