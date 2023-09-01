import React, { useState } from 'react'
import circle from '../../images/black-circle.png';
import Calendar from '../../images/Calendar.svg';
import SharpArrowRight from '../../images/SharpArrowRight.svg';
import WhitePlus from '../../images/WhitePlus.svg';
import BlankProfilePicture from '../../images/blankProfilePicture.webp';
import arrowRight from '../../images/ArrowRightS.svg';

import classNames from 'classnames';

const EditProfile=()=> {
   const [dropDownSex,setDropDownSex] =  useState(false);
   const [dropDownCountry,setDropDownCountry] =  useState(false);

   const [selectedSex,setSelectedSex] =  useState("Стать");
   const [selectedCountry,setSelectedCountry] =  useState("Країна");


  return (
    <div >

        <div className=' mb-20 '>
            <div className='my-8 flex text-[30px] text-grayColorForHeader font-semibold mb-2'>Особисті дані</div>

            <div className='flex '>
                <img className='h-32 w-32 mr-6 rounded-lg' src={BlankProfilePicture} />
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 w-1/4' placeholder='Ім`я користувача' />
            </div>

            <div className='my-8 flex text-[20px] text-grayColorForHeader font-semibold mb-2'>Персональна інформація</div>
            <div className='grid grid-cols-3 gap-5 my-8'>
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Ім`я' />
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Прізвище' />
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='По‑батькові' />
            </div>
            <div className='grid grid-cols-3 gap-5 my-8'>
                <div className=' relative h-10 flex justify-end select-none'>
                    <img className={classNames(' absolute mr-3 self-center transition-all',{" rotate-90":dropDownSex})} onClick={()=>setDropDownSex(!dropDownSex)} src={SharpArrowRight} />
                    <div className='flex h-10 w-full self-center rounded-lg border border-gray-400 outline-0 px-4 ' onClick={()=>setDropDownSex(!dropDownSex)} placeholder='Стать'>
                        <span className=' self-center text-grayForText'>{selectedSex}</span>
                    </div>
                    

                    <div className={classNames('w-full mt-1 max-h-[200px] overflow-y-auto transition-all absolute translate-y-10 overflow-hidden rounded-sm border bg-white border-optionsGrayForBorder ',{
                    " opacity-100 ": dropDownSex,
                    " scale-y-0 " : !dropDownSex
                    })} style={{transformOrigin:" top center"}} >
                        <div className=' '>
                          <button onClick={()=>{setDropDownSex(false);setSelectedSex("Чоловік")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>Чоловік</span>
                          </button>
                        </div>
                        <hr/>
                        <div className=' '>
                          <button onClick={()=>{setDropDownSex(false);setSelectedSex("Жінка")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>Жінка</span>
                          </button>
                        </div>
                        <hr/>
                        <div className=' '>
                          <button onClick={()=>{setDropDownSex(false);setSelectedSex("Інше")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>Інше</span>
                          </button>
                        </div>
                        
                    </div>

                </div>

                
                <div className=' relative h-10 flex justify-end'>
                    <img className=' absolute self-center mr-3' src={Calendar} />
                    <input className='flex h-10 w-full self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Дата народження' />
                </div>
            </div>

            <div className='my-8 flex text-[20px] text-grayColorForHeader font-semibold mb-2'>Контактні дані</div>
            <div className='grid grid-cols-3 gap-5 my-8'>
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Номер ' />
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Email' />
            </div>

            <div className='my-8 flex text-[20px] text-grayColorForHeader font-semibold mb-2'>Адреса доставки</div>
            <div className='grid grid-cols-3 gap-5 my-8'>


                <div className=' relative h-10 flex justify-end select-none'>
                    <img className={classNames(' absolute mr-3 self-center transition-all',{" rotate-90":dropDownCountry})} onClick={()=>setDropDownCountry(!dropDownCountry)} src={SharpArrowRight} />
                    <div className='flex h-10 w-full self-center rounded-lg border border-gray-400 outline-0 px-4 ' onClick={()=>setDropDownCountry(!dropDownCountry)} placeholder='Країна'>
                        <span className=' self-center text-grayForText'>{selectedCountry}</span>
                    </div>
                    

                    <div className={classNames('w-full mt-1 max-h-[200px] overflow-y-auto transition-all absolute translate-y-10 overflow-hidden rounded-sm border bg-white border-optionsGrayForBorder ',{
                    " opacity-100 ": dropDownCountry,
                    " scale-y-0 " : !dropDownCountry
                    })} style={{transformOrigin:" top center"}} >
                        <div className=' '>
                          <button onClick={()=>{setDropDownCountry(false);setSelectedCountry("Китай")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>Китай</span>
                          </button>
                        </div>
                        <hr/>
                        <div className=' '>
                          <button onClick={()=>{setDropDownCountry(false);setSelectedCountry("Нижний Новгород")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>Нижний Новгород</span>
                          </button>
                        </div>
                        <hr/>
                        <div className=' '>
                          <button onClick={()=>{setDropDownCountry(false);setSelectedCountry("CCCР")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>CCCР</span>
                          </button>
                        </div>
                        <hr/>
                        <div className=' '>
                          <button onClick={()=>{setDropDownCountry(false);setSelectedCountry("Америка")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>Америка</span>
                          </button>
                        </div>
                        <hr/>
                        <div className=' '>
                          <button onClick={()=>{setDropDownCountry(false);setSelectedCountry("Ерусалим")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>Ерусалим</span>
                          </button>
                        </div>
                        
                    </div>

                </div>

                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Місто ' />
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Вулиця' />
            </div>

            <div className='grid grid-cols-3 gap-5 my-8'>
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Номер будинку/квартири ' />
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Номер відділення ' />
            </div>
            
            <div className=' bg-mainYellowColor rounded-full h-20 w-20 mt-10 m-auto flex justify-center hover:scale-110 active:scale-90 transition-all duration-100'>
                <img className=' self-center h-10' src={WhitePlus} />
            </div>

        </div>

    </div>
  )
}

export default EditProfile