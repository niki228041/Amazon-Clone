import * as yup from 'yup';


export const registrationSchema = yup.object().shape({
    userName:yup.string().required(),
    firstName:yup.string().required(),
    lastName:yup.string().required(),
    email:yup.string().required().email(),
    password: yup.string().required('Required'),
    repeatPassword: yup.string()
      .required('Required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
})