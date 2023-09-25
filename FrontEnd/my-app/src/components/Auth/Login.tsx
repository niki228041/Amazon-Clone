import { SyntheticEvent, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginRequest } from './types'
import { postLogin } from '../../features/user/user-slice'
import { Link, useNavigate } from 'react-router-dom';
import TestPage from '.././auxiliary pages/Sidebarauth';
import "./auth.css"
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import { useFormik } from 'formik';

import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { loginSchema } from './Validation/LoginValidation';
import logo_auth from '../../images/logo_auth.svg';


const LoginScreen = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema:loginSchema,
    onSubmit: values => {

      var email = values.email;
      var password = values.password;

      var request: LoginRequest = { email: email, password: password };
      var err = dispatch(postLogin(request));

      err.then((res:any)=>{
        console.log("res.payload.isSuccess");
        console.log(res.payload.isSuccess);
        console.log(res);
        setServerErrorLogin(res.payload.message);
        if(res.payload.isSuccess)
        {
          navigate("/todaysDeals");
        }
      })

      },
  });

  const [showServerErrorLogin, setServerErrorLogin] = useState(false);

  const [showPassword, setShowPassword] = useState(false);




  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const dispatch = useDispatch();
  const navigate = useNavigate();



  return (
    <form className=' m-auto' onSubmit={formik.handleSubmit}>
    <div className="w-full grid grid-cols-2 h-full fixed  ">
      <div className=" p-2 bg-litleYellow  xl:col-span-1 col-span-2">

        <div className='m-auto relative flex h-full justify-center'>
          <div className="absolute flex justify-center mt-10">
            <img src={logo_auth} />
          </div>
          <div className=" xl:w-1/2 lg:w-1/2 md:w-1/2 p-2 m-auto ">
          

          <div className=" flex flex-col justify-center text-grayColorForHeader">
            <p className="flex self-center text-[40px] font-bold">Вхід</p>
            <p className="flex self-center text-sm mt-2">Увійдіть за допомогою</p>
            <p className="flex self-center text-sm">адреси електронної пошти та пароля</p>
          </div>

          <div className="flex flex-col justify-center w-5/6 mt-4 mx-auto">
            <input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} className=" w-full border outline-0 rounded-lg py-3 border-gray-400/90 px-4 mx-auto text-sm placeholder-veryYellowColor" placeholder="Адреса електронної пошти" />
            {formik.errors.email ? <div className=' text-red-500 text-sm font-semibold mt-1'>{formik.errors.email}</div> : null}
            
            <input id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} className=" w-full border outline-0 rounded-lg mt-2 py-3 border-gray-400/90 px-4 mx-auto text-sm placeholder-veryYellowColor" placeholder="Пароль" />
            {formik.errors.password ? <div className=' text-red-500 text-sm font-semibold mt-1'>{formik.errors.password}</div> : null}
          </div>

          <div className="flex justify-end w-5/6 mx-auto mt-1">
            <div className="">
              <span className=" mx-auto flex whitespace-nowrap  text-sm text-mainYellowColor cursor-pointer  hover:scale-105 transition-all">Забули пароль?</span>
            </div>
          </div>

          <div className="w-5/6 mx-auto mt-4">
            <button className="text-white text-[22px] py-2 bg-mainYellowColor w-full rounded-lg font-semibold">Увійти</button>
            
          </div>

          
          <div className="flex justify-center w-5/6 mx-auto mt-1">
            {showServerErrorLogin ? <div className=' text-red-500 font-semibold text-sm'>{showServerErrorLogin}</div> : null}
          </div>

          <div className="flex justify-center w-5/6 mx-auto mt-4">
            <Link to="/registration" className="">
              <span className="flex whitespace-nowrap text-sm text-mainYellowColor cursor-pointer hover:scale-105 transition-all ">або створити обліковий запис</span>
            </Link>
          </div>

        </div>
        </div>

      </div>
      
      <div className=" bg-mainYellowColor  xl:block hidden">
        <div className=" w-4/6 mx-auto ">
          <div className="w-4/6 text-darkBlueColor text-[20px] mt-20">
            <span>
              Зручний та широкий вибір товарів, що доставляє радість прямо до вашого дому — наша мета!
            </span>
          </div>

        </div>

        <div className="flex justify-end mt-10 h-full">
          <div className=" bg-black border-slate-200 border-l-4 border-t-4  pt-10 pl-10 w-11/12 rounded-tl-[40px]">
            <div className=" bg-white h-full rounded-tl-xl">

            </div>
          </div>
        </div>
        

      </div>
    </div>

  </form>
  )
}

export default LoginScreen;
