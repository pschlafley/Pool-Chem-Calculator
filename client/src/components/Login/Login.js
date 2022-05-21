import React, { Fragment } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import Form from '../Form/Form';
import Input from '../Form/Input';
import Button from '../Form/Button';
import ButtonLink from '../ButtonLink/ButtonLink';

import { LABELS, INPUT_TYPES, ROUTES } from '../../constants';
import { INPUTS, initialValues, schema } from './loginConfig';

import { LOGIN_USER } from '../../graphql/mutations';
import Auth from '../../utils/auth';

import styles from '../Form/Form.module.css';
import loginStyles from './Login.module.css';

const Login = () => {
  const [login, { loading }] = useMutation(LOGIN_USER);

  const navigate = useNavigate();

  const handleLogin = async ({ username, password }) => {
    try {
      const {
        data: {
          login: { user, token },
        },
      } = await login({ variables: { username, password } });

      Auth.login(token);

      if (user) return navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleLogin}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          dirty,
          touched,
          isValid,
          errors,
        }) => (
          <Form
            onFormSubmit={handleSubmit}
            header={LABELS.loginForm.header}
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
                    errors={errors}
                  />
                  {hasError && <p className={styles.error}>{errors[id]}</p>}
                </Fragment>
              );
            })}
            <Button
              label={LABELS.loginForm.button}
              isDisabled={!dirty || !isValid || loading}
            />
          </Form>
        )}
      </Formik>
      <section className={loginStyles.register}>
        <h3>{LABELS.loginForm.notRegistered}</h3>
        <ButtonLink to={ROUTES.register} label={LABELS.registerForm.header} />
      </section>
    </>
  );
};

export default Login;
