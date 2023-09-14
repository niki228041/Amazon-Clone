// import { SyntheticEvent, useState } from 'react'
// import FormContainer from '../components/FormContainer'
// import { RouteComponentProps } from 'react-router-dom'
// import { Form, Button } from 'react-bootstrap'

import { Link, useNavigate } from "react-router-dom"
import { postRegistration } from "../../features/user/user-slice"
import { useDispatch, useSelector } from 'react-redux'

import TestPage from '.././auxiliary pages/Sidebarauth';
import "./auth.css"
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';

import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useState } from 'react'


import { useFormik } from 'formik';
import logo_auth from '../../images/logo_auth.svg';
import { registrationSchema } from "./Validation/Registration";

interface RegistrationRequest {
  displayName: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  checkPassword: string,
  avatarImage: string
}

const Registration = () => {


  const formik = useFormik({
    initialValues: {
      displayName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema:registrationSchema,
    onSubmit: values => {


      var displayName = values.displayName;
      var firstName = values.firstName;
      var lastName = values.lastName;

      var email = values.email;
      var password = values.password;
      var repeatPassword = values.repeatPassword;

      var request: RegistrationRequest = { displayName: displayName, firstName: firstName, lastName: lastName, email: email, password: password, checkPassword: repeatPassword, avatarImage: "" };
      console.log(request);
      // var request:RegistrationRequest = {email:email,password:password};

      var err = dispatch(postRegistration(request));
      err.then((res:any)=>{
        console.log(res.payload.message);
        setServerErrorLogin(res.payload.message);
        console.log("showServerErrorLogin");
        console.log(showServerErrorLogin);
        if(res?.payload?.isSuccess)
        {
          navigate("/todaysDeals");
        }

        

      })

      },
  });


  var dispatch = useDispatch();
  var navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showServerErrorLogin, setServerErrorLogin] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <form className='' onSubmit={formik.handleSubmit}>
      <div className="w-full grid grid-cols-2 h-full fixed ">
        <div className=" p-2 bg-litleYellow xl:col-span-1 col-span-2">

        <div className='m-auto relative flex h-full justify-center'>
          <div className="absolute flex justify-center mt-10">
            <img src={logo_auth} />
          </div>
          <div className="flex m-auto w-full">
          <div className=" p-2  m-auto xl:w-3/6 lg:w-4/6 ">

            <div className=" flex flex-col justify-center text-grayColorForHeader">
              <p className="flex self-center text-[40px] font-bold">Реєстрація</p>
              <p className="flex self-center text-sm mt-2">Створіть новий профайл</p>
            </div>

            <div className="flex flex-col justify-center  mt-4 mx-auto">
              <div className=" grid grid-cols-2 w-full  gap-x-6 gap-y-4">
                <div className=" col-span-2">
                  <input id="displayName" name="displayName" type="displayName" onChange={formik.handleChange} value={formik.values.displayName} className=" w-full border outline-0 rounded-lg py-3 border-gray-400/90 px-4 mx-auto text-sm placeholder-veryYellowColor" placeholder="Ім'я користувача (показується всім)" />
                  {formik.errors.displayName ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.displayName}</div> : null}
                </div>

                <div>
                  <input id="firstName" name="firstName" type="firstName" onChange={formik.handleChange} className=" w-full border outline-0 rounded-lg py-3 border-gray-400/90 px-4 mx-auto text-sm placeholder-veryYellowColor" placeholder="Ім'я" />
                  {formik.errors.firstName ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.firstName}</div> : null}
                </div>
                <div>
                  <input id="lastName" name="lastName" type="lastName" onChange={formik.handleChange} className=" w-full border outline-0 rounded-lg py-3 border-gray-400/90 px-4 mx-auto text-sm placeholder-veryYellowColor" placeholder="Прізвище" />
                  {formik.errors.lastName ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.lastName}</div> : null}
                </div>

                
                <div className=" col-span-2">
                  <input id="email" name="email" type="email" onChange={formik.handleChange} className=" w-full border outline-0 rounded-lg py-3 border-gray-400/90 px-4 mx-auto text-sm placeholder-veryYellowColor" placeholder="Email" />
                  {formik.errors.email ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.email}</div> : null}
                </div>

                <div>
                  <input id="password" name="password" type="password" onChange={formik.handleChange} className=" w-full border outline-0 rounded-lg py-3 border-gray-400/90 px-4 mx-auto text-sm placeholder-veryYellowColor" placeholder="Пароль" />
                  {formik.errors.password ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.password}</div> : null}
                </div>
                <div>
                  <input id="repeatPassword" name="repeatPassword" type="repeatPassword" onChange={formik.handleChange} className=" w-full border outline-0 rounded-lg py-3 border-gray-400/90 px-4 mx-auto text-sm placeholder-veryYellowColor" placeholder="Ще раз пароль" />
                  {formik.errors.repeatPassword ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.repeatPassword}</div> : null}
                </div>

                

              </div>
              
            </div>



            <div className=" mx-auto mt-4">
              <button className="text-white text-[22px] py-2 bg-mainYellowColor w-full rounded-lg font-semibold" type="submit">Зареєструватися </button>
              
            </div>

            <div className="flex justify-center w-5/6 mx-auto mt-1">
              {showServerErrorLogin ? <div className=' text-red-500 font-semibold text-sm'>{showServerErrorLogin}</div> : null}
            </div>

            <div className="flex justify-center w-4/6 mx-auto mt-4">
              <Link to="/login" className="">
                <span className="flex whitespace-nowrap text-sm text-mainYellowColor cursor-pointer hover:scale-105 transition-all ">або якщо вже є акаунт, увійти</span>
              </Link>
            </div>

          </div>
          </div>
        </div>
        </div>

        
        <div className=" bg-mainYellowColor xl:block hidden">
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

export default Registration



