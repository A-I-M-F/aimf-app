import React, {Component} from 'react';
import {Container, Input, Item, Label} from 'native-base';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import SpinnerButton from 'react-native-spinner-button';
import {dispatchErrorMessage} from '../store/reducers/errorMessageRedux';
import {forgotPasswordReset} from '../store/reducers/authenticationRedux';
import styles from './PasswordResetScreen/css';
import checkFormValues from './PasswordResetScreen/Validate';
import BackButton from '../Components/BackButton';
import ErrorModal from '../Components/ErrorModal';

class PasswordResetScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  onSubmit = () => {
    const {email} = this.state;
    const error = checkFormValues({email});
    if (error) {
      this.props.dispatchErrorMessage(error);
      return;
    }
    this.props.forgotPasswordReset(email);
    if (this.props.successResetPassword) {
      this.props.navigation.navigate('LoginScreen');
    } else {
      this.props.dispatchErrorMessage(this.props.errorResetPasswordMsg);
    }
  };

  render() {
    return (
      <Container style={styles.mainContainer}>
        <BackButton
          navigation={this.props.navigation}
          alternativeRoute="LoginScreen"
        />
        <View style={styles.subContainer}>
          <Label style={styles.inputItemLabel}>
            Veuillez saisir votre mail d'authenitication
          </Label>
          <Item rounded style={styles.inputItem}>
            <Input
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email}
            />
          </Item>
          <View style={styles.submitButtonContainer}>
            <SpinnerButton
              buttonStyle={styles.submitButton}
              onPress={() => this.onSubmit()}
              isLoading={this.props.loading}
              indicatorCount={10}
              spinnerType="SkypeIndicator">
              <Text style={styles.submitButtonText}>Valider</Text>
            </SpinnerButton>
          </View>
        </View>
        {this.props.errorMessage && (
          <ErrorModal visible message={this.props.errorMessage} />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    loading,
    successResetPassword,
    errorResetPasswordMsg,
  } = state.authenticationStore;
  const {errorMessage} = state.errorMessageStore;
  return {
    loading,
    successResetPassword,
    errorResetPasswordMsg,
    errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPasswordReset: (email) => dispatch(forgotPasswordReset(email)),
    dispatchErrorMessage: (errorMessage) =>
      dispatch(dispatchErrorMessage(errorMessage)),
  };
};

PasswordResetScreen.propTypes = {
  forgotPasswordReset: PropTypes.func,
  loading: PropTypes.bool,
  successResetPassword: PropTypes.bool,
  errorResetPasswordMsg: PropTypes.string,
  dispatchErrorMessage: PropTypes.func,
  errorMessage: PropTypes.string,
  navigation: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordResetScreen);
