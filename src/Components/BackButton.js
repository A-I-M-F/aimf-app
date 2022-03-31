import {View} from 'react-native';
import {Button} from 'native-base';
import React from 'react';
import * as PropTypes from 'prop-types';
import BackArrowIcon from './icons/BackArrowIcon';

const BackButton = ({navigation, alternativeRoute}) => {
  return (
    <View style={{marginLeft: 20, marginTop: 10, width: 100, height: 100}}>
      <Button
        transparent
        onPress={() =>
          alternativeRoute
            ? navigation.navigate(alternativeRoute)
            : navigation.goBack()
        }>
        <BackArrowIcon />
      </Button>
    </View>
  );
};

BackButton.propTypes = {
  navigation: PropTypes.object,
  alternativeRoute: PropTypes.string,
};

export default BackButton;
