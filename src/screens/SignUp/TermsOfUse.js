import {ScrollView, Text, View, useWindowDimensions} from 'react-native';
import React, {useEffect} from 'react';
import {Button} from 'native-base';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RenderHtml from 'react-native-render-html';
import {CREATE_ACCOUNT_ACTION} from '../../Utils/Constants';
import {register} from '../../store/reducers/accountRedux';
import {getTermsOfUse} from '../../store/reducers/authenticationRedux';
import BackArrowIcon from '../../Components/icons/BackArrowIcon';
import styles from '../../css/PostScreen.css';
import {
  mainColorButton,
  backgroundColor,
  textColor1,
  textColor2,
} from '../../Utils/colors';
import SpinnerButton from 'react-native-spinner-button';
const TermsOfUse = ({termsOfUse, getTermsOfUse, updateAction, updateState}) => {
  const {width} = useWindowDimensions();
  useEffect(() => getTermsOfUse(), []);
  const source = {html: termsOfUse && termsOfUse.content};

  const renderBackButton = () => {
    return (
      <View style={{width: 100, height: 30, marginBottom: 40}}>
        <Button
          transparent
          onPress={() => updateAction(CREATE_ACCOUNT_ACTION)}
          style={{marginLeft: 20, marginTop: 10, borderRadius: 30, width: 50}}>
          <BackArrowIcon />
        </Button>
      </View>
    );
  };

  return (
    <ScrollView
      centerContent
      style={{
        padding: 20,
        backgroundColor,
      }}>
      {renderBackButton()}
      <RenderHtml
        baseStyle={{color: textColor2}}
        contentWidth={width}
        source={source}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <SpinnerButton
          // eslint-disable-next-line react-native/no-inline-styles
          buttonStyle={{
            ...styles.spinnerButton,
            backgroundColor: mainColorButton,
          }}
          onPress={() => {
            updateState({readTermsOfUse: true});
            updateState({acceptTermsOfUse: true});
            updateAction(CREATE_ACCOUNT_ACTION);
          }}
          indicatorCount={10}
          spinnerType="SkypeIndicator">
          <Text style={styles.buttonText}>J'accepte</Text>
        </SpinnerButton>
      </View>
      {renderBackButton()}
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  const {termsOfUse} = state.authenticationStore;
  return {
    termsOfUse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(register(data)),
    getTermsOfUse: () => dispatch(getTermsOfUse()),
  };
};

TermsOfUse.propTypes = {
  getTermsOfUse: PropTypes.func,
  termsOfUse: PropTypes.object,
  updateAction: PropTypes.func.isRequired,
  updateState: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse);
