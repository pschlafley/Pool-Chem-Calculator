import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import Form from '../../Form/Form';
import Input from '../../Form/Input';
import Button from '../../Form/Button';

import { calculateChlorine } from '../../../calculations/pool-chlorine';
import { LABELS, POOL_SHAPES } from '../../../constants';

const INPUTS = [
  {
    id: 'gallons',
    label: 'Pool Gallons',
    placeholder: 'Enter Gallons',
  },
  {
    id: 'freeChlor',
    label: 'Current Free Chlorine',
    placeholder: 'Enter a Number',
  },
  {
    id: 'totalChlor',
    label: 'Current Total Chlorine',
    placeholder: 'Enter a Number',
  },
  {
    id: 'chlorineType',
    label: 'Chlorine Type',
    placeholder: 'Select One',
    type: 'select',
    options: Object.keys(POOL_SHAPES).map(key => ({
      id: key,
      label: POOL_SHAPES[key],
    })),
  },
];

const initialValues = INPUTS.reduce(
  (obj, curr) => ({ ...obj, [curr.id]: '' }),
  {}
);

const schema = yup.object().shape(
  INPUTS.reduce(
    (obj, curr) => ({
      ...obj,
      [curr.id]: curr.type ? yup.string().required() : yup.number().required(),
    }),
    {}
  )
);

const ChlorineForm = () => {
  const [chlorineResult, setChlorineResult] = useState(null);

  // TODO - finish this handler to get the result
  const handleCalculateChlorine = (values, resetForm) => {
    console.log('submitted!');
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) =>
          handleCalculateChlorine(values, resetForm)
        }
      >
        {({ handleChange, handleSubmit, dirty, isValid, values }) => (
          <Form
            onFormSubmit={handleSubmit}
            header={LABELS.chlorineForm.header}
            result={chlorineResult}
            type={'chlorine'}
          >
            {INPUTS.map(({ id, label, placeholder, type, options }, i) => (
              <Input
                key={id}
                name={id}
                label={label}
                onInputChange={handleChange}
                placeholder={placeholder}
                value={values[id]}
                isFirstInput={i === 0}
                type={type}
                inputOptions={options}
              />
            ))}

            <Button
              label={LABELS.chlorineForm.button}
              isDisabled={!dirty || !isValid}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChlorineForm;
