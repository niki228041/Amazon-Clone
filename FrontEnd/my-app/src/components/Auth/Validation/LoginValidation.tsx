import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email:yup.string().required("Ввідіть емайл.").email("Емайл не коректний."),
    password:yup.string().required("Ввідіть пароль."),
})



