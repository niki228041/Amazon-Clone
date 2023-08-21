import React from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { UserState, becomeASeller } from "../../features/user/user-slice";
import { Orders } from "../../features/user/ordersStateSlice";
import { useDispatch } from 'react-redux';

const BecomeASeller=()=> {
  var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));
  var dispatch = useDispatch();

  const handleBecomeASeller=()=>{
    if(!user?.roles?.includes("seller"))
    {
      dispatch(becomeASeller({id:user.id}));
    }
  }

  return (
    <div className=''>
        <p>Click this button and u will become a Seller!</p>
        <button onClick={()=>handleBecomeASeller()} className=' hover:bg-orange-500 bg-orange-600 py-1 px-5 mt-2 rounded-lg text-white'>
            Become a Seller
        </button>
    </div>
  )
}


export default BecomeASeller



