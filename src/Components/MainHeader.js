import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LogoWithoutText from './icons/logos/LogoWithoutText';
import {textColor1} from "../Utils/colors";

const styles = StyleSheet.create({
  View: {
    paddingTop: 13,
    justifyContent: 'center',
    flexDirection: 'row',
    height: 65,
    borderBottomWidth: 2,
    borderBottomColor: textColor1,
  },
});
const MainHeader = () => {
  return (
    <View style={styles.View}>
      <LogoWithoutText size={60} />
      <Text
        style={{
          color: '#EA3318',
          marginLeft: 12,
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
