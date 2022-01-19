import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
  calculateTotalAlkalinity,
  UNITS,
  CHEMICALS,
} from '../../../calculations/pool-alkalinity';
import styles from './AlkalinityForm.module.css';

const initialState = {
  chemical: null,
  unit: null,
};

const initialValues = {
  gallons: 0,
  alkalinity: 0, // measured in PPM
};

const schema = yup.object().shape({
  gallons: yup.number().required(),
  alkalinity: yup.number().required(),
});

const AlkalinityForm = () => {
  const [chemicalNeeded, setChemicalNeeded] = useState(initialState);

  const handleCalculateAlk = ({ gallons, alkalinity }) => {
    const amountNeeded = calculateTotalAlkalinity(gallons, alkalinity);
    console.log(`amountNedded ${amountNeeded}`);
    const doesNeedAcid = alkalinity > 120;
    const quarts = amountNeeded > 32;

    const unit = !doesNeedAcid ? UNITS.pounds : quarts ? UNITS.quarts : UNITS.fluidOunce;

    // const unit = doesNeedAcid ? UNITS.fluidOunce : UNITS.pounds;

    const formattedResult = quarts ? `${amountNeeded / 32} ${unit}` : `${amountNeeded} ${unit}`;
    // const formattedResult = `${Math.abs(amountNeeded)} ${unit}`;
    setChemicalNeeded({
      chemical: doesNeedAcid ? CHEMICALS.acid.label : CHEMICALS.base.label,
      result: formattedResult,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleCalculateAlk}
      validationSchema={schema}
    >
      {({ handleChange, handleSubmit, dirty, isValid }) => (
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
              />
            </div>

            <div>
              <label htmlFor='alkalinity'>Current Alkalinity (in PPM): </label>
              <input
                type='number'
                name='alkalinity'
                onChange={handleChange}
                placeholder='Enter Alkalinity'
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
