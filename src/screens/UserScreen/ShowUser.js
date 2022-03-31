import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Icon, Text, Thumbnail} from 'native-base';
import * as PropTypes from 'prop-types';
import SpinnerButton from 'react-native-spinner-button';
import SettingsSwitch from '../../Components/switch';
import {
  ADMIN_ROLE,
  FEMALE_GENDER,
  LIST_USER_ACTION,
  MARRIED,
  MEMBER_ROLE,
  NEW_MEMBER_ROLE,
  SUPER_ADMIN_ROLE,
  UPDATE_ADMIN_ROLE_CONFIRM_MESSAGE,
  UPDATE_USER_STATUS_CONFIRM_MESSAGE,
} from '../../Utils/Constants';
import {
  getUserAssociationRoleId,
  isAdmin,
  isAuthorized,
  isSuperAdmin,
} from '../../Utils/Account';
import {isoDateToFr} from '../../Utils/Functions';
import InformationModal from '../../Components/InformationModal';
import {getAssociationRoleName} from '../../Utils/Role';
import BackArrowIcon from '../../Components/icons/BackArrowIcon';

class ShowUser extends Component {
  constructor(props) {
    super(props);
    const roleAssociationId = getUserAssociationRoleId(this.props.data);
    this.state = {
      confirmUpdateVisible: false,
      isAuthorized: isAuthorized(props.data),
      isSuperAdmin: isSuperAdmin(props.data),
      isAdmin: isAdmin(props.data),
      confirmMessage: '',
      updateUserLoading: false,
      scrollViewOpacity: 1,
      roleAssociationId: roleAssociationId?.id,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps): void {
    this.setState({
      isAuthorized: isAuthorized(nextProps.data),
      isSuperAdmin: isSuperAdmin(nextProps.data),
      isAdmin: isAdmin(nextProps.data),
    });
  }

  setConfirmModalVisible = (visible) => {
    if (!visible) {
      const roleAssociationId = getUserAssociationRoleId(this.props.data);
      this.setState({
        isAuthorized: isAuthorized(this.props.data),
        isSuperAdmin: isSuperAdmin(this.props.data),
        isAdmin: isAdmin(this.props.data),
        roleAssociationId: roleAssociationId?.id,
      });
    }
    this.setState({
      confirmUpdateVisible: visible,
      scrollViewOpacity: visible ? 0.5 : 1,
    });
  };

  cancelUpdateEnableAdminFields = () => {
    this.setConfirmModalVisible(false);
  };

  renderSeparator = (key) => {
    return (
      <View
        key={key}
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  getSecurityQuestionBlock = () => {
    const rows = [];
    if (
      this.props?.data?.securityQuestions &&
      this.props.data.securityQuestions.length > 0
    ) {
      rows.push(
        <View
          key="securityQuestions"
          style={{
            height: 40,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={{marginLeft: 14, color: '#3E3E3E', fontSize: 15}}>
            Les réponses aux questions de sécurité :
          </Text>
        </View>,
      );
      rows.push(
        <View
          key="question1"
          style={{
            height: 30,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{marginLeft: 14, color: '#3E3E3E', fontSize: 14}}>
            {this.props.data.securityQuestions[0].question}
          </Text>
        </View>,
      );
      rows.push(
        <View
          key="answer1"
          style={{
            height: 30,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{marginLeft: 14, color: '#3E3E3E', fontSize: 14}}>
            {this.props.data.securityQuestions[0].answer}
          </Text>
        </View>,
      );
      rows.push(
        <View
          key="question2"
          style={{
            height: 30,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{marginLeft: 14, color: '#3E3E3E', fontSize: 14}}>
            {this.props.data.securityQuestions[1].question}
          </Text>
        </View>,
      );
      rows.push(
        <View
          key="answer2"
          style={{
            height: 30,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{marginLeft: 14, color: '#3E3E3E', fontSize: 14}}>
            {this.props.data.securityQuestions[1].answer}
          </Text>
        </View>,
      );
      rows.push(this.renderSeparator('securityQuestions_separator'));
    }
    return rows;
  };

  getChildrenBlock = () => {
    const rows = [];
    if (this.props?.data?.children && this.props.data.children.length > 0) {
      rows.push(
        <View
          key="childrens"
          style={{
            height: 40,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={{marginLeft: 14, color: '#3E3E3E', fontSize: 15}}>
            Les enfants :
          </Text>
        </View>,
      );
      for (let i = 0; i < this.props.data.children.length; i += 1) {
        rows.push(
          <View
            key={`children_year_${i}`}
            style={{
              height: 30,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{marginLeft: 14, color: '#3E3E3E', fontSize: 14}}>
              Année de naissance
            </Text>
            <Text style={{marginRight: 14, color: '#3E3E3E', fontSize: 14}}>
              {this.props.data.children[i].yearOfBirth}
            </Text>
          </View>,
        );
        rows.push(
          <View
            key={`children_schoolLevels_${i}`}
            style={{
              height: 30,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{marginLeft: 14, color: '#3E3E3E', fontSize: 14}}>
              Année scolaire
            </Text>
            <Text style={{marginRight: 14, color: '#3E3E3E', fontSize: 14}}>
              {this.props.data.children[i].schoolLevel}
            </Text>
          </View>,
        );
      }
      rows.push(this.renderSeparator('children_separator'));
    }

    return rows;
  };

  renderInformation = () => {
    const rows = [];
    const fields = [
      {field: 'lastName', label: 'Nom'},
      {field: 'firstName', label: 'Prénom'},
      {field: 'brothe', label: 'Fils de'},
      {field: 'birthday', label: 'Date de naissance'},
      {field: 'maritalStatus', label: 'Situation familiale'},
      {field: 'function', label: 'Fonction'},
      {field: 'email', label: 'Email'},
      {field: 'phoneNumber', label: 'Téléphone'},
      {field: 'zipCode', label: 'Code postal'},
      {field: 'hasVerifiedEmail', label: 'Email vérifié'},
    ];

    if (this.props.data.maritalStatus === MARRIED) {
      fields.push({
        field: 'childrenNumber',
        label: "Nombre d'enfants scolarisés",
      });
    }

    fields.forEach((row) => {
      rows.push(
        <View
          key={row.field}
          style={{
            height: 40,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{marginLeft: 14, color: '#3E3E3E', fontSize: 15}}>
            {row.label}
          </Text>
          <Text style={{color: '#3E3E3E', fontSize: 15}}>
            {row.field === 'birthday'
              ? this.props.data[row.field] &&
                isoDateToFr(this.props.data[row.field])
              : row.field === 'hasVerifiedEmail'
              ? this.props.data[row.field]
                ? 'Oui'
                : 'Non'
              : this.props.data[row.field]}
          </Text>
        </View>,
      );

      rows.push(this.renderSeparator(`separator_${row.field}`));
    });

    return rows.concat(
      this.getSecurityQuestionBlock(),
      this.getChildrenBlock(),
    );
  };

  renderAssociationButtons = () => {
    const {isSuperAdmin, isAdmin, roleList} = this.props;
    const {isAuthorized, roleAssociationId} = this.state;

    if ((!isSuperAdmin && !isAdmin) || !isAuthorized) {
      return <></>;
    }
    const associationsButtons = [];

    roleList.map((item) => {
      associationsButtons.push(
        <SettingsSwitch
          key={item.id}
          title={item.name.replace('_', ' ')}
          titleStyle={{marginLeft: -5, color: '#3E3E3E', fontSize: 15}}
          onValueChange={(value) => {
            this.setState({
              roleAssociationId: value ? item.id : null,
              isSuperAdmin: false,
              isAdmin: false,
              confirmMessage: UPDATE_ADMIN_ROLE_CONFIRM_MESSAGE,
            });
            this.setConfirmModalVisible(true);
          }}
          value={roleAssociationId === item.id}
          trackColor={{
            true: '#c18b64',
            false: '#efeff3',
          }}
        />,
      );
    });

    return associationsButtons;
  };

  renderUserStatus = () => {
    if (this.props.currentUserId !== this.props.data.id) {
      const {isAdmin, isSuperAdmin} = this.state;
      return (
        <>
          <SettingsSwitch
            title="Autorisé"
            titleStyle={{marginLeft: -5, color: '#3E3E3E', fontSize: 15}}
            onValueChange={(value) => {
              this.setState({
                isAuthorized: value,
                isAdmin: isAdmin && value,
                isSuperAdmin: isAdmin && value,
                roleAssociationId: null,
                confirmMessage: UPDATE_USER_STATUS_CONFIRM_MESSAGE,
              });
              this.setConfirmModalVisible(true);
            }}
            value={this.state.isAuthorized}
            trackColor={{
              true: '#c18b64',
              false: '#efeff3',
            }}
          />
          {this.props.isSuperAdmin && this.state.isAdmin && (
            <SettingsSwitch
              title="Super Admin"
              titleStyle={{marginLeft: -5, color: '#3E3E3E', fontSize: 15}}
              onValueChange={(value) => {
                this.setState({
                  isSuperAdmin: value,
                  roleAssociationId: null,
                  confirmMessage: UPDATE_ADMIN_ROLE_CONFIRM_MESSAGE,
                });
                this.setConfirmModalVisible(true);
              }}
              value={this.state.isSuperAdmin}
              trackColor={{
                true: '#c18b64',
                false: '#efeff3',
              }}
            />
          )}
          {this.state.isAuthorized && (
            <SettingsSwitch
              title="Admin"
              titleStyle={{marginLeft: -5, color: '#3E3E3E', fontSize: 15}}
              onValueChange={(value) => {
                this.setState({
                  isAdmin: value,
                  isSuperAdmin: isSuperAdmin && value,
                  roleAssociationId: null,
                  confirmMessage: UPDATE_ADMIN_ROLE_CONFIRM_MESSAGE,
                });
                this.setConfirmModalVisible(true);
              }}
              value={this.state.isAdmin}
              trackColor={{
                true: '#c18b64',
                false: '#efeff3',
              }}
            />
          )}
          {this.renderAssociationButtons()}
        </>
      );
    }
    return <></>;
  };

  updateUserRole = () => {
    const roles = [];
    const {isSuperAdmin, isAdmin, isAuthorized, roleAssociationId} = this.state;
    const {roleList} = this.props;
    if (isSuperAdmin) {
      roles.push(SUPER_ADMIN_ROLE);
    }
    if (!isSuperAdmin && isAdmin) {
      roles.push(ADMIN_ROLE);
    }
    if (!isAdmin && isAuthorized) {
      roles.push(MEMBER_ROLE);
    }

    if (roleAssociationId) {
      roles.push(getAssociationRoleName(roleList, roleAssociationId));
    }

    if (roles.length === 0) {
      roles.push(NEW_MEMBER_ROLE);
    }
    this.setState({
      confirmUpdateVisible: false,
      scrollViewOpacity: 1,
    });
    this.props.updateUserRole(this.props.data.id, roles);
  };

  render() {
    let logo = require('../../../assets/images/male_unselected.png');
    if (this.props.data.gender === FEMALE_GENDER) {
      logo = require('../../../assets/images/female_unselected.png');
    }
    return (
      <ScrollView
        centerContent
        style={{
          paddingTop: 20,
          paddingBottom: 14,
          paddingRight: 14,
          opacity: this.state.scrollViewOpacity,
        }}>
        <View>
          <Button
            transparent
            onPress={() => {
              this.props.updateAction(LIST_USER_ACTION);
            }}
            style={{
              marginLeft: 20,
              marginTop: 10,
              borderRadius: 30,
              width: 50,
              marginBottom: 20,
            }}>
            <BackArrowIcon />
          </Button>
        </View>
        <Thumbnail source={logo} style={{marginBottom: 14}} />
        {this.renderInformation()}
        {this.renderUserStatus()}

        <View style={{marginBottom: 30}} />
        <InformationModal
          visible={this.state.confirmUpdateVisible}
          onHide={() => this.setConfirmModalVisible(false)}
          title="Confirmer la modification">
          <Text style={{color: '#3E3E3E', marginLeft: 5, marginBottom: 50}}>
            {' '}
            {this.state.confirmMessage}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 40,
            }}>
            <SpinnerButton
              buttonStyle={{
                height: 40,
                width: 110,
                borderRadius: 10,
                backgroundColor: '#f8f8f8',
                color: '#3E3E3E',
                marginRight: 4,
                borderWidth: 1,
                borderColor: '#FFD792',
              }}
              onPress={this.cancelUpdateEnableAdminFields}>
              <Text>Annuler</Text>
            </SpinnerButton>
            <SpinnerButton
              buttonStyle={{
                height: 40,
                width: 110,
                borderRadius: 10,
                backgroundColor: '#FFD792',
                marginLeft: 4,
              }}
              isLoading={this.state.updateUserLoading}
              indicatorCount={10}
              spinnerType="SkypeIndicator"
              onPress={this.updateUserRole}>
              <Text>Confirmer</Text>
            </SpinnerButton>
          </View>
        </InformationModal>
      </ScrollView>
    );
  }
}

ShowUser.propTypes = {
  data: PropTypes.object,
  updateAction: PropTypes.func,
  updateUserRole: PropTypes.func,
  isSuperAdmin: PropTypes.bool,
  isAdmin: PropTypes.bool,
  currentUserId: PropTypes.number,
};

export default ShowUser;
