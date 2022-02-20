import React from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.css';

const Button = ({ type = 'submit', isDisabled, label = '' }) => {
  console.log('isDisabled:', isDisabled);
  return (
    <button
      className={`${styles.button} ${isDisabled ? styles.isDisabled : ''}`}
      type={type}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  isDisabled: PropTypes.bool.isRequired,
  label: PropTypes.string,
};

export default Button;
