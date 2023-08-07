import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { UserState, becomeASeller } from "../../features/user/user-slice";
import { Orders } from "../../features/user/ordersStateSlice";
import { useDispatch } from 'react-redux';
import { apiCardSlice, useGetCardsByUserIdQuery } from '../../features/user/apiCardSlice';
import { Card } from '../types';
import { CardModal } from '../BuyProduct/CardModal';



const CardsSite=()=> {
  var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));
  var dispatch = useDispatch();

  var {data,isSuccess}:{data:Card[],isSuccess:boolean}  = useGetCardsByUserIdQuery({id:user.id});
  var [addCard,{}] = apiCardSlice.useAddCardMutation();

  const handleBecomeASeller=()=>{
    if(!user?.roles?.includes("seller"))
    {
      dispatch(becomeASeller({id:user.id}));
    }
  }




  return (<>
    <div className=''>
        <p>Your cards</p>
        {data?.map((card: Card, id: number) => {
          return <div className='border hover:bg-slate-200 select-none p-1 mt-1' key={id}>
          <span className='p-1'>
              {id}
          </span>
          {card.cardNumber}</div> })}
    </div>
    </>
  )
}


export default CardsSite

