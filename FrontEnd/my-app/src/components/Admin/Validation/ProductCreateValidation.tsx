import * as yup from 'yup';

export const createProductSchema = yup.object().shape({
    name:yup.string().required(),
    isInTheStock:yup.boolean().required(),
    price:yup.number().required(),

    discount:yup.number().required(),
    description:yup.string().required(),
    quantity:yup.number().required(),
    numberOfDaysForDelivery:yup.number().required(),
    address:yup.string().required(),

})



