import * as yup from 'yup';

export const createAnswerToFAQSchema = yup.object().shape({
    title:yup.string().required("Title is requiered!!!!"),
    description:yup.string().required("Title is requiered!!!!"),
})

