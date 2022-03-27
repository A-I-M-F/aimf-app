import {View} from 'react-native';
import {Button, Icon} from 'native-base';
import React from 'react';
import * as PropTypes from 'prop-types';

const BackButton = ({navigation, alternativeRoute}) => {
  return (
    <View style={{width: 100, height: 100}}>
      <Button
        transparent
        onPress={() =>
          alternativeRoute
            ? navigation.navigate(alternativeRoute)
            : navigation.goBack()
        }
        style={{borderRadius: 30, width: 50}}>
        <Icon style={{color: '#000'}} name="md-arrow-back" type="Ionicons" />
      </Button>
    </View>
  );
};

BackButton.propTypes = {
  navigation: PropTypes.object,
  alternativeRoute: PropTypes.string,
};

export default BackButton;
