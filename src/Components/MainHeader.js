import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LogoWithoutText from './icons/logos/LogoWithoutText';

const styles = StyleSheet.create({
  View: {
    paddingTop: 16,
    justifyContent: 'center',
    flexDirection: 'row',
    height: 65,
    borderBottomWidth: 1.5,
    borderBottomColor: '#888787',
  },
});
const MainHeader = () => {
  return (
    <View style={styles.View}>
      <LogoWithoutText size={60} />
      <Text
        style={{
          color: '#EA3318',
          marginLeft: 20,
          marginRight: 30,
          fontSize: 25,
          paddingTop: 2,
        }}>
        Tawat Connect
      </Text>
    </View>
  );
};

export default MainHeader;
