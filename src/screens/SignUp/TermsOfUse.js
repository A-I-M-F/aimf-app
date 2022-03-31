import {ScrollView, Text, View, useWindowDimensions} from 'react-native';
import React, {useEffect} from 'react';
import {Button, Icon} from 'native-base';
import {Text as ElementText} from 'react-native-elements';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RenderHtml from 'react-native-render-html';
import {CREATE_ACCOUNT_ACTION} from '../../Utils/Constants';
import {register} from '../../store/reducers/accountRedux';
import {getTermsOfUse} from '../../store/reducers/authenticationRedux';
import BackArrowIcon from '../../Components/icons/BackArrowIcon';

const TermsOfUse = ({termsOfUse, getTermsOfUse, updateAction, updateState}) => {
  const {width} = useWindowDimensions();
  useEffect(() => getTermsOfUse(), []);
  const source = {html: termsOfUse && termsOfUse.content};

  return (
    <ScrollView
      centerContent
      style={{
        padding: 20,
        backgroundColor: '#fce3ba',
      }}>
      <View style={{width: 100, height: 100}}>
        <Button
          transparent
          onPress={() => updateAction(CREATE_ACCOUNT_ACTION)}
          style={{marginLeft: 20, marginTop: 10, borderRadius: 30, width: 50}}>
          <BackArrowIcon />
        </Button>
      </View>
      <RenderHtml contentWidth={width} source={source} />
      <View>
        <Button
          onPress={() => {
            updateState({readTermsOfUse: true});
            updateState({acceptTermsOfUse: true});
            updateAction(CREATE_ACCOUNT_ACTION);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 150,
            borderRadius: 10,
            backgroundColor: '#cb8347',
            marginTop: 35,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <Text style={{fontSize: 18, color: '#fff'}}>J&apos;accepte</Text>
        </Button>
      </View>
      <View style={{width: 100, height: 100}}>
        <Button
          transparent
          onPress={() => updateAction(CREATE_ACCOUNT_ACTION)}
          style={{borderRadius: 30, width: 50}}>
          <Icon style={{color: '#000'}} name="md-arrow-back" type="Ionicons" />
        </Button>
      </View>
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
