import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import Form from '../Form/Form';
import Input from '../Form/Input';
import Button from '../Form/Button';

import { LABELS, INPUT_TYPES } from '../../constants';

import styles from './SignUp.module.css';

const initialValues = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const schema = yup.object().shape({
  username: yup.string().trim().required(),
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  email: yup.string().email().trim().required(),
  password: yup.string().trim().required(),
  passwordConfirm: yup.string().trim().required(),
});

const INPUTS = [
  {
    id: 'username',
    label: 'Username:',
    placeholder: 'Enter Username',
  },
  {
    id: 'firstName',
    label: 'First Name:',
    placeholder: 'Enter First Name',
  },
  {
    id: 'lastName',
    label: 'Last Name:',
    placeholder: 'Enter Last Name',
  },
  {
    id: 'email',
    label: 'Email:',
    placeholder: 'Enter Email',
    type: 'email',
  },
  {
    id: 'password',
    label: 'Password:',
    placeholder: 'Enter Password',
    type: 'password',
  },
  {
    id: 'passwordConfirm',
    label: 'Confirm Password:',
    placeholder: 'Enter Password',
    type: 'password',
  },
];

const SignUp = () => {
  // TODO - add mututation

  const handleSignup = (values, { resetForm }) => {
    console.log(values);

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSignup}
    >
      {({ handleChange, handleSubmit, values, dirty, isValid }) => (
        <Form
          onFormSubmit={handleSubmit}
          header={LABELS.signUpForm.header}
          autoComplete={false}
        >
          {INPUTS.map(({ id, label, placeholder, type }, i) => {
            const isFirstInput = i === 0;

            return (
              <Input
                key={id}
                name={id}
                label={label}
                placeholder={placeholder}
                onInputChange={handleChange}
                isFirstInput={isFirstInput}
                type={type || INPUT_TYPES.text}
                className={!isFirstInput ? styles.input : ''}
                value={values[id] || ''}
                isRequired
              />
            );
          })}
          <Button
            label={LABELS.signUpForm.button}
            isDisabled={!dirty || !isValid}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
