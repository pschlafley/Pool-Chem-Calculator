import * as yup from 'yup';

export const INPUTS = [
  {
    id: 'username',
    label: 'Username',
    placeholder: 'Enter Username',
  },
  {
    id: 'password',
    label: 'Password',
    placeholder: 'Enter Password',
    type: 'password',
  },
  // only logging in with username currently, leaving commented out in case we change it later
  // {
  //   id: 'email',
  //   label: 'Email',
  //   placeholder: 'Enter Email',
  //   type: 'email',
  // },
];

export const initialValues = {
  username: '',
  password: '',
  // email: '',
};

export const schema = yup.object().shape({
  username: yup.string().trim().label(INPUTS[0].label).required(),
  password: yup.string().trim().label(INPUTS[1].label).required(),
  // email: yup
  //   .string()
  //   .email('Not a valid email.')
  //   .label(INPUTS[1].label)
  //   .trim()
  //   .required(),
});
