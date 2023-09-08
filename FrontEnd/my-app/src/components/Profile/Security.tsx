import React, { useRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import eye from '../../images/eye.svg';
import openedEye from '../../images/openedEye.svg';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { GetAccessToken, SetAccessToken } from "../../api/jwtDecodeToken";
import { useDispatch } from "react-redux";
import { AuthUser } from "../../features/user/user-slice";
import { useNavigate } from "react-router-dom";

const Security: React.FC = () => {
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);

  const handleTogglePassword = () => {
    setPasswordVisible1(!passwordVisible1);
  };

  const handleTogglePassword1 = () => {
    setPasswordVisible2(!passwordVisible2);
  };
  
  const dispatch = useDispatch();
  const navigate =useNavigate();


  const handleLogout=()=>{
    SetAccessToken("");
    dispatch(AuthUser(""));
  }

  return (
    <div>
      <div className="grid grid-cols-5 mt-10">
        <div className=" col-span-2">
          <div className="relative ">
            <div className='flex text-[22px] text-grayColorForHeader font-semibold mb-2 py-2'>Ваш пароль</div>

            <div className="flex relative justify-end">
              <div className="absolute self-center mr-3 cursor-pointer p-2" onClick={()=>setPasswordVisible1(!passwordVisible1)}>
                <img className=" self-center flex"  src={passwordVisible1 ? openedEye : eye} />
              </div>
              <input type={passwordVisible1 ? "password" : "text"}  className=" h-10 outline-0 border rounded-lg py-2 w-full px-4" />
            </div>
          </div>
          <div className=" mt-10  relative">
            
            <div className=' flex  text-[22px] text-grayColorForHeader font-semibold mb-2 py-2'>Новий пароль</div>
            <div className="flex relative justify-end">
              <input placeholder="Пароль" type={passwordVisible2 ? "password" : "text"} className=" outline-0 border rounded-lg py-2 w-full px-4" />
              <div className="absolute self-center mr-3 cursor-pointer p-2 " onClick={()=>setPasswordVisible2(!passwordVisible2)}>
                <img className=" self-center flex"  src={passwordVisible2 ? openedEye : eye} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-2 col-start-4 ">
          <div>
            <div className=' flex  text-[22px] text-grayColorForHeader font-semibold mb-2 py-2'>Ваш email</div>
            <input type="email" className=" outline-0 border rounded-lg py-2 w-full px-4" />
          </div>
          <div className=" mt-10  ">
            <div className=' flex  text-[22px] text-grayColorForHeader font-semibold mb-2 py-2'>Новий email</div>
            <input type="email" placeholder="Email" className=" outline-0 border rounded-lg py-2 w-full px-4" />
          </div>
        </div>

        <button className=" mt-10 py-3 rounded-lg px-5 text-white col-start-3  hover:bg-blue-700 bg-darkBlueColor">
          ЗБЕРЕГТИ ЗМІНИ
        </button>

        <button onClick={()=>{handleLogout();navigate("/login")}} className=" mt-5 py-2 rounded-lg px-5 text-white col-start-3  hover:bg-red-700  bg-red-950">
          ВИЙТИ З АККАУНТУ
        </button>

      </div>
    </div>
  );
};

export default Security;
