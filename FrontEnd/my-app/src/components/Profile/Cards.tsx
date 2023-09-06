import React, { useEffect, useState } from 'react'
import circle from '../../images/black-circle.png';
import Calendar from '../../images/Calendar.svg';
import SharpArrowRight from '../../images/SharpArrowRight.svg';
import WhitePlus from '../../images/WhitePlus.svg';
import BlankProfilePicture from '../../images/blankProfilePicture.webp';
import background_1 from '../../images/yellowBlackBackground.jpg'
import background_2 from '../../images/blackWaves.jpg'
import background_3 from '../../images/purpleWavesBackground.jpg'
import blackDot from '../../images/blackDot.svg'
import arrowRight from '../../images/ArrowRightS.svg';

import waves from '../../images/waves.png'
import chip from '../../images/chip.png'

import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { apiCardSlice, useGetCardsByUserIdQuery } from '../../features/user/apiCardSlice';
import { Card } from '../types';
import { SetDefaultCard } from '../Temp/CardsSite';
import { CardModal } from '../BuyProduct/CardModal';
import { setCardModalWindow } from '../../features/user/modalWindowsStateSlice';
import { useDispatch } from 'react-redux';

const ProfileCards=()=> {
   const [dropDownSex,setDropDownSex] =  useState(false);

   var user = useAppSelector((state)=> state.user.user);


   var {data,isSuccess}:{data:Card[],isSuccess:boolean}  = useGetCardsByUserIdQuery({id:user.id});
   var [setDefaultCard,{}] = apiCardSlice.useSetDefaultCardMutation();
   
 
   useEffect(()=>{},[data]);
 
   var dispatch =  useDispatch();

   console.log(data);
 
   const handleSetDefaultCard=(id:number)=>{
     var request:SetDefaultCard = {userId:Number(user.id),cardId:id};
     setDefaultCard(request);
   }
 
   const [isCardModalOpen,setCardModalOpen]= useState(false);
   const toggleCardModal = (prop:boolean)=>{setCardModalOpen(prop)};

  return (<>
    <div>

        <div className='flex justify-between'>
            <div className=' flex text-[30px] text-grayColorForHeader font-semibold self-center '>Основні платіжні карти</div>
            <div onClick={()=>dispatch(setCardModalWindow(true))} className=' flex text-[20px] text-white cursor-pointer hover:scale-110 select-none transition-all active:scale-95 duration-100 font-semibold bg-mainYellowColor rounded-lg self-center px-4 py-2 '>Добавити карту</div>
        </div>

        
        {data?.map((card: Card, id: number) => {
        
        return <div
        
        >
        

        <div className={classNames(
          'border rounded-lg p-4 px-10  bg-cover flex justify-between my-10 shadow-xl',
          { 'bg-slate-500': card.isDefault,
            'hover:bg-slate-200':!card.isDefault }
        )}
        key={id}
        onClick={()=>{handleSetDefaultCard(Number(card.id))}}  >
            <div className='flex'>
                <div className='rounded-lg bg-cover py-2 w-[330px] text-white  hover:scale-105 transition-all' style={{ backgroundImage:`url(${background_2})`}}>
                    <span className='ml-4 shadow-sm font-semibold text-outline text-sm'>Карта для виплат  </span>
                    <div className='flex mt-4'>
                        <img className=' h-16 ' src={waves} />
                        <img className=' h-12 self-center' src={chip} />
                    </div>
                    <div>
                        <span className=' text-outline flex justify-center text-lg' style={{fontFamily:"hemi"}}>{card.cardNumber}</span>
                        <span className=' text-outline flex justify-center text-sm mt-2 mb-5' style={{fontFamily:"hemi"}}>{card.month}/{card.year.slice(-2)}</span>
                    </div>
                </div>

                <div className='ml-20  self-center flex flex-col font-semibold'>
                    <span className='mb-5 text-lg'>Приват банк Україна {card.ownerName}</span>

                    <div className='flex'>
                        <span>Карта для виплат</span>
                        <img className=' self-end mx-1 pb-1 ml-4' src={blackDot} />
                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1 mr-4' src={blackDot} />

                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1 mr-4' src={blackDot} />

                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1 mr-4' src={blackDot} />
                        <span>{card.cardNumber.slice(-4)}</span>
                    </div>
                    <span>Дійсна до {card.month}/{card.year}</span>
                </div>
            </div>

            <div className=' flex'>
                <button className=' self-center border font-semibold text-mainYellowColor border-mainYellowColor rounded-lg py-3 px-20  hover:bg-mainYellowColor hover:text-white transition-all'>Видалити</button>
            </div>
        </div>

        {/* <span className='px-4'>
            {id}
        </span>
        {card.ownerName}/{card.cardNumber} */}
        
        
        </div> })}

        {/* <div className=' border rounded-lg p-4 px-10  bg-cover flex justify-between my-10 shadow-xl' >
            <div className='flex'>
                <div className='rounded-lg bg-cover py-2 w-[330px] text-white' style={{ backgroundImage:`url(${background_3})`}}>
                    <span className='ml-4 shadow-sm font-semibold text-outline text-sm'>Карта для виплат</span>
                    <div className='flex mt-4'>
                        <img className=' h-16 ' src={waves} />
                        <img className=' h-12 self-center' src={chip} />
                    </div>
                    <div>
                        <span className=' text-outline flex justify-center text-lg' style={{fontFamily:"hemi"}}>{"0123 4567 5678 9101"}</span>
                        <span className=' text-outline flex justify-center text-sm mt-2 mb-5' style={{fontFamily:"hemi"}}>{"01/23"}</span>
                    </div>
                </div>

                <div className='ml-20  self-center flex flex-col font-semibold'>
                    <span className='mb-5 text-lg'>Приват банк Україна</span>

                    <div className='flex'>
                        <span>Карта для виплат</span>
                        <img className=' self-end mx-1 pb-1 ml-4' src={blackDot} />
                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1 mr-4' src={blackDot} />

                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1 mr-4' src={blackDot} />

                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1' src={blackDot} />
                        <img className=' self-end mx-1 pb-1 mr-4' src={blackDot} />
                        <span>9101</span>
                    </div>
                    <span>Дійсна до 01/25</span>
                </div>
            </div>

            <div className=' flex'>
                <button className=' self-center border font-semibold text-mainYellowColor border-mainYellowColor rounded-lg py-3 px-20 hover:bg-mainYellowColor hover:text-white transition-all'>Видалити</button>
            </div>
        </div> */}
    </div>
    </>
  )
}

export default ProfileCards