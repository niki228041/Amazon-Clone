import * as yup from 'yup';

export const createProductSchema = yup.object().shape({
    name:yup.string().required(),
    isInTheStock:yup.boolean().required(),
    price:yup.number().required(),

    discount:yup.number().min(0, 'Discount must be at least 0').max(100, 'Discount cannot exceed 100').required(),
    quantity:yup.number().required(),
    numberOfDaysForDelivery:yup.number().required(),
    address:yup.string().required(),

})



