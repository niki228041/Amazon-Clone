import * as yup from 'yup';

export const createFAQSchema = yup.object().shape({
    title:yup.string().required("Title is requiered!!!!"),
})

