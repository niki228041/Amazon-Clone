import React, { useRef, useState, useEffect } from 'react';
import { VariantDTO } from '../../Admin/types';



// import ReactQuill from "react-quill";
// import 'react-quill/dist/quill.snow.css';

import { useNavigate } from "react-router-dom";


import { apiCardSlice } from "../../../features/user/apiCardSlice";
import "./index.css"
import { CardModal } from '../../BuyProduct/CardModal';



import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks';
import { UserState, becomeASeller } from "../../../features/user/user-slice";
import { Orders } from "../../../features/user/ordersStateSlice";
import { useDispatch } from 'react-redux';
import { useGetCardsByUserIdQuery } from '../../../features/user/apiCardSlice';
import { Card } from '../../types';

import classNames from 'classnames';


interface SetDefaultCard {
  userId: number,
  cardId: number,
}

export const Payment = () => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const toggleCardModal = (prop: boolean) => { setCardModalOpen(prop) };
  var user = useAppSelector(((state: { user: UserState; orders: Orders }) => state.user.user));
  var dispatch = useDispatch();

  var { data, isSuccess }: { data: Card[], isSuccess: boolean } = useGetCardsByUserIdQuery({ id: user.id });
  var [setDefaultCard, { }] = apiCardSlice.useSetDefaultCardMutation();


  const handleBecomeASeller = () => {
    if (!user?.roles?.includes("seller")) {
      dispatch(becomeASeller({ id: user.id }));
    }
  }

  useEffect(() => { }, [data]);

  console.log(data);

  const handleSetDefaultCard = (id: number) => {
    var request: SetDefaultCard = { userId: Number(user.id), cardId: id };
    setDefaultCard(request);
  }

  return (
    <>
      <CardModal isOpen={isCardModalOpen} onClose={toggleCardModal} />
      <div style={{display:"flex"}} >

        <a style={{ fontSize: "40px", fontWeight: "600", marginTop: "80px", marginLeft: "80px", color: "#6B6A6E" }}>Основні платіжні карти</a>
        <div className=''>
          
          {/* <span className=" text-sm">Click at the card to choose a Defauld Card </span> */}
          {data?.map((card: Card, id: number) => {

            return <div style={{ borderWidth: "2px", borderRadius: "20px", height: "250px", width: "1150px", marginLeft: "300px", marginTop: "90px", display: "inline-flex" }}
              className={classNames(
                'border select-none p-1 mt-1',
                {
                  'bg-slate-500': card.isDefault,
                  'hover:bg-slate-200': !card.isDefault
                }
              )}
              key={id}
              onClick={() => { handleSetDefaultCard(Number(card.id)) }}
            >
              <span className='px-4'>
                {id}
              </span>
              {card.ownerName}/{card.cardNumber}


              <button className="deletebtn">
                Видалити
              </button>


            </div>
          })}
        </div>



        <svg style={{marginTop:"700px",marginLeft:"400px"}} onClick={() => setCardModalOpen(true)} width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="48" cy="48" r="47.5" fill="#FF9C00" stroke="#FF9A02" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M51.2432 44.1081V24H44.1081V44.1081H24V51.2432H44.1081V72H51.2432V51.2432H72V44.1081H51.2432Z" fill="white" />
        </svg>


      </div>

    </>

  );
};
export default Payment;

