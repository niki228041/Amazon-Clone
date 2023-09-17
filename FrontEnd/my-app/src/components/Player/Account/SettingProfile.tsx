import React, { useState } from 'react'
import img from '../../../images/d33644fc9c30c11105de0b3112780647.jpg'
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';

const SettingProfile=()=> {
  const [isFollow, setIsFollow] = useState(false);
  const [isAutoPlay, setAutoPlay] = useState(false);
  const [isProfileProfilePrivacity, setProfileProfilePrivacity] = useState(false);
  const [isLikesProfilePrivacity, setLikesProfilePrivacity] = useState(false);

  return (
    <div className=' mt-2'>
      <div className='bg-middleGrayColor p-2 px-6 rounded-lg '>
        <span className=' text-white text-[40px] font-semibold self-end hover:underline cursor-pointer px-2'>Settings</span>
        <div className='px-10 text-white mt-4'>
            <div>
                <span className=' text-lg font-medium'>Auto play</span>
                <div className='flex justify-between text-sm mt-2'>
                    <span className=' text-almostWhiteColor ml-4'>When the switch is on, the tracks will be played automatically</span>
                    <div>
                        <div onClick={()=>{setAutoPlay(!isAutoPlay)}} className={classNames('cursor-pointer bg-almostBlackColor w-12 rounded-full flex p-1 transition-all ',{" bg-orangeColor":isAutoPlay})}>
                            <div className={classNames(' bg-orangeColor h-5 w-5 rounded-full self-center cursor-pointer transition-all ',
                            {" bg-white translate-x-5":isAutoPlay}
                            )}>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-2'>
                <span className=' text-lg font-medium'>Privacity</span>
                <div className='flex justify-between text-sm mt-2'>
                    <span  className=' text-almostWhiteColor ml-4'>Show your profile to other users</span>
                    <div>
                        <div onClick={()=>{setProfileProfilePrivacity(!isProfileProfilePrivacity)}} className={classNames('cursor-pointer bg-almostBlackColor w-12 rounded-full flex p-1 transition-all ',{" bg-orangeColor":isProfileProfilePrivacity})}>
                            <div className={classNames(' bg-orangeColor h-5 w-5 rounded-full self-center transition-all ',
                            {" bg-white translate-x-5":isProfileProfilePrivacity}
                            )}>
                            
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between text-sm mt-2'>
                    <span  className=' text-almostWhiteColor ml-4'>Show your tracks to other users</span>
                    <div>
                        <div onClick={()=>{setLikesProfilePrivacity(!isLikesProfilePrivacity)}} className={classNames('cursor-pointer bg-almostBlackColor w-12 rounded-full flex p-1 transition-all ',{" bg-orangeColor":isLikesProfilePrivacity})}>
                            <div className={classNames(' bg-orangeColor h-5 w-5 rounded-full self-center transition-all ',
                            {" bg-white translate-x-5":isLikesProfilePrivacity}
                            )}>
                            
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center mt-10 text-sm mb-2'>
                    You can change the main options in the allmart profile
                </div>
            </div>
        </div>
        
      </div>

    </div>
  )
}


export default SettingProfile
