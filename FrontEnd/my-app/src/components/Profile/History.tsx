import React, { useState } from 'react'
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

const ProfileHistory=()=> {
   const [dropDownSex,setDropDownSex] =  useState(false);
   

  return (
    <div >


       <div className='mb-8 flex text-[26px] text-grayColorForHeader font-semibold mb-2'>03.08.23, середа</div>
       
       <div className=' border'>
            <div className="rounded-lg p-3 grid grid-cols-10 mt-2">
                <div className="flex col-span-8">

                <div className="m-2">
                  <div className="h-24 w-24 border rounded-md bg-cover bg-center bg-no-repeat" style={{ backgroundImage:"url("+ background_1  +")", backgroundPosition:"center"}} />
                </div>

                <div className="text-sm mt-1 ml-3 text-[16px]">
                  <p className="font-medium">Футболки різних кольорів, для чоловіків та жінок</p>
                  <p className="text-grayForText mt-2" >Розмір: середній, Колір: синій, Матеріал: Пластик</p>

                  <div className="flex mt-9 font-medium text-sm" >
                    <button  className=" select-none active:bg-red-400 hover:bg-red-500 hover:text-white rounded-lg px-2 py-1 border border-grayColorForBorder text-red-500">Видалити</button>
                    <button className=" select-none active:bg-yellow-400 hover:bg-mainYellowColor hover:text-white ml-5 rounded-lg px-2 py-1 border border-grayColorForBorder text-mainYellowColor">Купити пізніше</button>
                  </div>
                </div>
                </div>

                <div className="col-span-2 flex flex-row-reverse">
                    810 грн.
                </div>
            </div>

            <hr className="mt-4 mx-6"></hr>

            <div className="rounded-lg p-3 grid grid-cols-10 mt-2">
                <div className="flex col-span-8">
        
                <div className="m-2">
                  <div className="h-24 w-24 border rounded-md bg-cover bg-center bg-no-repeat" style={{ backgroundImage:"url("+ background_1  +")", backgroundPosition:"center"}} />
                </div>
        
                <div className="text-sm mt-1 ml-3 text-[16px]">
                  <p className="font-medium">Футболки різних кольорів, для чоловіків та жінок</p>
                  <p className="text-grayForText mt-2" >Розмір: середній, Колір: синій, Матеріал: Пластик</p>
        
                  <div className="flex mt-9 font-medium text-sm" >
                    <button  className=" select-none active:bg-red-400 hover:bg-red-500 hover:text-white rounded-lg px-2 py-1 border border-grayColorForBorder text-red-500">Видалити</button>
                    <button className=" select-none active:bg-yellow-400 hover:bg-mainYellowColor hover:text-white ml-5 rounded-lg px-2 py-1 border border-grayColorForBorder text-mainYellowColor">Купити пізніше</button>
                  </div>
                </div>
                </div>
        
                <div className="col-span-2 flex flex-row-reverse">
                    810 грн.
                </div>
            </div>
       </div>

    </div>
  )
}

export default ProfileHistory