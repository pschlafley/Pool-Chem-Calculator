import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.css';

const Input = ({
  name = '',
  label = '',
  type = 'number',
  onInputChange = null,
  placeholder = '',
  value = null,
  isFirstInput = false,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    // focus the first input on first render and after calculating the result
    if (isFirstInput && !value) inputRef.current.focus();
  }, [isFirstInput, value]);

  return (
    <div className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        onChange={onInputChange}
        placeholder={placeholder}
        value={value}
        ref={inputRef}
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
};

export default Input;
