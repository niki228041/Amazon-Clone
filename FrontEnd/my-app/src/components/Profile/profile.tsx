import React, { useRef, useState } from 'react';

import "./index.css";
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import BreadcrumbsLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import PersonalData from "../../images/Personal Data.svg"
import credit_card from "../../images/credit_card.svg"
import assignment from "../../images/assignment.svg"
import LoginAndSecurity from "../../images/Login and Security.svg"
import Help from "../../images/Help.svg"
import arrowRight from '../../images/ArrowRightS.svg';


export const ProfilePage = () => {

  return (
    <>
      <div >
        

        <div className='mb-20 '>
          <div className='flex'>
            <Link to="editprofile" className=' border w-1/3 justify-center flex-col flex py-16 rounded-lg mr-2 transition-all duration-200 hover:bg-whiteGrayComment select-none cursor-pointer active:scale-105 active:duration-100'>
              <div className=' flex justify-center text-[26px] text-grayColorForHeader font-semibold mb-2'>Особисті дані</div>
              <img className='h-14' src={PersonalData} />
            </Link>
            <Link to="payment" className=' border w-1/3 justify-center flex-col flex py-16 rounded-lg mx-2 transition-all duration-200 hover:bg-whiteGrayComment select-none cursor-pointer active:scale-105 active:duration-100'>
              <div className=' flex justify-center text-[26px] text-grayColorForHeader font-semibold mb-2'>Мої картки</div>
              <img className='h-16' src={credit_card} />
            </Link>
            <Link to="profilehistory" className=' border w-1/3 justify-center flex-col flex py-16 rounded-lg ml-2 transition-all duration-200 hover:bg-whiteGrayComment select-none cursor-pointer active:scale-105 active:duration-100'>
              <div className=' flex justify-center text-[26px] text-grayColorForHeader font-semibold mb-2'>Історія покупок</div>
              <img className='h-16' src={assignment} />
            </Link>
          </div>
          
          <div className='flex mt-5 justify-center'>
            <Link to="security" className=' border w-1/3 justify-center flex-col flex py-16 rounded-lg mx-2 transition-all duration-200 hover:bg-whiteGrayComment select-none cursor-pointer active:scale-105 active:duration-100'>
              <div className=' flex justify-center text-[26px] text-grayColorForHeader font-semibold mb-2'>Логін та безпека</div>
              <img className='h-14' src={LoginAndSecurity} />
            </Link>
            <Link to="/help" className=' border w-1/3 justify-center flex-col flex py-16 rounded-lg mx-2 transition-all duration-200 hover:bg-whiteGrayComment select-none cursor-pointer active:scale-105 active:duration-100'>
              <div className=' flex justify-center text-[26px] text-grayColorForHeader font-semibold mb-2'>Допомога</div>
              <img className='h-16' src={Help} />
            </Link>

          </div>
        </div>

      </div>
    </>
  );
};
