import {Icon, Input, Item, Label} from 'native-base';
import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './AccountForm/css';
import FormStyles from '../css/Form.css';
import {textColor1} from '../Utils/colors';

const RenderInput = ({
  label,
  value,
  required,
  checkFunction,
  onChange,
  keyboardType,
  maxLength = 128,
  disabled,
  itemStyle,
  placeholder,
  autoCapitalize,
}) => {
  return (
    <>
      {label && (
        <Label style={FormStyles.label}>
          {label}
          {required ? '*' : ''}
        </Label>
      )}
      <Item
        rounded
        style={{...FormStyles.inputItem, ...itemStyle}}
        success={
          value !== null &&
          checkFunction !== undefined &&
          value.length > 0 &&
          checkFunction(value)
        }
        error={
          value !== null &&
          checkFunction !== undefined &&
          value.length > 0 &&
          !checkFunction(value)
        }>
        <Input
          style={FormStyles.input}
          keyboardType={keyboardType || 'default'}
          placeholderTextColor={textColor1}
          maxLength={maxLength}
          onChangeText={onChange}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          autoCapitalize={autoCapitalize}
        />
        {value && checkFunction !== undefined && value.length > 0 ? (
          <Icon
            name={checkFunction(value) ? 'checkmark-circle' : 'close-circle'}
            style={checkFunction(value) ? styles.green : styles.red}
          />
        ) : null}
      </Item>
    </>
  );
};

RenderInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  checkFunction: PropTypes.func,
  onChange: PropTypes.func,
  keyboardType: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  itemStyle: PropTypes.object,
  placeholder: PropTypes.string,
  autoCapitalize: PropTypes.string,
};

export default RenderInput;
