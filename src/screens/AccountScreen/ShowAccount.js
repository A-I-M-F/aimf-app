import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Button, Icon, Text} from 'native-base';
import * as PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import styles from '../../css/AccountScreen.css';
import {
  ACCOUNT_NOT_VALIDATED_YET_MESSAGE,
  DELETE_USER_ACCOUNT_CONFIRM_MESSAGE_BODY,
  DELETE_USER_ACCOUNT_CONFIRM_MESSAGE_TITLE,
  FEMALE_GENDER,
  MALE_GENDER,
  UPDATE_ACCOUNT_ACTION,
} from '../../Utils/Constants';
import {isAuthorized} from '../../Utils/Account';
import InformationModal from '../../Components/InformationModal';
import FormStyles from '../../css/Form.css';
import {mainColor} from '../../Utils/colors';
import UserAvatarIcon from '../../Components/icons/placeholders/UserAvatarIcon';

class ShowAccount extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      deleteAccModalVisible: false,
    };
  }

  showDeleteConfirmation = (show: boolean) => {
    this.setState({
      deleteAccModalVisible: show,
    });
  };

  onConfirmDeleteAccount = async () => {
    await this.props.deleteCurrentUserAccount();
    if (!this.props.errorMessage) {
      Toast.show('Votre compte a été supprimé avec succès');
    }
  };

  render() {
    let icon = null;
    if (this.props.gender === MALE_GENDER) {
      icon = require('../../../assets/images/male_unselected.png');
    } else if (this.props.gender === FEMALE_GENDER) {
      icon = require('../../../assets/images/female_unselected.png');
    }
    return (
      <View
        style={{...styles.container, opacity: this.props.scrollViewOpacity}}>
        <UserAvatarIcon size={170} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
          }}>
          <Text style={styles.fullnameText}>{this.props.fullName}</Text>
          <Button
            transparent
            onPress={() => {
              this.props.updateAction(UPDATE_ACCOUNT_ACTION);
            }}
            style={{borderRadius: 30, paddingBottom: 15}}>
            <Icon name="edit" type="AntDesign" style={styles.updateIcon} />
          </Button>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {!isAuthorized(this.props.user) && (
            <Text style={styles.accountValidationText}>
              {ACCOUNT_NOT_VALIDATED_YET_MESSAGE}
            </Text>
          )}
        </View>
        <Button
          rounded
          danger
          onPress={this.props.logout}
          style={{
            ...FormStyles.spinnerButton,
            alignSelf: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Text>Déconnexion</Text>
        </Button>
        <TouchableOpacity onPress={() => this.showDeleteConfirmation(true)}>
          <Text
            style={{
              ...FormStyles.linkedBtn,
              color: mainColor,
              textAlign: 'center',
              marginTop: 18,
            }}>
            Supprimer mon compte
          </Text>
        </TouchableOpacity>
        <InformationModal
          visible={this.state.deleteAccModalVisible}
          onHide={() => this.showDeleteConfirmation(false)}
          onConfirm={this.onConfirmDeleteAccount}
          title={DELETE_USER_ACCOUNT_CONFIRM_MESSAGE_TITLE}>
          <View>
            <Text>{DELETE_USER_ACCOUNT_CONFIRM_MESSAGE_BODY}</Text>
          </View>
        </InformationModal>
      </View>
    );
  }
}

ShowAccount.propTypes = {
  user: PropTypes.object.isRequired,
  gender: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  updateAction: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  deleteCurrentUserAccount: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  scrollViewOpacity: PropTypes.number,
};

export default ShowAccount;
