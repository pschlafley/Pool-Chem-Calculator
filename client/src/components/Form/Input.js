import React from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.css';

const Input = ({
  name = '',
  label = '',
  type = 'number',
  onInputChange = null,
  placeholder = '',
  value = null,
}) => (
  <div className={styles.input}>
    <label htmlFor={name}>{label}</label>
    <input
      name={name}
      type={type}
      onChange={onInputChange}
      placeholder={placeholder}
      value={value}
    />
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Input;
