import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { calculateTotalAlkalinity } from '../../../calculations/pool-alkalinity';
import { UNITS, CHEMICALS } from '../../../constants';
import styles from '../Form.module.css';

const initialState = {
  chemical: null,
  unit: null,
};

const initialValues = {
  gallons: '',
  alkalinity: '', // measured in PPM
};

const schema = yup.object().shape({
  gallons: yup.number().required(),
  alkalinity: yup.number().required(),
});

const AlkalinityForm = () => {
  const [chemicalNeeded, setChemicalNeeded] = useState(initialState);

  const handleCalculateAlk = ({ gallons, alkalinity }, resetForm) => {
    const amountNeeded = calculateTotalAlkalinity(gallons, alkalinity);
    console.log(`amountNedded ${amountNeeded}`);
    const doesNeedAcid = alkalinity > 120;
    const quarts = amountNeeded > 32;

    const unit = !doesNeedAcid
      ? UNITS.pounds
      : quarts
      ? UNITS.quarts
      : UNITS.fluidOunce;

    const formattedResult = quarts
      ? `${Math.abs(amountNeeded) / 32} ${unit}`
      : `${Math.abs(amountNeeded)} ${unit}`;
    setChemicalNeeded({
      chemical: doesNeedAcid ? CHEMICALS.acid.label : CHEMICALS.base.label,
      result: formattedResult,
    });

    resetForm({ values: initialValues });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) =>
        handleCalculateAlk(values, resetForm)
      }
      validationSchema={schema}
    >
      {({ handleChange, handleSubmit, dirty, isValid, values }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Calculate Alkalinity Needed</h2>

          {chemicalNeeded.result && (
            <div className={styles.resultContainer}>
              <p>Total {chemicalNeeded.chemical} to Add:</p>
              <p className={styles.result}>{chemicalNeeded.result}</p>
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
              <label htmlFor='alkalinity'>Current Alkalinity (in PPM): </label>
              <input
                type='number'
                name='alkalinity'
                onChange={handleChange}
                placeholder='Enter Alkalinity'
                value={values.alkalinity}
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

export default AlkalinityForm;
