import * as yup from 'yup';

export const editProfileSchema = yup.object().shape({

    displayName:yup.string().required("Ім'я користувача обов'язкове"),
    firstName:yup.string().required("Ім'я обов'язкове"),
    lastName:yup.string().required("Прізвище користувача обов'язкове"),
    phoneNumber:yup.number(),
})

