import React from 'react';

import styles from './Form.module.css';

const Input = ({
  name,
  label,
  type = 'number',
  onInputChange,
  placeholder,
  value,
}) => {
  return (
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
};

export default Input;
