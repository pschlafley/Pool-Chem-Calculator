import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { calculatePoolSalt } from '../../../calculations/pool-salt';
import styles from '../Form.module.css';

const initialValues = {
  gallons: 0,
  salt: 0,
};

const schema = yup.object().shape({
  gallons: yup.number().required(),
  salt: yup.number().required(),
});

const SaltForm = () => {
  // TODO - finish handlesubmit using calculatepoolsalt function to get the result
  const handleSubmit = () => {};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {({ handleChange, handleSubmit, dirty, isValid }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Calculate Salt To Add</h2>

          {/* TODO - add in the calculation result */}

          <div className={styles.inputs}>
            <div>
              <label htmlFor='gallons'>Pool Gallons: </label>
              <input
                type='number'
                name='gallons'
                placeholder='Enter Gallons'
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='salt'>Current Salt: </label>
              <input
                type='number'
                name='salt'
                placeholder='Enter Current Salt'
                onChange={handleChange}
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
