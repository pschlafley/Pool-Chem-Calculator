import * as yup from 'yup';

export const INPUTS = [
  {
    id: 'username',
    label: 'Username',
    placeholder: 'Enter Username',
  },
  {
    id: 'firstName',
    label: 'First Name',
    placeholder: 'Enter First Name',
  },
  {
    id: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter Last Name',
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'Enter Email',
    type: 'email',
  },
  {
    id: 'password',
    label: 'Password',
    placeholder: 'Enter Password',
    type: 'password',
  },
  {
    id: 'passwordConfirm',
    label: 'Confirm Password',
    placeholder: 'Enter Password',
    type: 'password',
  },
];

export const initialValues = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

export const schema = yup.object().shape({
  username: yup.string().trim().label(INPUTS[0].label).required(),
  firstName: yup.string().trim().label(INPUTS[1].label).required(),
  lastName: yup.string().trim().label(INPUTS[2].label).required(),
  email: yup
    .string()
    .email('Not a valid email.')
    .label(INPUTS[3].label)
    .trim()
    .required(),
  password: yup.string().trim().label(INPUTS[4].label).required(),
  passwordConfirm: yup
    .string()
    .trim()
    .label(INPUTS[5].label)
    .required()
    .test(
      'is-match',
      'Passwords do not match.',
      (val, context) => val === context.parent.password
    ),
});
