import React from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.css';
import { CHEMICALS } from '../../constants';

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
      <p
        className={`${styles.result} ${
          type === CHEMICALS.chlorine.id ? styles.isChlorineResult : ''
        }`}
      >
        {result?.message || result}
      </p>
      {result?.subMessage && (
        <p className={styles.resultSubMessage}>{result?.subMessage}</p>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <h2>{header}</h2>
        {result ? renderResult() : null}
        <div className={styles.inputs}>{children}</div>
      </form>
    </div>
  );
};

Form.propTypes = {
  type: PropTypes.string,
  header: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  result: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.objectOf(PropTypes.string),
  ]),
  children: PropTypes.node.isRequired,
};

export default Form;
