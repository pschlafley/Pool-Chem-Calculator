import React, { useReducer } from 'react';
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
  value: null,
};

const RESULT_MESSAGES = {
  granular: {
    start: 'You should add',
    end: 'lbs of solid chlorine shock to your pool.',
    subMessage:
      'You may need to add more bags of shock if your pool has a lot of algae!',
  },
  liquid: {
    start: 'You should add',
    end: 'gallons of liquid chlorine shock you to your pool.',
  },
  oxidixing: {
    // Non-Chlorine shock - oxidizing shock
    start: 'You should add',
    end: 'lbs of non chlorine oxidizing shock to your pool.',
  },
};

// chlorineResult action types
const SET_NC_SHOCK_VALUE = 'SET_NC_SHOCK_VALUE';
const SET_GRANULAR_VALUE = 'SET_GRANULAR_VALUE';
const SET_LIQUID_VALUE = 'SET_TYPES_VALUE';
const RESET_RESULT = 'RESET_RESULT';

const CHLORINE_ACTION_TYPES = {
  granular: SET_GRANULAR_VALUE,
  liquid: SET_LIQUID_VALUE,
};

// chlorineResult reducer
const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_NC_SHOCK_VALUE:
      return { message: RESULT_MESSAGES.oxidixing, value: payload.value };
    case SET_GRANULAR_VALUE:
      return { message: RESULT_MESSAGES.granular, value: payload.value };
    case SET_LIQUID_VALUE:
      return { message: RESULT_MESSAGES.liquid, value: payload.value };
    case RESET_RESULT:
      return { message: null, value: null };
    default:
      return state;
  }
};

const ChlorineForm = () => {
  const [chlorineResult, dispatch] = useReducer(reducer, initialResultState);

  const getResultMessage = (message, value) => {
    return !message || value === null
      ? null
      : `${message?.start} ${value} ${message?.end}`;
  };

  const result = getResultMessage(
    chlorineResult?.message,
    chlorineResult?.value
  );

  const handleCalculateChlorine = (values, resetForm) => {
    const { gallons, freeChlor, totalChlor, chlorineType } = values;

    const combinedChlorine = totalChlor - freeChlor;

    const value = calculateChlorine(
      freeChlor,
      totalChlor,
      gallons,
      chlorineType
    );
    console.log('value:', value);

    if (combinedChlorine >= 1) {
      dispatch({
        type: SET_NC_SHOCK_VALUE,
        payload: { value },
      });
      return;
    }

    dispatch({
      type: CHLORINE_ACTION_TYPES[chlorineType],
      payload: { value },
    });

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
            result={result}
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
