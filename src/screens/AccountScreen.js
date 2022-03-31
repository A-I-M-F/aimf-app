import React, {Component} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Button, Icon} from 'native-base';
import ShowAccount from './AccountScreen/ShowAccount';
import AccountForm from '../Components/AccountForm';
import {getFullName, getIsoDate} from '../Utils/Functions';
import {
  ACCOUNT_STR,
  SHOW_ACCOUNT_ACTION,
  UPDATE_ACCOUNT_ACTION,
} from '../Utils/Constants';
import ErrorModal from '../Components/ErrorModal';
import {logout} from '../store/reducers/authenticationRedux';
import {dispatchErrorMessage} from '../store/reducers/errorMessageRedux';
import checkFormValues from '../Components/AccountForm/Validate';
import {
  deleteUserAccount,
  updateAction,
  updateCurrentUser,
  activateAccount,
} from '../store/reducers/accountRedux';
import Loader from '../Components/Loader';
import styles from '../css/AccountScreen.css.js';
import InformationModal from '../Components/InformationModal';

class AccountScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      gender: null,
      maritalStatus: null,
      email: '',
      oldPassword: '',
      password: '',
      confirmPassword: '',
      lastName: '',
      fatherName: '',
      middleName: '',
      firstName: '',
      birthday: new Date(),
      zipCode: '',
      phoneNumber: '',
      childrenNumber: 0,
      functionName: '',
      children: [],
      showInformationModal: false,
    };
  }

  componentDidMount() {
    const {user} = this.props.account;
    if (user) {
      const {state} = this;
      user.functionName = user.function;
      user.childrenNumber = (user.children && `${user.children.length}`) || '0';
      this.setState({...state, ...user, initData: user});
    }
  }

  componentDidUpdate() {
    if (!this.props.account.user) {
      this.props.navigation.navigate('LoginScreen');
    }
  }

  getDataFromState = () => {
    const {
      gender,
      maritalStatus,
      email,
      oldPassword,
      password,
      confirmPassword,
      lastName,
      fatherName,
      middleName,
      firstName,
      birthday,
      zipCode,
      phoneNumber,
      childrenNumber,
      functionName,
      children,
      showInformationModal,
    } = this.state;
    children.slice(0, childrenNumber);
    return {
      gender,
      maritalStatus,
      lastName,
      fatherName,
      middleName,
      firstName,
      birthday,
      zipCode,
      phoneNumber,
      childrenNumber,
      email,
      oldPassword,
      password,
      confirmPassword,
      functionName,
      children,
      showInformationModal,
    };
  };

  onSubmit = () => {
    const data = {
      ...this.getDataFromState(true),
      action: UPDATE_ACCOUNT_ACTION,
    };
    const error = checkFormValues(data);
    if (error) {
      this.props.dispatchErrorMessage(error);
      return;
    }

    const {
      gender,
      maritalStatus,
      lastName,
      fatherName,
      middleName,
      firstName,
      birthday,
      zipCode,
      phoneNumber,
      functionName,
      children,
      oldPassword,
      password,
      confirmPassword,
    } = data;

    this.props.updateCurrentUser(this.props.account.user.id, {
      gender,
      maritalStatus,
      lastName,
      fatherName,
      middleName,
      firstName,
      birthday: getIsoDate(birthday),
      zipCode,
      phoneNumber,
      function: functionName,
      children,
      oldPassword,
      newPassword: password,
      passwordConfirmation: confirmPassword,
    });
  };

  renderActivateAccountBtn() {
    return (
      <View style={styles.activateAccContainer}>
        <Text>
          <Icon
            type="FontAwesome5"
            name="exclamation"
            style={{fontSize: 17, color: '#000'}}
          />
          {` ${ACCOUNT_STR.your_account_is_not_activated_yet}`}
        </Text>
        <View style={styles.activateAccBtnContainer}>
          <Button
            style={styles.activateAccBtn}
            onPress={() => {
              this.props.activateAccount();
              this.setState({
                showInformationModal: true,
              });
            }}>
            <Text style={styles.activateAccLabelBtn}>
              {ACCOUNT_STR.receive_account_activation_email}
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  render() {
    const data = this.getDataFromState();
    if (this.state.email) {
      return (
        <>
          {this.props.action === SHOW_ACCOUNT_ACTION ? (
            <ShowAccount
              scrollViewOpacity={
                this.props.logoutLoading ||
                this.props.updateLoading ||
                this.props.errorMessage
                  ? 0.6
                  : 1
              }
              user={this.props.account ? this.props.account.user : null}
              gender={this.state.gender}
              fullName={getFullName(this.state)}
              updateAction={(value) => this.props.updateAction(value)}
              logout={() => this.props.logout()}
              deleteCurrentUserAccount={async () => {
                await this.props.deleteUserAccount(this.props.account.user.id);
              }}
              errorMessage={this.props.errorMessage}
            />
          ) : (
            <AccountForm
              scrollViewOpacity={
                this.props.logoutLoading ||
                this.props.updateLoading ||
                this.props.errorMessage
                  ? 0.6
                  : 1
              }
              action={UPDATE_ACCOUNT_ACTION}
              data={data}
              initData={this.state.initData}
              navigation={this.props.navigation}
              updateAction={(value) => this.props.updateAction(value)}
              updateState={(state) => this.setState(state)}
              onSubmit={() => this.onSubmit()}
            />
          )}
          {!this.props.account?.user?.hasVerifiedEmail &&
            !this.props.accountActivationSentMailActivation &&
            this.renderActivateAccountBtn()}
          {
            <InformationModal
              visible={
                this.state.showInformationModal &&
                this.props.accountActivationMessage != null
              }
              onHide={() =>
                this.setState({
                  showInformationModal: false,
                })
              }
              title="Activation du compte">
              <Text style={{color: '#3E3E3E', marginLeft: 5, marginBottom: 50}}>
                {' '}
                {this.props.accountActivationMessage}
              </Text>
            </InformationModal>
          }
          {this.props.errorMessage && (
            <ErrorModal visible message={this.props.errorMessage} />
          )}
          <Loader
            visible={!!this.props.logoutLoading || !!this.props.updateLoading}
          />
        </>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Chargement</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {errorMessage} = state.errorMessageStore;
  const {
    action,
    loading: updateLoading,
    accountActivationSentMailActivation,
    accountActivationMessage,
  } = state.accountStore;
  const {loading: logoutLoading} = state.authenticationStore;
  return {
    errorMessage,
    action,
    account: state.accountStore,
    logoutLoading,
    updateLoading,
    accountActivationSentMailActivation,
    accountActivationMessage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    updateCurrentUser: (id, data) => dispatch(updateCurrentUser(id, data)),
    updateAction: (action) => dispatch(updateAction(action)),
    activateAccount: () => dispatch(activateAccount()),
    dispatchErrorMessage: (errorMessage) =>
      dispatch(dispatchErrorMessage(errorMessage)),
    deleteUserAccount: (id) => dispatch(deleteUserAccount(id)),
  };
};

AccountScreen.propTypes = {
  account: PropTypes.object,
  navigation: PropTypes.object,
  logout: PropTypes.func,
  errorMessage: PropTypes.string,
  dispatchErrorMessage: PropTypes.func,
  updateCurrentUser: PropTypes.func,
  updateAction: PropTypes.func,
  deleteUserAccount: PropTypes.func,
  activateAccount: PropTypes.func,
  accountActivationSentMailActivation: PropTypes.bool,
  accountActivationMessage: PropTypes.string,
  logoutLoading: PropTypes.bool,
  updateLoading: PropTypes.bool,
  action: PropTypes.string,
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
