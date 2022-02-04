import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import Form from '../../Form/Form';
import Input from '../../Form/Input';
import Button from '../../Form/Button';

import { calculateTotalAlkalinity } from '../../../calculations/pool-alkalinity';
import { UNITS, CHEMICALS, FORM_VALUES } from '../../../constants';

const { header, placeholders, inputNames, inputLabels } = FORM_VALUES.alk;

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
          header={header}
          result={chemicalNeeded.result}
          type={chemicalNeeded.chemical}
        >
          {/* TODO - map through ALK_INPUT array to generate inputs */}
          <Input
            name={inputNames[0]}
            label={inputLabels[0]}
            placeholder={placeholders[0]}
            onInputChange={handleChange}
            value={values.gallons}
          />
          <Input
            name={inputNames[1]}
            label={inputLabels[1]}
            placeholder={placeholders[1]}
            onInputChange={handleChange}
            value={values.alkalinity}
          />

          <Button
            label={FORM_VALUES.buttons.calculate}
            isDisabled={!dirty || !isValid}
          />
        </Form>
      )}
    </Formik>
  );
};

export default AlkalinityForm;
