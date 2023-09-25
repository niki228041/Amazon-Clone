import React from 'react'
import { useDispatch } from 'react-redux';
import close from "../../images/close.png"
import { setLoginRequestWindow } from '../../features/user/modalWindowsStateSlice';
import { useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';

function RequestToLogin() {
  var dispatch = useDispatch();
  var isOpen = useAppSelector((state)=>state.modalWindows.isLoginRequestOpen);

  var navigate = useNavigate();
  var dispatch = useDispatch();

  return (
    <>
    {isOpen?
    <div className="flex justify-center h-full w-full fixed bg-black/30 transition-all z-30">

      <div className=" absolute px-20 rounded-xl bg-gray-100 grid mt-48" >
        <div className="absolute flex select-none right-0 p-2 ">
          <span onClick={() => dispatch(setLoginRequestWindow(false))} className="p-2 cursor-pointer" >
            <img className=' h-5' src={close}></img>
          </span>
        </div>

        <div className='flex justify-center mt-5'>
            <span className='text-[40px]'>Ви не зареэстровані</span>
        </div>


        <div onClick={()=>{dispatch(setLoginRequestWindow(false)); navigate("/login");}} className='flex justify-center bg-mainYellowColor rounded-lg border py-1 px-10 my-5 text-white font-medium cursor-pointer'>Увійти</div>

      </div>

    </div>
    :""}
    </>
  )
}

export default RequestToLogin