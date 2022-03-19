import {Input, Item, Label} from 'native-base';
import React, {useState} from 'react';
import {Text} from 'react-native';
import * as PropTypes from 'prop-types';
import styles from './AccountForm/css';
import {isCorrectPassword} from '../Utils/Functions';

const RenderPassword = ({
  label,
  value,
  required,
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
  return (
    <>
      {label && (
        <Label style={styles.label}>
          {label}
          {required ? '*' : ''}
        </Label>
      )}
      <Item
        rounded
        style={itemStyle || styles.inputItem}
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
          style={styles.input}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType || 'default'}
          maxLength={maxLength}
          onChangeText={onChange}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          autoCapitalize="none"
        />
        {value && value.length > 0 ? (
          <Text
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            style={{color: '#cb8347'}}>
            {!secureTextEntry ? 'Masquer' : 'Afficher'}
          </Text>
        ) : null}
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
export default RenderPassword;
