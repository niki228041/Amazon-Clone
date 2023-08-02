// import { SyntheticEvent, useState } from 'react'
// import FormContainer from '../components/FormContainer'
// import { RouteComponentProps } from 'react-router-dom'
// import { Form, Button } from 'react-bootstrap'

import { Link, useNavigate } from "react-router-dom"
import { postRegistration } from "../../features/user/user-slice"
import { useDispatch } from "react-redux"

// interface Props {
//   history: RouteComponentProps['history']
// }

interface RegistrationRequest{
  userName: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  checkPassword: string,
  avatarImage:string
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


  const submitHandler = async (data:React.FormEvent<HTMLFormElement>) => {
    data.preventDefault()
    var curentData = new FormData(data.currentTarget);

    var userName = curentData?.get("userName")?.toString()!;
    var firstName = curentData?.get("firstName")?.toString()!;
    var lastName = curentData?.get("lastName")?.toString()!;

    var email = curentData?.get("email")?.toString()!;
    var password = curentData?.get("password")?.toString()!;
    var repeatPassword = curentData?.get("repeatPassword")?.toString()!;

    var request:RegistrationRequest = { userName:userName,firstName:firstName,lastName:lastName,email:email,password:password,checkPassword:repeatPassword ,avatarImage:""};

    // var request:RegistrationRequest = {email:email,password:password};

    dispatch(postRegistration(request));
    console.log(request);
    navigate("/products");
  }

  return (
    <div className="flex min-h-full flex-col justify-center ">
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
      </div>
  )
}

export default Registration