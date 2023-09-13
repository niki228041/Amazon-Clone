import React, { useState } from 'react'
import circle from '../../images/black-circle.png';
import Calendar from '../../images/Calendar.svg';
import SharpArrowRight from '../../images/SharpArrowRight.svg';
import WhitePlus from '../../images/WhitePlus.svg';
import BlankProfilePicture from '../../images/blankProfilePicture.webp';
import arrowRight from '../../images/ArrowRightS.svg';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.module.css'

import classNames from 'classnames';
import { parseISO ,format} from 'date-fns';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { apiAddressSlice, useGetAddressByUserIdQuery } from '../../features/user/apiAddressSlice';
import { Address } from '../types';
import { setAddressModalWindow } from '../../features/user/modalWindowsStateSlice';

const EditProfile=()=> {
   const [dropDownSex,setDropDownSex] =  useState(false);
   const [dropDownCountry,setDropDownCountry] =  useState(false);
   const [selectedDate,setSelectedDate] =  useState<Date|null>(null);

   var user = useAppSelector(((state)=>state.user.user));
   var dispatch = useDispatch();
 
   var {data:address,isSuccess}:{data:Address,isSuccess:boolean}  = useGetAddressByUserIdQuery({id:user.id});
 
   const [deleteAddress,{}]= apiAddressSlice.useDeleteAddressMutation();
 
   const handleDeleteAddress=()=>{
     deleteAddress({id:user.id});
   }

   const [selectedSex,setSelectedSex] =  useState("Стать");
   const [selectedCountry,setSelectedCountry] =  useState("Країна");

   function formatDateDifference(date: Date) {
    if(date)
    {
      const difference = format(date, 'dd.MM.yyyy');
      return difference;
    }
    else
    {
      return "";
    }
  }

  return (
    <div >

        <div className=' mb-20 '>
            <div className='mb-8 flex text-[30px] text-grayColorForHeader font-semibold'>Особисті дані</div>

            <div className='flex '>
                <img className='h-32 w-32 mr-6 rounded-lg' src={BlankProfilePicture} />
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 w-1/4' placeholder='Ім`я користувача' />
            </div>

            <div className='my-8 flex text-[20px] text-grayColorForHeader font-semibold mb-2'>Персональна інформація</div>
            <div className='grid grid-cols-3 gap-5 my-8'>
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 '  value={user.name} />
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' value={user.surname} />
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

                
                
                <div className=' h-10 '>
                  <div className=' flex justify-end z-20'>
                    <div className='flex absolute justify-end h-10   ' >
                      <img className=' self-center mr-3 flex justify-end' src={Calendar} />
                    </div>
                    <label htmlFor='datePicker' className='z-20 w-full cursor-pointer flex h-10 self-center bg-transparent outline-0 px-4 border rounded-lg border-gray-400 ' >
                      <span className=' self-center'>
                      {formatDateDifference(selectedDate!)}
                      </span>
                    </label>
                  </div>
                  <div className=' relative mt-[-23px] ml-3  z-10'>
                    <DatePicker id='datePicker' name='datePicker' selected={selectedDate} onChange={(date)=>setSelectedDate(date!)} className=' hidden z-10' />
                  </div>
                  

                  {/* <input className='flex h-10 w-full self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Дата народження' /> */}

                </div>

            </div>

            <div className='my-8 flex text-[20px] text-grayColorForHeader font-semibold mb-2'>Контактні дані</div>
            <div className='grid grid-cols-3 gap-5 my-8'>
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Номер ' />
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' value={user.email} />
            </div>

            <div className='my-8 flex text-[20px] text-grayColorForHeader font-semibold mb-2'>Адреса доставки</div>
            
            <div className=''>
                <div className='border flex select-none p-1 mt-1 w-1/6'>
                  {address?
                  <>{address?.fullName} {address?.country} {address?"/":""} {address?.city} </> 
                  :"Ви ще не додали адресу"}
                </div>
                <div>
                    {address != undefined ? <span className=" text-sm">Is this not your address anymore? <span onClick={()=>handleDeleteAddress()} className=" text-black font-medium hover:text-red-500 select-none cursor-pointer">delete</span></span>:""}
                </div>
            </div>

            <div>
              <button onClick={()=>{dispatch(setAddressModalWindow(true))}} className=' bg-mainYellowColor p-2 mt-3 px-2 flex rounded-lg hover:bg-orange-400 text-white font-semibold'>
                Добавити адресу
              </button>
            </div>
            

            {/* <div className='grid grid-cols-3 gap-5 my-8'>


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
            
             */}

            <div className=' bg-mainYellowColor rounded-full h-20 w-20 mt-10 m-auto flex justify-center hover:scale-110 active:scale-90 transition-all duration-100'>
                <img className=' self-center h-10' src={WhitePlus} />
            </div>

        </div>

    </div>
  )
}

export default EditProfile