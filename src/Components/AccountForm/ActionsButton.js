import React, {Component} from 'react';
import SpinnerButton from 'react-native-spinner-button';
import {Text, TouchableOpacity} from 'react-native';
import * as PropTypes from 'prop-types';
import styles from './css';
import {UPDATE_ACCOUNT_ACTION, CREATE_ACCOUNT_ACTION} from '../../Utils/Constants';

export default class ActionsButton extends Component {
  render() {
    const spinnerButtonStyle = {
      ...styles.registerButton,
      marginBottom: this.props.action === UPDATE_ACCOUNT_ACTION ? 100 : 0,
    };
    return (
      <>
        <SpinnerButton
          buttonStyle={spinnerButtonStyle}
          onPress={() => this.props.onValidate()}
          indicatorCount={10}
          spinnerType="SkypeIndicator">
          <Text style={styles.nextButtonText}>
            {this.props.action === CREATE_ACCOUNT_ACTION ? 'Continuer' : 'Valider'}
          </Text>
        </SpinnerButton>

        {this.props.action === CREATE_ACCOUNT_ACTION ? (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
            activeOpacity={0.6}
            style={styles.loginLink}>
            <Text>Vous êtes déjà inscrit? Cliquez ici</Text>
          </TouchableOpacity>
        ) : null}
      </>
    );
  }
}

ActionsButton.propTypes = {
  navigation: PropTypes.object,
  action: PropTypes.string,
  onValidate: PropTypes.func,
};
