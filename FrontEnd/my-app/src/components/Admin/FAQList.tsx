import React from 'react'
import { apiFAQSlice, useGetFAQsQuery } from '../../features/user/apiFAQSlice'
import { Link } from 'react-router-dom';


export interface FAQ{
  id:number,
  title:string,
  answerFAQ:answerFAQ[]
}

export interface answerFAQ{
  id:number,
  title:string,
  description: string
}


function FAQList() {


  var {data:faqs}:{data:{payload:FAQ[]}} = useGetFAQsQuery();
  var [deleteFAQAnswer,{}] = apiFAQSlice.useDeleteAnswerFAQMutation();

  var [deleteFAQById,{}] = apiFAQSlice.useDeleteFAQByIdMutation();

  

  return (
    <div className='mt-4 mr-4'>
        {faqs?.payload.map((faq)=>{
          return<>
          
          <div className=' bg-slate-100 my-2 border p-2 rounded-lg flex justify-between'>
            <div className='flex'>
              <div className=' w-48'>
                <span className=' text-lg mr-10'>{faq.title}</span>
              </div>


              <div className='  w-2/3 '>
                {faq.answerFAQ.map((answer,index)=>{
                  return<>

                  <div className='p-1 mt-2  ' onClick={()=>{deleteFAQAnswer({id:answer.id})}} >
                    <div className='flex'>
                      <span className='mr-2'>{index+1}</span>
                      <div className=' font-semibold'>{answer.title}</div>
                    </div>
                    <div className='text-sm '>{answer.description}</div>
                    <div className='flex'>
                      <div className='text-sm border bg-red-500 rounded-lg flex justify-center cursor-pointer text-white font-semibold hover:scale-105 px-4'>Delete</div>
                    </div>
                  </div>

                  </>
                })}
              </div>

            </div>

            <div className='flex self-start'>
              <Link to={"/admin/create/createAnswerToFAQ/"+faq.id} className=' flex mr-2 '>
                <div className=' w-full border shadow-xl whitespace-nowrap rounded-lg py-1 px-5 cursor-pointer text-sm flex-nowrap flex bg-green-500 text-white self-center hover:scale-105'>
                  Create new answer
                </div>
              </Link>
              <div onClick={()=>{deleteFAQById({id:faq.id})}} className=' w-full border shadow-xl whitespace-nowrap rounded-lg py-1 px-5 cursor-pointer text-sm flex-nowrap flex bg-red-500 text-white self-center hover:scale-105'>
                Delete
              </div>
            </div>
          </div>

          </>
        })}
    </div>
  )
}

export default FAQList