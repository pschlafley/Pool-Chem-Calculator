import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import Form from '../../Form/Form';
import Input from '../../Form/Input';
import Button from '../../Form/Button';

import { calculateTotalAlkalinity } from '../../../calculations/pool-alkalinity';
import { UNITS, CHEMICALS, LABELS } from '../../../constants';

const initialState = {
  chemical: null,
  result: null,
};

const initialValues = {
  gallons: '',
  alkalinity: '', // measured in PPM
};

const schema = yup.object().shape({
  gallons: yup.number().required(),
  alkalinity: yup.number().required(),
});

const INPUTS = [
  { id: 'gallons', label: 'Pool Gallons:', placeholder: 'Enter Gallons' },
  {
    id: 'alkalinity',
    label: 'Current Alkalinity (in PPM):',
    placeholder: 'Enter Alkalinity',
  },
];

const AlkalinityForm = () => {
  const [chemicalNeeded, setChemicalNeeded] = useState(initialState);

  const handleCalculateAlk = ({ gallons, alkalinity }, resetForm) => {
    const amountNeeded = calculateTotalAlkalinity(gallons, alkalinity);
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
      validationSchema={schema}
      onSubmit={(values, { resetForm }) =>
        handleCalculateAlk(values, resetForm)
      }
    >
      {({ handleChange, handleSubmit, dirty, isValid, values }) => (
        <Form
          onFormSubmit={handleSubmit}
          header={LABELS.alkForm.header}
          result={chemicalNeeded.result}
          type={chemicalNeeded.chemical}
        >
          {INPUTS.map(({ id, label, placeholder }) => (
            <Input
              key={id}
              name={id}
              label={label}
              placeholder={placeholder}
              value={values[id]}
              onInputChange={handleChange}
            />
          ))}

          <Button
            label={LABELS.alkForm.button}
            isDisabled={!dirty || !isValid}
          />
        </Form>
      )}
    </Formik>
  );
};

export default AlkalinityForm;
