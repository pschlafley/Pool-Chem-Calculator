import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { calculatePoolSalt } from '../../../calculations/pool-salt';
import { UNITS } from '../../../constants';
import styles from '../Form.module.css';

const initialValues = {
  gallons: '',
  salt: '',
};

const schema = yup.object().shape({
  gallons: yup.number().required(),
  salt: yup.number().required(),
});

const SaltForm = () => {
  const [saltNeeded, setSaltNeeded] = useState(null);

  const handleCalculateSalt = ({ gallons, salt }, resetForm) => {
    const amountNeeded = Math.abs(calculatePoolSalt(gallons, salt));
    setSaltNeeded(amountNeeded);
    resetForm({ values: initialValues });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) =>
        handleCalculateSalt(values, resetForm)
      }
      validationSchema={schema}
    >
      {({ handleChange, handleSubmit, dirty, isValid, values }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Calculate Salt Needed</h2>

          {saltNeeded && (
            <div className={styles.resultContainer}>
              <p>Total Salt to Add:</p>
              <p className={styles.result}>
                {saltNeeded} {UNITS.pounds}
              </p>
            </div>
          )}

          <div className={styles.inputs}>
            <div>
              <label htmlFor='gallons'>Pool Gallons: </label>
              <input
                type='number'
                name='gallons'
                placeholder='Enter Gallons'
                onChange={handleChange}
                value={values.gallons}
              />
            </div>

            <div>
              <label htmlFor='salt'>Current Salt: </label>
              <input
                type='number'
                name='salt'
                placeholder='Enter Current Salt'
                onChange={handleChange}
                value={values.salt}
              />
            </div>

            <button
              type='submit'
              disabled={!dirty || !isValid}
              className={styles.button}
            >
              Calculate
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SaltForm;
