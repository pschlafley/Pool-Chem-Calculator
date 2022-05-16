import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Select from './Select';

import styles from './Form.module.css';

const Input = ({
  name = '',
  label = '',
  type = 'number',
  onInputChange = null,
  placeholder = '',
  value = null,
  isFirstInput = false,
  inputOptions = [],
  className = '',
  isRequired = false,
}) => {
  const inputRef = useRef(null);

  const selectProps = {
    name,
    label,
    onInputChange,
    placeholder,
    value,
    inputOptions,
    inputRef,
  };

  useEffect(() => {
    // focus the first input on first render and after calculating the result
    if (isFirstInput && !value) inputRef.current.focus();
  }, [isFirstInput, value]);

  if (type === 'select') {
    return (
      <div className={styles.input}>
        <Select {...selectProps} />
      </div>
    );
  }

  return (
    <div className={`${styles.input} ${className}`}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        onChange={onInputChange}
        placeholder={placeholder}
        value={value}
        ref={inputRef}
        required={isRequired}
      />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isFirstInput: PropTypes.bool.isRequired,
  inputOptions: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default Input;
