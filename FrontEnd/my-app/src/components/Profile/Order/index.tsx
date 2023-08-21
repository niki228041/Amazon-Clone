import React, { useRef, useState } from 'react';

// import { RiDeleteBin6Line } from "react-icons/ri";
// import { apiOrderSlice, useGetOrdersByUserIdQuery } from '../../../features/user/apiOrderSlice';
// import { useAppSelector } from '../../../app/hooks';
// import { UserState } from '../../../features/user/user-slice';
// import { Orders } from '../../../features/user/ordersStateSlice';
// import { Order, OrderedOrder } from '../../types';

// const ProfOrders: React.FC = () => {

  

//   return (
    


//   );
// };
// export default ProfOrders;


import { useAppSelector } from '../../../app/hooks';
import { UserState } from "../../../features/user/user-slice";
import { Orders } from "../../../features/user/ordersStateSlice";
import { useGetOrdersByUserIdQuery } from '../../../features/user/apiOrderSlice';
import { OrderedOrder } from './../../types';


export const OrderComponent: React.FC = () => {
  

  return <>

      <div className="rounded-lg p-3 grid grid-cols-10 mt-2">
          <div className="flex col-span-8">

              <div className="m-2">
                  {/* <div className="h-24 w-24 border rounded-md bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url(" + productsImages?.find((img: any) => img.productId == order.product_id)?.image + ")", backgroundPosition: "center" }} /> */}
              </div>

              <div className="text-sm mt-1 ml-3 text-[16px]">
                  {/* <p className="font-medium">{order.name}</p>
                  <p className="text-grayForText mt-2" >{order.name}</p> */}

                  <div className="flex mt-9 font-medium text-sm" >
                      {/* <button onClick={() => { dispatch(deleteWishitem(order.id)) }} className=" select-none active:bg-red-400 hover:bg-red-500 hover:text-white rounded-lg px-2 py-1 border border-grayColorForBorder text-red-500">Видалити</button> */}
                      
                  </div>
              </div>
          </div>

          
      </div>
      <hr className="mt-4 mx-6"></hr>

  </>
}

const ProfOrders=()=> {
  var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));
  var {data,isSuccess}:{data:OrderedOrder[],isSuccess:boolean} = useGetOrdersByUserIdQuery({id:user.id});
  console.log(user);

  return (
    <div className=''>
        <p className='font-medium'>My Orders</p>
        <div className=''>
            {data?.length>0 ?
            <div className=''>
              {/* grid */}
              {data?.map((order: OrderedOrder, id: number) => {
                return <div className='border hover:bg-slate-200 select-none p-1 mt-1' key={id}>
                    <span className='p-1'>
                        {id}
                    </span>
                    {order.fullName}</div> })}
            </div>
            :"you have 0 Orders"}
        </div>
    </div>
  )
}


export default ProfOrders


