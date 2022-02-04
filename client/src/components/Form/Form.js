import React from 'react';
import styles from './Form.module.css';

const Form = ({
  type = '', // chemical to be displayed with the result
  header = '',
  onFormSubmit,
  result,
  children,
}) => (
  <form className={styles.form} onSubmit={onFormSubmit}>
    <h2>{header}</h2>

    {result ? (
      <div className={styles.resultContainer}>
        <p>Total {type} to Add:</p>
        <p className={styles.result}>{result}</p>
      </div>
    ) : null}

    <div className={styles.inputs}>
      {/* inputs and submit button will go here */}
      {children}
    </div>
  </form>
);

export default Form;
