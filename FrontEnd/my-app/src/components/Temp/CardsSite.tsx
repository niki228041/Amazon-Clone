import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { UserState, becomeASeller } from "../../features/user/user-slice";
import { Orders } from "../../features/user/ordersStateSlice";
import { useDispatch } from 'react-redux';
import { apiCardSlice, useGetCardsByUserIdQuery } from '../../features/user/apiCardSlice';
import { Card } from '../types';
import { CardModal } from '../BuyProduct/CardModal';
import classNames from 'classnames';


export interface SetDefaultCard {
  userId:number,
  cardId:number,
}

const CardsSite=()=> {
  var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));
  var dispatch = useDispatch();

  var {data,isSuccess}:{data:Card[],isSuccess:boolean}  = useGetCardsByUserIdQuery({id:user.id});
  var [setDefaultCard,{}] = apiCardSlice.useSetDefaultCardMutation();
  

  const handleBecomeASeller=()=>{
    if(!user?.roles?.includes("seller"))
    {
      dispatch(becomeASeller({id:user.id}));
    }
  }

  useEffect(()=>{},[data]);

  console.log(data);

  const handleSetDefaultCard=(id:number)=>{
    var request:SetDefaultCard = {userId:Number(user.id),cardId:id};
    setDefaultCard(request);
  }


  return (<>
    <div className=''>
        <p>Your cards</p>
        <span className=" text-sm">Click at the card to choose a Defauld Card </span>
        {data?.map((card: Card, id: number) => {

          return <div
          className={classNames(
            'border select-none p-1 mt-1',
            { 'bg-slate-500': card.isDefault,
              'hover:bg-slate-200':!card.isDefault }
          )}
          key={id}
          onClick={()=>{handleSetDefaultCard(Number(card.id))}}
        >
          <span className='px-4'>
              {id}
          </span>
          {card.ownerName}/{card.cardNumber}
          

          </div> })}
    </div>
    </>
  )
}


export default CardsSite

