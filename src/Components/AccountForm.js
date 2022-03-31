import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Item, Icon, Input, Label, Button} from 'native-base';
import SpinnerButton from 'react-native-spinner-button';
import * as PropTypes from 'prop-types';
import {CheckBox} from 'react-native-elements';
import moment from 'moment';
import {
  isCorrectPhoneNumber,
  isCorrectName,
  isCorrectEmailAddress,
  isCorrectPassword,
  isCorrectZipCode,
} from '../Utils/ValidatorFunctions';
import styles from './AccountForm/css';

import {
  CREATE_ACCOUNT_ACTION,
  MARRIED,
  MALE_GENDER,
  SHOW_ACCOUNT_ACTION,
  SINGLE,
  UPDATE_ACCOUNT_ACTION,
  FEMALE_GENDER,
  SHOW_CONDITION_ACTION,
} from '../Utils/Constants';
import getRandomQuestionIndex from './AccountForm/Functions';
import ActionsButton from './AccountForm/ActionsButton';
import ChildrenInformation from './AccountForm/ChildrenInformation';
import RenderInput from './RenderInput';
import ImageRadioButton from './ImageRadioButton';
import TextRadioButton from './TextRadioButton';
import DatePicker from './DatePicker';
import RenderPassword from './RenderPassoword';
import {backgroundColor, mainColor} from '../Utils/colors';
import Template from '../css/Template.css';
import FormStyles from '../css/Form.css';
import BackArrowIcon from './icons/BackArrowIcon';

