import React from 'react';
import PropTypes from 'prop-types';
import styles from './Form.module.css';

const Form = ({
  type, // chemical to be displayed with the result
  header = '',
  onFormSubmit = null,
  result,
  children = null,
}) => {
  const renderResult = () => (
    <div className={styles.resultContainer}>
      <p>Total {type} to Add:</p>
      <p className={styles.result}>{result}</p>
    </div>
  );

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <h2>{header}</h2>
      {result ? renderResult() : null}
      <div className={styles.inputs}>{children}</div>
    </form>
  );
};

Form.propTypes = {
  type: PropTypes.string,
  header: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  result: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default Form;
