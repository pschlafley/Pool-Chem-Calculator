import React, { Fragment } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import Form from '../Form/Form';
import Input from '../Form/Input';
import Button from '../Form/Button';

import { LABELS, INPUT_TYPES } from '../../constants';
import { CREATE_USER } from '../../graphql/mutations';
import { INPUTS, initialValues, schema } from './signUpConfig';
import Auth from '../../utils/auth';

import styles from './SignUp.module.css';

const SignUp = () => {
  const [createUser, { loading }] = useMutation(CREATE_USER);

  const navigate = useNavigate();

  const handleSignup = async values => {
    const { password, passwordConfirm } = values;

    if (password !== passwordConfirm) return;

    try {
      const { passwordConfirm, ...userValues } = values;

      const {
        data: {
          createUser: { user, token },
        },
      } = await createUser({
        variables: userValues,
      });

      Auth.login(token);

      if (user) return navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSignup}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        dirty,
        isValid,
        errors,
        touched,
      }) => (
        <Form
          onFormSubmit={handleSubmit}
          header={LABELS.signUpForm.header}
          autoComplete={false}
        >
          {INPUTS.map(({ id, label, placeholder, type }, i) => {
            const isFirstInput = i === 0;

            const hasError = !!errors[id] && !!touched[id];

            return (
              <Fragment key={id}>
                <Input
                  name={id}
                  label={label}
                  placeholder={placeholder}
                  onInputChange={handleChange}
                  isFirstInput={isFirstInput}
                  type={type || INPUT_TYPES.text}
                  className={!isFirstInput ? styles.input : ''}
                  value={values[id] || ''}
                  isRequired
                  onBlur={handleBlur}
                />
                {hasError && <p className={styles.error}>{errors[id]}</p>}
              </Fragment>
            );
          })}
          <Button
            label={LABELS.signUpForm.button}
            isDisabled={!dirty || !isValid || loading}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
