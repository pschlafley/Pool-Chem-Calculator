import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import Form from '../../Form/Form';
import Input from '../../Form/Input';
import Button from '../../Form/Button';

import { calculatePoolSalt } from '../../../calculations/pool-salt';
import { CHEMICALS, LABELS } from '../../../constants';

const initialValues = {
  gallons: '',
  salt: '',
};

const schema = yup.object().shape({
  gallons: yup.number().required(),
  salt: yup.number().required(),
});

const INPUTS = [
  { id: 'gallons', label: 'Pool Gallons:', placeholder: 'Enter Gallons' },
  {
    id: 'salt',
    label: 'Current Salt:',
    placeholder: 'Enter Current Salt',
  },
];

const SaltForm = () => {
  const [saltNeeded, setSaltNeeded] = useState(null);
  const result =
    saltNeeded !== null ? `${saltNeeded} ${CHEMICALS.salt.unit}` : '';

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
        <Form
          onFormSubmit={handleSubmit}
          header={LABELS.saltForm.header}
          result={result}
          type={CHEMICALS.salt.label}
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
            label={LABELS.saltForm.button}
            isDisabled={!dirty || !isValid}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SaltForm;
