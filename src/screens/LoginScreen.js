import React from 'react';
import {Text, TouchableOpacity, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import SpinnerButton from 'react-native-spinner-button';
import ErrorModal from '../Components/ErrorModal';
import {CREDENTIALS_EMPTY_ERROR, LOGIN_STR} from '../Utils/Constants';
import {dispatchErrorMessage} from '../store/reducers/errorMessageRedux';
import {login} from '../store/reducers/authenticationRedux';
import RenderInput from '../Components/RenderInput';
import RenderPassword from '../Components/RenderPassoword';
import styles from '../css/Login.css.js';
import {navigate} from '../Utils/Account';
import LogoColorWriting from '../Components/icons/logos/LogoColorWriting';
import FormStyles from '../css/Form.css';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidUpdate() {
    // console.log('[Login] componentDidUpdate : ', this.props.account);
    navigate(this.props.account, this.props.navigation, 'LoginScreen');
  }

  handleLogin = () => {
    const {email, password} = this.state;
    if (!email || !password) {
      this.props.dispatchErrorMessage(CREDENTIALS_EMPTY_ERROR);
      return;
    }
    this.props.login(email, password, this.props.fcmToken);
  };

  render() {
    const {email, password} = this.state;
    return (
      <>
        <ScrollView style={styles.bodyWrapper}>
          <View style={styles.logoWrapper}>
            <LogoColorWriting />
          </View>
          <RenderInput
            keyboardType="email-address"
            onChange={(value) => this.setState({email: value})}
            value={email}
            placeholder="Adresse email"
            autoCapitalize="none"
          />
          <RenderPassword
            onChange={(value) => this.setState({password: value})}
            value={password}
            placeholder="Mot de passe"
            itemStyle={styles.inputItem}
            checkPassword={false}
          />
          <View style={styles.loginButtonContainer}>
            <SpinnerButton
              buttonStyle={FormStyles.spinnerButton}
              isLoading={this.props.loading}
              onPress={this.handleLogin}
              spinnerType="SkypeIndicator">
              <Text style={styles.nextButtonText}>Connexion</Text>
            </SpinnerButton>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUp')}
            activeOpacity={0.6}>
            <Text style={{...FormStyles.linkedBtn, ...styles.createAccount}}>
              {LOGIN_STR.you_dont_have_account_account}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PasswordResetScreen')
            }
            activeOpacity={0.6}>
            <Text style={{...FormStyles.linkedBtn, ...styles.forgotPasswd}}>
              {LOGIN_STR.you_forgot_your_password}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        {this.props.errorMessage && (
          <ErrorModal visible message={this.props.errorMessage} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {errorMessage} = state.errorMessageStore;
  const {loading} = state.authenticationStore;
  const {fcmToken} = state.accountStore;
  return {
    errorMessage,
    loading,
    account: state.accountStore,
    fcmToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password, fcmToken) => {
      dispatch(login(email, password, fcmToken));
    },
    dispatchErrorMessage: (errorMessage) => {
      dispatch(dispatchErrorMessage(errorMessage));
    },
  };
};

LoginScreen.propTypes = {
  errorMessage: PropTypes.string,
  dispatchErrorMessage: PropTypes.func,
  login: PropTypes.func,
  navigation: PropTypes.object,
  loading: PropTypes.bool,
  account: PropTypes.object,
  fcmToken: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
