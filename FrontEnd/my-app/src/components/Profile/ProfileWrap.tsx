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
import { Link, Outlet, useLocation } from 'react-router-dom';


const ProfileWrap=()=> {

   var loc = useLocation();

   var allLocation = loc.pathname.split('/').filter(Boolean);
   
   console.log(allLocation);

   function capitalizeFirstLetter(text:string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
   }

  return (
    <div className='mx-auto w-10/12  '>
        {/* <div className=' text-whiteGray mt-8 ml-2 flex'>
          {allLocation.map((path:string,index)=>
            <Link key={index}
            to={`/${allLocation.slice(0, index + 1).join('/')}`} className='flex' >
              <span className=' self-center mr-2 hover:underline cursor-pointer'>{capitalizeFirstLetter(path)}</span>
              <img className=' self-center mr-2' src={arrowRight} />
            </Link>
          )}
        </div> */}

        <Outlet/>
    </div>
  )
}

export default ProfileWrap