import {StyleSheet} from 'react-native';
import {mainColor, backgroundColor, textColor2} from '../Utils/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor,
  },
  noneLiveContainer: {
    backgroundColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    margin: 5,
  },
  navigationText: {fontSize: 16, marginLeft: 10, color: '#fff'},
  videoTitle: {fontSize: 15, fontWeight: 'bold', color: textColor2},
  videoDesc: {fontSize: 15, color: textColor2},
  dateTitleText: {
    fontSize: 12,
    color: textColor2,
  },
});

export default styles;
