import React, { Fragment } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import Form from '../Form/Form.js';
import Input from '../Form/Input.js';
import Button from '../Form/Button.js';

import { LABELS, INPUT_TYPES } from '../../constants.js';
import { CREATE_USER } from '../../graphql/mutations.js';
import { INPUTS, initialValues, schema } from './registerConfig.js';
import Auth from '../../utils/auth.js';

import styles from '../Form/Form.module.css';

const Register = () => {
  const [createUser, { loading }] = useMutation(CREATE_USER);

  const navigate = useNavigate();

  const handleRegister = async values => {
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
      onSubmit={handleRegister}
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
          header={LABELS.registerForm.header}
          autoComplete={false}
        >
          {INPUTS.map(({ id, label, placeholder, type }, i) => {
            const isFirstInput = i === 0;
            const hasError = errors[id] && touched[id];

            return (
              <Fragment key={id}>
                <Input
                  name={id}
                  label={label}
                  placeholder={placeholder}
                  onInputChange={handleChange}
                  isFirstInput={isFirstInput}
                  type={type || INPUT_TYPES.text}
                  className={!isFirstInput ? styles.firstInput : ''}
                  value={values[id] || ''}
                  isRequired
                  onBlur={handleBlur}
                />
                {hasError && <p className={styles.error}>{errors[id]}</p>}
              </Fragment>
            );
          })}
          <Button
            label={LABELS.registerForm.button}
            isDisabled={!dirty || !isValid || loading}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Register;
