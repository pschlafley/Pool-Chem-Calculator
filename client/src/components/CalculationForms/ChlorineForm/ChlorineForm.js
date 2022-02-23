import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import Form from '../../Form/Form';
import Input from '../../Form/Input';
import Button from '../../Form/Button';

import { calculateChlorine } from '../../../calculations/pool-chlorine';
import { LABELS, CHLORINE_TYPES } from '../../../constants';

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
    options: Object.keys(CHLORINE_TYPES).map(key => ({
      id: key,
      label: CHLORINE_TYPES[key],
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

const initialResultState = {
  message: null,
  type: null,
};

const RESULT_MESSAGES = {
  granular: {
    start: 'You should add',
    end: 'lbs of non chlorine shock to your pool.',
    subMessage:
      'You may need to add more bags of shock if your pool has a lot of algae!',
  },
  liquid: {
    start: 'You should add',
    end: 'gallons of chlorine shock you to your pool.',
  },
};

const ChlorineForm = () => {
  const [chlorineResult, setChlorineResult] = useState(initialResultState);
  console.log('chlorineResult:', chlorineResult);

  const getResultMessage = (type, value) => {
    return ` ${RESULT_MESSAGES[type].start} ${value} ${RESULT_MESSAGES[type].end}`;
  };

  // TODO - determine which chlorine type and set that in chlorineResult
  const handleCalculateChlorine = (values, resetForm) => {
    const { gallons, freeChlor, totalChlor, chlorineType } = values;
    const calculationValue = calculateChlorine(
      freeChlor,
      totalChlor,
      gallons,
      chlorineType
    );
    const message = getResultMessage(chlorineType, calculationValue);
    setChlorineResult({ ...chlorineResult, message });
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
            result={chlorineResult.message}
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
