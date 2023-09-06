import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { UserState, becomeASeller } from "../../features/user/user-slice";
import { Orders } from "../../features/user/ordersStateSlice";
import { useDispatch } from 'react-redux';
import { apiCardSlice, useGetCardsByUserIdQuery } from '../../features/user/apiCardSlice';
import { Address, Card } from '../types';
import { CardModal } from '../BuyProduct/CardModal';
import { apiAddressSlice, useGetAddressByUserIdQuery } from '../../features/user/apiAddressSlice';



const AddressSite=()=> {
  var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));
  var dispatch = useDispatch();

  var {data:address,isSuccess}:{data:Address,isSuccess:boolean}  = useGetAddressByUserIdQuery({id:user.id});

  const [deleteAddress,{}]= apiAddressSlice.useDeleteAddressMutation();

  const handleDeleteAddress=()=>{
    deleteAddress({id:user.id});
  }


  return (<>
    <div className=''>
        <p>Your Address</p>
        <div className='border hover:bg-slate-200 select-none p-1 mt-1'>
          {address?.fullName} {address?.country}/{address?.city}
        </div>
        <div>
            {address != undefined ? <span className=" text-sm">Is this not your address anymore? <span onClick={()=>handleDeleteAddress()} className=" text-black font-medium hover:text-red-500 select-none cursor-pointer">delete</span></span>:""}
        </div>
    </div>
    </>
  )
}


export default AddressSite

