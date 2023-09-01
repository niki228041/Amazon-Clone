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

const ProfileCards=()=> {
   const [dropDownSex,setDropDownSex] =  useState(false);



  return (
    <div >

        <div className='my-8 flex text-[30px] text-grayColorForHeader font-semibold mb-2'>Основні платіжні карти</div>


        <div className=' border rounded-lg p-4 px-10  bg-cover flex justify-between my-10 shadow-xl' >
            <div className='flex'>
                <div className='rounded-lg bg-cover py-2 w-[330px] text-white' style={{ backgroundImage:`url(${background_2})`}}>
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
                <button className=' self-center border font-semibold text-mainYellowColor border-mainYellowColor rounded-lg py-3 px-20  hover:bg-mainYellowColor hover:text-white transition-all'>Видалити</button>
            </div>
        </div>


        <div className=' border rounded-lg p-4 px-10  bg-cover flex justify-between my-10 shadow-xl' >
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
        </div>
    </div>
  )
}

export default ProfileCards