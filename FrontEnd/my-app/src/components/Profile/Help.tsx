import React, { useEffect, useState } from 'react'
import Fura from "../../images/Fura.svg"
import Premium from "../../images/Premium.svg"
import PaymentAndDeals from "../../images/PaymentAndDeals.svg"
import Security from "../../images/Security.svg"
import PlaylistCheck from "../../images/playlistCheck.svg"
import Gadget from "../../images/Gadgets.svg"
import PlayPlus from "../../images/PlayPlus.svg"
import fluentAccessibilityCheckmark from "../../images/fluentAccessibilityCheckmark.svg"
import question from "../../images/question.svg"
import loginYellowIcon from "../../images/LoginYellowIcon.svg"
import chatErrorOutline from "../../images/chatErrorOutline.svg"
import search from "../../images/searchLittleBlue.svg"
import classNames from 'classnames'
import { FAQ } from '../Admin/FAQList'
import { useGetFAQsQuery } from '../../features/user/apiFAQSlice'


function Help() {


   const {data:faqs}:{data:{payload:FAQ[]}} = useGetFAQsQuery();

   const [selectedQuestion,setSelectedQuestion]=  useState<FAQ>();

   useEffect(()=>{
    if(faqs)
        setSelectedQuestion(faqs?.payload[0]);
   },[faqs])

   function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }


  return (
    <div className=' bg-darkBlueColor'>
        <div className=' w-11/12 text-white mx-auto shadow-xl'>
            <div className='flex py-3'>
                <div className=' font-semibold cursor-pointer'>
                    Обслуовування клієнтів 
                </div>

                <div className='h-6 w-[1px] mx-5 bg-white'></div>

                <div className=' font-semibold cursor-pointer'>
                    Головна 
                </div>

                <div className='h-6 w-[1px] mx-5 bg-white'></div>

                <div className=' font-semibold cursor-pointer'>
                    Цифрові послуги та підтримка пристроїв
                </div>
            </div>
            

            
        </div>

        <div className='w-10/12 mx-auto text-white mt-10 pb-16'>
            <div className=' text-[33px] font-semibold'>Ласкаво просимо до служби підтримки клієнтів AllMart!</div>
            <div className=' text-[18px] text-grayColorForBorder my-5'>З чим Вам потрібна допомога сьогодні? Ви можете швидко подбати про більшість справ тут або зв’язатися з нами, коли це необхідно.</div>
            <div className=' grid-cols-3 grid gap-3 gap-y-6'>
                <div className=' bg-white p-2 rounded-sm text-black flex py-4 hover:bg-grayColorForBorder cursor-pointer' onClick={()=>scrollToBottom()} >
                    <img className='h-16 self-center ml-7' src={Fura} />
                    <div className=' self-center ml-8 font-medium h-16 flex'>
                        <span className=' self-center' >Доставка та повернення</span>
                    </div>
                </div>
                <div className=' bg-white p-2 rounded-sm text-black flex py-4 hover:bg-grayColorForBorder cursor-pointer' onClick={()=>scrollToBottom()} >
                    <img className='h-12 self-center ml-7' src={Premium} />
                    <div className=' self-center ml-8 font-medium h-16 flex'>
                        <span className=' self-center'>Преміум</span>
                    </div>
                </div>
                <div className=' bg-white p-2 rounded-sm text-black flex py-4 hover:bg-grayColorForBorder cursor-pointer' onClick={()=>scrollToBottom()} >
                    <img className=' self-center h-10 ml-7' src={PaymentAndDeals} />
                    <div className=' self-center ml-8 font-medium h-16 flex'>
                        <span className=' self-center'>Оплата та подарункові картки</span>
                    </div>
                </div>
                <div className=' bg-white p-2 rounded-sm text-black flex py-4 hover:bg-grayColorForBorder cursor-pointer' onClick={()=>scrollToBottom()} >
                    <img className=' self-center h-16 ml-7' src={Security} />
                    <div className=' self-center ml-8 font-medium h-16 flex w-1/3'>
                        <span className=' self-center'>Адреса, безпека та приватність</span>
                    </div>
                </div>
                <div className=' bg-white p-2 rounded-sm text-black flex py-4 hover:bg-grayColorForBorder cursor-pointer' onClick={()=>scrollToBottom()} >
                    <img className=' self-center h-16 ml-7' src={PlaylistCheck} />
                    <div className=' self-center ml-8 font-medium h-16 flex  w-1/3'>
                        <span className=' self-center'>Членство, підписка та коммунікація </span>
                    </div>
                </div>
                <div className=' bg-white p-2 rounded-sm text-black flex py-4 hover:bg-grayColorForBorder cursor-pointer' onClick={()=>scrollToBottom()} >
                    <img className=' self-center h-12 ml-7' src={Gadget} />
                    <div className=' self-center ml-8 font-medium h-16 flex  w-1/3'>
                        <span className=' self-center'>Підтримка пристроїв</span>
                    </div>
                </div>
                <div className=' bg-white p-2 rounded-sm text-black flex py-4 hover:bg-grayColorForBorder cursor-pointer' onClick={()=>scrollToBottom()} >
                    <img className=' self-center h-14 ml-7' src={PlayPlus} />
                    <div className=' self-center ml-8 font-medium h-16 flex '>
                        <span className=' self-center'>Преміум відео та музика</span>
                    </div>
                </div>
                <div className=' bg-white p-2 rounded-sm text-black flex py-4 hover:bg-grayColorForBorder cursor-pointer' onClick={()=>scrollToBottom()} >
                    <img className=' self-center h-14 ml-7' src={fluentAccessibilityCheckmark} />
                    <div className=' self-center ml-8 font-medium h-16 flex '>
                        <span className=' self-center'>Доступність</span>
                    </div>
                </div>
                <div className=' bg-white p-2 rounded-sm text-black flex py-4 hover:bg-grayColorForBorder cursor-pointer' onClick={()=>scrollToBottom()} >
                    <img className=' self-center h-14 ml-7' src={question} />
                    <div className=' self-center ml-8 font-medium h-16 flex '>
                        <span className=' self-center'>Інше </span>
                    </div>
                </div>
                <div className=' bg-white p-2 rounded-sm text-black flex py-4 hover:bg-grayColorForBorder cursor-pointer' onClick={()=>scrollToBottom()} >
                    <img className=' self-center h-14 ml-7' src={loginYellowIcon} />
                    <div className=' self-center ml-8 font-medium h-16 flex '>
                        <span className=' self-center'>Логін та пароль</span>
                    </div>
                </div>
                <div className=' bg-white p-2 rounded-sm text-black flex py-4 hover:bg-grayColorForBorder cursor-pointer' onClick={()=>scrollToBottom()} >
                    <img className=' self-center h-14 ml-7' src={chatErrorOutline} />
                    <div className=' self-center ml-8 font-medium h-16 flex '>
                        <span className=' self-center'>Повідомити про помилку </span>
                    </div>
                </div>
                
                
                
            </div>

            
        </div>

        <div className=' bg-white pt-10'>
            <div className='w-10/12 mx-auto'>
                <div className=' text-[28px] font-semibold'>Пошук у довідковій бібліотеці</div>
                
                <div className='relative flex mt-4'>
                    <img src={search} className='h-4 absolute self-center ml-3' />
                    <input className=' outline-0 border border-darkBlueColor py-1 rounded-sm pl-9 pr-2 w-full text-sm' placeholder='Напишіть ваше питання наприклад, “повернення товару”' />
                </div>
               
                <div className=' text-[28px] font-semibold mt-8'>Всі довідкові розділи</div>
                <div className='min-h-[400px]'>
                    <div className=' grid grid-cols-5 gap-4 mt-2 '>
                        <div>
                            {
                              faqs?.payload.map((faq)=>{
                                  return<>
                                      <div onClick={()=>setSelectedQuestion(faq)} className={classNames('  text-black  py-2 px-4 rounded-lg cursor-pointer mb-1 transition-all',{"bg-darkBlueColor text-white":selectedQuestion?.id==faq.id})}>
                                          <div className={classNames(' text-lg pl-2 font-semibold')}>{faq.title}</div>
                                      </div>
                                  </>
                              })
                            }
                        </div>

                        <div className='col-span-4 grid grid-cols-2 gap-5 mb-10 cursor-pointer'>
                          {selectedQuestion?.answerFAQ.map((answerTofaq) => {
                            return (
                              <div className='relative flex w-full' key={answerTofaq.id}>
                                {/* Column with text overlay */}
                                <div className='p-3 px-6 border transition-all w-full'>
                                  {/* Overlay text */}
                                  <div className='absolute inset-0 flex flex-col items-center self-center justify-center  bg-gray-600 text-white opacity-0 hover:opacity-100 transition-opacity'>
                                    <p className='font-medium self-center justify-center flex'>{answerTofaq.title}</p>
                                    <div className='flex w-5/6 '>
                                        <span className='text-sm self-center justify-center flex'>{answerTofaq.description}</span>
                                    </div>

                                  </div>
                                  {/* Content */}
                                  <p className='font-medium'>{answerTofaq.title}</p>
                                  <span className='text-sm'>{answerTofaq.description}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      
                      
                    </div>
                </div>
                
               
            </div>
        </div>
        

    </div>
  )
}

export default Help