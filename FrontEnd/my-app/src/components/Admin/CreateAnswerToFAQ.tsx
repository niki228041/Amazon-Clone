import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik';
import { createAnswerToFAQSchema } from './Validation/CreateAnswerToFAQSchema';
import { apiFAQSlice } from '../../features/user/apiFAQSlice';
import { useNavigate, useParams } from 'react-router-dom';

export interface createAnswerToFAQ{
    title:string,
    description:string,
    frequentlyAskedQuestionId:number,
}

function CreateAnswerToFAQ() {

    const [createAnswerToFAQ,{}] = apiFAQSlice.useAddAnswerToFAQMutation();
    const params = useParams();

    const navigate = useNavigate();

    const formik = useFormik({
      initialValues: {
        title: '',
        description: ''
      },
      validationSchema:createAnswerToFAQSchema,
      onSubmit: values => {
        var request:createAnswerToFAQ={title:values.title,frequentlyAskedQuestionId:parseInt(params.faqId!),description:values.description};
        createAnswerToFAQ(request);

        navigate("/admin/FAQs");
      },
    });


    return (
    <div className='mx-auto w-10/12'>
        <form className='w-1/3  p-2 mx-auto' onSubmit={formik.handleSubmit}>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create FAQ
            </h2>

            <label>Title</label>
            <input
              id="title"
              name="title"
              autoComplete="title"
              required
              onChange={formik.handleChange}
              value={formik.values.title}
              className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {formik.errors.title ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.title}</div> : null}
            
            <div className='mt-5'>
              <label >Description</label>
              <input
                id="description"
                name="description"
                autoComplete="description"
                required
                onChange={formik.handleChange}
                value={formik.values.description}
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.errors.description ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.description}</div> : null}
            </div>
            

            <div className='mt-10'>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Create
              </button>
            </div>

        </form>
    </div>
  )
}


export default CreateAnswerToFAQ
