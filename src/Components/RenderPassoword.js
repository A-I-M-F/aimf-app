import {Icon, Input, Item, Label} from 'native-base';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import * as PropTypes from 'prop-types';
import Tooltip from 'react-native-walkthrough-tooltip';
import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';
import FormStyles from '../css/Form.css';
import {isCorrectPassword} from '../Utils/ValidatorFunctions';
import {mainColor2Button, textColor1} from '../Utils/colors';

const RenderPassword = ({
  label,
  value,
  checkPassword,
  onChange,
  keyboardType,
  maxLength = 128,
  disabled,
  itemStyle,
  error,
  placeholder,
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [toolTipVisible, setToolTipVisible] = useState(false);
  return (
    <>
      {label && (
        <View style={{flexDirection: 'row'}}>
          <Label style={FormStyles.label}>{label}*</Label>
          <Tooltip
            isVisible={toolTipVisible}
            content={
              <>
                <Text>Le mot de passe doit contenir :</Text>
                <FlatList
                  data={[
                    {key: 'Au minimum 8 caractères'},
                    {key: 'Au moins Une lettre majuscule'},
                    {key: 'Au moins Une lettre minuscule'},
                    {key: 'Au moins un chiffre'},
                    {key: 'Au moins un caractère spécial'},
                  ]}
                  renderItem={({item}) => (
                    <Text style={FormStyles.item}>
                      <Icon
                        name="controller-record"
                        type="Entypo"
                        style={{fontSize: 10}}
                      />
                      {item.key}
                    </Text>
                  )}
                />
              </>
            }
            placement="top"
            onClose={() => setToolTipVisible(false)}>
            <TouchableHighlight onPress={() => setToolTipVisible(true)}>
              <Text style={{backgroundColor: 'transparent', fontSize: 0}}>
                {' '}
                <Icon
                  style={{fontSize: 19, color: mainColor2Button}}
                  name="information-circle-outline"
                  type="Ionicons"
                />
              </Text>
            </TouchableHighlight>
          </Tooltip>
        </View>
      )}

      <Item
        rounded
        style={{...itemStyle, ...FormStyles.inputItem}}
        success={
          value !== null &&
          checkPassword &&
          value.length > 0 &&
          isCorrectPassword(value)
        }
        error={
          error !== undefined
            ? error
            : value !== null &&
              checkPassword &&
              value.length > 0 &&
              !isCorrectPassword(value)
        }>
        <Input
          style={FormStyles.input}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType || 'default'}
          maxLength={maxLength}
          placeholderTextColor={textColor1}
          onChangeText={onChange}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          autoCapitalize="none"
        />
        {value && value.length > 0 ? (
          <Icon
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            type="AntDesign"
            name={secureTextEntry ? 'eye' : 'eyeo'}
            style={{
              color: mainColor2Button,
              marginBottom: -3,
              fontSize: 18,
              marginLeft: -35,
            }}
          />
        ) : // <Text
        //   onPress={() => setSecureTextEntry(!secureTextEntry)}
        //   style={{color: '#cb8347'}}>
        //   {!secureTextEntry ? 'Masquer' : 'Afficher'}
        // </Text>
        null}
      </Item>
    </>
  );
};

RenderPassword.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  checkPassword: PropTypes.func,
  onChange: PropTypes.func,
  keyboardType: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  itemStyle: PropTypes.object,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
};
RenderPassword.defaultProps = {
  checkPassword: true,
};

export default RenderPassword;
