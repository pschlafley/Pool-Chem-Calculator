import React from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.css';

const Button = ({ type = 'submit', isDisabled, label = '' }) => (
  <button className={styles.button} type={type} disabled={isDisabled}>
    {label}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  isDisabled: PropTypes.bool.isRequired,
  label: PropTypes.string,
};

export default Button;