export default class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex1: null,
      questionIndex2: null,
    };
  }

  componentDidMount() {
    const {questions1, questions2, question1, question2} = this.props.data;
    if (question1) {
      this.props.updateState({question1});
      this.setState({
        questionIndex1: questions1.findIndex(
          (question) => question.id === question1.id,
        ),
      });
    }

    if (question2) {
      this.props.updateState({question2});
      this.setState({
        questionIndex2: questions2.findIndex(
          (question) => question.id === question2.id,
        ),
      });
    }
  }

  setDate(newDate) {
    this.props.updateState({birthday: newDate});
  }

  setQuestionIndex1 = () => {
    const {questionIndex1} = this.state;

    const newQuestionIndex1 = getRandomQuestionIndex(questionIndex1);
    const question1 = this.props.data.questions1[newQuestionIndex1];
    this.props.updateState({question1});
    this.setState({
      questionIndex1: newQuestionIndex1,
    });
  };

  setQuestionIndex2 = () => {
    const {questionIndex2} = this.state;
    const newQuestionIndex2 = getRandomQuestionIndex(questionIndex2);
    const question2 = this.props.data.questions2[newQuestionIndex2];
    this.props.updateState({question2});
    this.setState({
      questionIndex2: newQuestionIndex2,
    });
  };

  renderQuestionsBloc() {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: 300,
            marginLeft: 10,
          }}>
          <Label style={FormStyles.label}>
            {this.props.data.question1 && this.props.data.question1.question}*
          </Label>
          <SpinnerButton
            buttonStyle={styles.refreshButton}
            onPress={this.setQuestionIndex1}
            indicatorCount={10}
            spinnerType="SkypeIndicator">
            <Icon style={{color: '#d3d3d3', fontSize: 14}} name="sync" />
          </SpinnerButton>
        </View>
        <Item rounded style={{...FormStyles.inputItem, ...styles.inputItem}}>
          <Input
            style={FormStyles.input}
            autoCapitalize="sentences"
            keyboardType="default"
            onChangeText={(response1) => this.props.updateState({response1})}
            value={this.props.data.response1}
          />
        </Item>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: 300,
            marginLeft: 10,
          }}>
          <Label style={FormStyles.label}>
            {this.props.data.question2 && this.props.data.question2.question}*
          </Label>
          <SpinnerButton
            buttonStyle={styles.refreshButton}
            onPress={this.setQuestionIndex2}
            indicatorCount={10}
            spinnerType="SkypeIndicator">
            <Icon style={{color: '#d3d3d3', fontSize: 14}} name="sync" />
          </SpinnerButton>
        </View>
        <Item rounded style={FormStyles.inputItem}>
          <Input
            style={FormStyles.input}
            autoCapitalize="sentences"
            keyboardType="default"
            onChangeText={(response2) => this.props.updateState({response2})}
            value={this.props.data.response2}
          />
        </Item>
      </>
    );
  }

  render() {
    const {
      email,
      lastName,
      middleName,
      oldPassword,
      password,
      confirmPassword,
      fatherName,
      firstName,
      zipCode,
      phoneNumber,
      childrenNumber,
      maritalStatus,
      children,
      functionName,
      birthday,
      gender,
      acceptTermsOfUse,
    } = this.props.data;

    const genderOptions = [
      {
        value: MALE_GENDER,
        label: 'Homme',
        selectedImage: require('../../assets/images/male_selected.png'),
        unselectedImage: require('../../assets/images/male_unselected.png'),
      },
      {
        value: FEMALE_GENDER,
        label: 'Femme',
        selectedImage: require('../../assets/images/female_selected.png'),
        unselectedImage: require('../../assets/images/female_unselected.png'),
      },
    ];

    const maritalStatusOptions = [
      {
        value: SINGLE,
        label: 'Célibataire',
      },
      {
        value: MARRIED,
        label: 'Marié(e)',
      },
    ];

    return (
      <>
        <ScrollView
          centerContent
          style={{
            opacity: this.props.scrollViewOpacity,
            backgroundColor,
          }}>
          <View>
            <Button
              transparent
              onPress={() => {
                if (this.props.action === UPDATE_ACCOUNT_ACTION) {
                  this.props.updateState({
                    ...this.props.initData,
                  });
                  this.props.updateAction(SHOW_ACCOUNT_ACTION);
                } else {
                  this.props.navigation.navigate('LoginScreen');
                }
              }}
              style={{
                marginLeft: 20,
                marginTop: 10,
                borderRadius: 30,
                width: 50,
              }}>
              <BackArrowIcon />
            </Button>
          </View>
          <Label style={Template.pageTitle}>Création de Compte</Label>

          {/* <ImageRadioButton */}
          {/*  options={genderOptions} */}
          {/*  value={gender} */}
          {/*  onPress={(value) => this.props.updateState({gender: value})} */}
          {/* /> */}

          <TextRadioButton
            options={genderOptions}
            value={gender}
            onPress={(value) => this.props.updateState({gender: value})}
          />

          <RenderInput
            checkFunction={isCorrectName}
            label="Nom"
            onChange={(value) => this.props.updateState({lastName: value})}
            required
            value={lastName}
          />
          <RenderInput
            checkFunction={isCorrectName}
            label="Nom jeune fille"
            onChange={(value) => this.props.updateState({middleName: value})}
            required={false}
            value={middleName}
          />
          <RenderInput
            checkFunction={isCorrectName}
            label="Fils(fille) de"
            onChange={(value) => this.props.updateState({fatherName: value})}
            required
            value={fatherName}
          />
          <RenderInput
            checkFunction={isCorrectName}
            label="Prénom"
            onChange={(value) => this.props.updateState({firstName: value})}
            required
            value={firstName}
          />

          <TextRadioButton
            options={maritalStatusOptions}
            value={maritalStatus}
            onPress={(value) => this.props.updateState({maritalStatus: value})}
          />

          <DatePicker
            minimumDate={moment('1900-01-01').toDate()}
            maximumDate={new Date()}
            label="Date de naissance"
            defaultDate={birthday && moment(birthday).toDate()}
            onCustomChange={(date) => this.setDate(date)}
          />

          {this.props.action === UPDATE_ACCOUNT_ACTION ? (
            <>
              <ChildrenInformation
                maritalStatus={maritalStatus}
                childrenNumber={childrenNumber}
                childrenInformation={children || []}
                updateState={(state) => this.props.updateState(state)}
              />
              <RenderInput
                checkFunction={isCorrectName}
                label="Fonction"
                onChange={(value) =>
                  this.props.updateState({functionName: value})
                }
                required={false}
                value={functionName}
              />
            </>
          ) : null}
          <RenderInput
            checkFunction={isCorrectZipCode}
            label="Code postal"
            maxLength={5}
            keyboardType="numeric"
            onChange={(value) => this.props.updateState({zipCode: value})}
            required={false}
            value={zipCode}
          />
          <RenderInput
            checkFunction={
              this.props.action === CREATE_ACCOUNT_ACTION
                ? isCorrectEmailAddress
                : undefined
            }
            label="Email"
            keyboardType="email-address"
            onChange={(value) => this.props.updateState({email: value})}
            required
            disabled={this.props.action === UPDATE_ACCOUNT_ACTION}
            value={email}
            itemStyle={{
              opacity: this.props.action === CREATE_ACCOUNT_ACTION ? 1 : 0.5,
            }}
            autoCapitalize="none"
          />
          <RenderInput
            checkFunction={isCorrectPhoneNumber}
            label="Téléphone"
            maxLength={10}
            keyboardType="numeric"
            onChange={(value) => this.props.updateState({phoneNumber: value})}
            required
            value={phoneNumber}
          />
          {this.props.action === CREATE_ACCOUNT_ACTION
            ? this.renderQuestionsBloc()
            : null}

          {this.props.action === UPDATE_ACCOUNT_ACTION ? (
            <RenderPassword
              label="Ancien mot de passe"
              onChange={(value) => this.props.updateState({oldPassword: value})}
              required={this.props.action === CREATE_ACCOUNT_ACTION}
              value={oldPassword}
              checkPassword={false}
            />
          ) : null}

          <RenderPassword
            label={
              this.props.action === UPDATE_ACCOUNT_ACTION
                ? 'Nouveau mot de passe'
                : 'Mot de passe'
            }
            onChange={(value) => this.props.updateState({password: value})}
            required={this.props.action === CREATE_ACCOUNT_ACTION}
            value={password}
          />
          <RenderPassword
            label="Confirmer mot de passe"
            error={
              confirmPassword.length > 0 &&
              (!isCorrectPassword(confirmPassword) ||
                password !== confirmPassword)
            }
            onChange={(value) =>
              this.props.updateState({confirmPassword: value})
            }
            required={this.props.action === CREATE_ACCOUNT_ACTION}
            value={confirmPassword}
          />

          {this.props.action === CREATE_ACCOUNT_ACTION ? (
            <View
              style={{marginLeft: 10, marginRight: 30, flexDirection: 'row'}}>
              <CheckBox
                containerStyle={{marginTop: -10}}
                checked={acceptTermsOfUse}
                checkedColor={mainColor}
                uncheckedColor={mainColor}
                onPress={() =>
                  this.props.updateState({acceptTermsOfUse: !acceptTermsOfUse})
                }
              />
              <Text style={{marginRight: 20}}>
                En s&apos;inscrivant, vous acceptez les{' '}
                <Text
                  style={{
                    color: mainColor,
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                  }}
                  onPress={() => {
                    this.props.updateState({readTermsOfUse: true});
                    this.props.updateAction(SHOW_CONDITION_ACTION);
                  }}>
                  Conditions générale et la politique de confidentialité
                </Text>
              </Text>
            </View>
          ) : null}

          <ActionsButton
            action={this.props.action}
            onValidate={() => this.props.onSubmit()}
            onCancel={() => this.props.updateAction(SHOW_ACCOUNT_ACTION)}
            data={this.state}
            navigation={this.props.navigation}
          />
          <View>
            <Button
              transparent
              onPress={() => {
                if (this.props.action === UPDATE_ACCOUNT_ACTION) {
                  this.props.updateState({
                    ...this.props.initData,
                  });
                  this.props.updateAction(SHOW_ACCOUNT_ACTION);
                } else {
                  this.props.navigation.navigate('LoginScreen');
                }
              }}
              style={{
                marginLeft: 20,
                marginTop: 10,
                borderRadius: 30,
                width: 50,
              }}>
              <BackArrowIcon />
            </Button>
          </View>
        </ScrollView>
      </>
    );
  }
}

AccountForm.propTypes = {
  navigation: PropTypes.object,
  action: PropTypes.string,
  onSubmit: PropTypes.func,
  updateState: PropTypes.func,
  updateAction: PropTypes.func,
  data: PropTypes.object,
  scrollViewOpacity: PropTypes.number,
  initData: PropTypes.object,
};
