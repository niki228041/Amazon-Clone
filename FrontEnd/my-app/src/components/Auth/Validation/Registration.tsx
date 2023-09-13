import * as yup from 'yup';


export const registrationSchema = yup.object().shape({
    displayName:yup.string().required("Юзер нейм користувача є обов'язковим."),
    firstName:yup.string().required("Ім'я є обов'язковим."),
    lastName:yup.string().required("Прізвище є обов'язковим."),
    email:yup.string().required("Емайл не може бути пустим.").email("Некоректний емайл."),
    password: yup.string().required('Пароль не може бути пустим.'),
    repeatPassword: yup.string()
      .required('Повторний пароль не може бути пустим.')
      .oneOf([yup.ref('password')], 'Паролі повинні співпадати.'),
})