// import { SyntheticEvent, useState } from 'react'
// import FormContainer from '../components/FormContainer'
// import { RouteComponentProps } from 'react-router-dom'
// import { Form, Button } from 'react-bootstrap'

import { Link, useNavigate } from "react-router-dom"
import { postRegistration } from "../../features/user/user-slice"
import { useDispatch, useSelector } from 'react-redux'

import TestPage from '.././test-page';
import "./auth.css"
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';

import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useState } from 'react'

// interface Props {
//   history: RouteComponentProps['history']
// }

interface RegistrationRequest {
  userName: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  checkPassword: string,
  avatarImage: string
}

const Registration = () => {
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  // const submitHandler = async (e: SyntheticEvent) => {
  //   e.preventDefault()

  //   await fetch('http://localhost:8081/api/register', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       first_name: firstName,
  //       last_name: lastName,
  //       email,
  //       password,
  //     }),
  //   })

  //   history.push('/login')
  // }

  var dispatch = useDispatch();
  var navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  const submitHandler = async (data: React.FormEvent<HTMLFormElement>) => {
    try{
    data.preventDefault()
    var curentData = new FormData(data.currentTarget);

    var userName = curentData?.get("userName")?.toString()!;
    var firstName = curentData?.get("firstName")?.toString()!;
    var lastName = curentData?.get("lastName")?.toString()!;

    var email = curentData?.get("email")?.toString()!;
    var password = curentData?.get("password")?.toString()!;
    var repeatPassword = curentData?.get("repeatPassword")?.toString()!;

    var request: RegistrationRequest = { userName: userName, firstName: firstName, lastName: lastName, email: email, password: password, checkPassword: repeatPassword, avatarImage: "" };
    console.log(request);
    // var request:RegistrationRequest = {email:email,password:password};

    var res = dispatch(postRegistration(request));
    res.then((res_:any)=>{
      console.log(res_.payload.message);
      console.log(res_);

    });
      navigate("/products");
    }
    catch(error:any){
      console.log("yo");
    }
  }

  return (
    <form className='overlogin' onSubmit={submitHandler}>
      <div className="leftside">

        <svg className="logosing" width="345" height="92" viewBox="0 0 345 92" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M84.4419 27.92H92.9379L104.65 62H96.5859L93.9459 54.368H83.3379L80.7459 62H72.6819L84.4419 27.92ZM92.6499 48.944L88.6659 35.84L84.5859 48.944H92.6499ZM108.006 62V27.92H115.878V55.088H132.39V62H108.006ZM136.084 62V27.92H143.956V55.088H160.468V62H136.084Z" fill="#FF9A02" />
          <path d="M203.378 62H195.698V47.84C195.698 46.208 195.394 45.008 194.786 44.24C194.178 43.472 193.394 43.088 192.434 43.088C191.41 43.088 190.402 43.504 189.41 44.336C188.418 45.168 187.714 46.24 187.298 47.552V62H179.618V47.84C179.618 46.176 179.314 44.976 178.706 44.24C178.098 43.472 177.314 43.088 176.354 43.088C175.362 43.088 174.37 43.504 173.378 44.336C172.386 45.168 171.666 46.24 171.218 47.552V62H163.538V36.8H170.45V41.024C171.378 39.52 172.626 38.368 174.194 37.568C175.794 36.736 177.65 36.32 179.762 36.32C181.842 36.32 183.442 36.816 184.562 37.808C185.682 38.768 186.402 39.904 186.722 41.216C187.682 39.648 188.946 38.448 190.514 37.616C192.114 36.752 193.906 36.32 195.89 36.32C197.49 36.32 198.786 36.624 199.778 37.232C200.77 37.808 201.522 38.576 202.034 39.536C202.546 40.496 202.898 41.536 203.09 42.656C203.282 43.744 203.378 44.816 203.378 45.872V62ZM206.814 54.464C206.814 52.8 207.278 51.344 208.206 50.096C209.134 48.848 210.414 47.872 212.046 47.168C213.678 46.432 215.55 46.064 217.662 46.064C218.686 46.064 219.694 46.16 220.686 46.352C221.678 46.512 222.542 46.752 223.278 47.072V45.968C223.278 44.592 222.862 43.536 222.03 42.8C221.198 42.064 219.934 41.696 218.238 41.696C216.83 41.696 215.502 41.936 214.254 42.416C213.038 42.896 211.742 43.584 210.366 44.48L208.062 39.584C209.726 38.496 211.454 37.68 213.246 37.136C215.07 36.592 216.99 36.32 219.006 36.32C222.782 36.32 225.71 37.232 227.79 39.056C229.902 40.848 230.958 43.456 230.958 46.88V53.456C230.958 54.224 231.07 54.768 231.294 55.088C231.55 55.376 231.982 55.552 232.59 55.616V62C231.95 62.128 231.342 62.224 230.766 62.288C230.222 62.352 229.742 62.384 229.326 62.384C227.886 62.384 226.782 62.096 226.014 61.52C225.278 60.944 224.814 60.16 224.622 59.168L224.478 58.064C223.358 59.504 222.014 60.608 220.446 61.376C218.91 62.112 217.294 62.48 215.598 62.48C213.934 62.48 212.43 62.128 211.086 61.424C209.774 60.72 208.734 59.76 207.966 58.544C207.198 57.328 206.814 55.968 206.814 54.464ZM222.078 55.424C222.43 55.136 222.718 54.816 222.942 54.464C223.166 54.112 223.278 53.776 223.278 53.456V51.2C222.638 50.944 221.918 50.752 221.118 50.624C220.35 50.464 219.63 50.384 218.958 50.384C217.55 50.384 216.382 50.704 215.454 51.344C214.526 51.952 214.062 52.768 214.062 53.792C214.062 54.368 214.222 54.896 214.542 55.376C214.862 55.856 215.294 56.24 215.838 56.528C216.414 56.816 217.086 56.96 217.854 56.96C218.622 56.96 219.39 56.816 220.158 56.528C220.926 56.24 221.566 55.872 222.078 55.424ZM252.507 43.376C250.651 43.376 248.971 43.68 247.467 44.288C245.963 44.864 244.875 45.728 244.203 46.88V62H236.523V36.8H243.579V41.888C244.443 40.192 245.563 38.864 246.939 37.904C248.315 36.944 249.755 36.448 251.259 36.416C251.611 36.416 251.867 36.416 252.027 36.416C252.219 36.416 252.379 36.432 252.507 36.464V43.376ZM272.062 60.656C271.358 60.944 270.574 61.232 269.71 61.52C268.878 61.808 267.998 62.032 267.07 62.192C266.142 62.384 265.23 62.48 264.334 62.48C263.054 62.48 261.87 62.272 260.782 61.856C259.726 61.408 258.878 60.688 258.238 59.696C257.63 58.704 257.326 57.392 257.326 55.76V42.608H254.11V36.8H257.326V28.784H265.006V36.8H270.142V42.608H265.006V53.12C265.006 53.952 265.214 54.56 265.63 54.944C266.046 55.296 266.574 55.472 267.214 55.472C267.758 55.472 268.334 55.376 268.942 55.184C269.582 54.992 270.126 54.784 270.574 54.56L272.062 60.656Z" fill="#666666" />
        </svg>
        <div style={{ fontSize: "40px", fontWeight: "500", marginLeft: "370px", marginTop: "30px", marginBottom: "20px", }}>
          <a style={{ color: "rgb(109, 104, 104)" }}>
            Реєстрація
          </a>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", height: "270px" }}>

          <OutlinedInput className='emailinput'
            placeholder="Ім'я користувача"
            id="userName"
            name="userName"
            autoComplete="userName"
            required
          />
          <OutlinedInput style={{ width: "190px", marginLeft: "280px", marginTop: "10px" }}
            placeholder="Ім'я"
            id="firstName"
            name="firstName"
            autoComplete="firstName"
            required
          />
          <OutlinedInput style={{ width: "190px", marginLeft: "20px", marginTop: "10px" }}
            placeholder='Прізвище'
            id="lastName"
            name="lastName"
            autoComplete="lastName"
            required

          />
          <OutlinedInput style={{ width: "400px", marginLeft: "280px", marginTop: "10px" }}
            placeholder='Електронна адреса'
            id="email"
            name="email"
            type="email"
            autoComplete="current-password"
            required
          />


          <OutlinedInput style={{ width: "400px", marginLeft: "280px", marginTop: "10px" }}
            placeholder='Пароль'

            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            // id="outlined-adornment-password"
            // 
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }

          />

          <OutlinedInput style={{ width: "400px", marginLeft: "280px", marginTop: "10px" }}
            placeholder='Підтвердіть пароль'

            id="repeatPassword"
            name="repeatPassword"
            type={showPassword ? 'text' : 'repeatPassword'}
            autoComplete="current-password"
            required
            // id="outlined-adornment-password"
            // 
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }

          />




        </div>


        <div style={{ marginTop: "80px" }}>




          {/* style={{ width:"800px",display: "flex", marginLeft: "280" }} */}
          <div style={{ marginLeft: "280px", }}>
            <button
              style={{ borderRadius: "7px", color: "white", background: "#FF9A02", height: "50px", width: "400px", marginTop: "30px" }}
              type="submit"

            >
              Реєстріція
            </button>
          </div>

          <p style={{ fontSize: "15px", color: "#FF9A02" }} className="mt-10 text-center text-sm ">
            Вже маєте обліковий запис?{' '}
            <Link style={{ color: "#FF9A02" }} to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Увійти
            </Link>
          </p>
        </div>

      </div>
      <TestPage ></TestPage>

    </form>
  )
}

export default Registration








{/* <div className="flex min-h-full flex-col justify-center ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={submitHandler}>

          
          <div className=" w-full ">
            <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="userName"
                name="userName"
                autoComplete="userName"
                required
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex">
              <div className=" w-full  mr-1">
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                  FirstName
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    autoComplete="firstName"
                    required
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div className=" w-full ml-1">
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                  LastName
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    autoComplete="lastName"
                    required
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className=" w-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          

            

            <div className="w-full">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  autoComplete="password"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
              
            <div className=" w-full">
                <label htmlFor="repeatPassword" className="block text-sm font-medium leading-6 text-gray-900">
                Repeat Password
                </label>
                <div className="mt-2">
                  <input
                    id="repeatPassword"
                    name="repeatPassword"
                    autoComplete="repeatPassword"
                    required
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
             Already have an account?{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Sign in
            </Link>
          </p>
        </div>
      </div> */}