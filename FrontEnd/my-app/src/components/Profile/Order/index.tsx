import React, { useRef, useState } from 'react';
import SideBar from '.././SideBarProf';
import { RiDeleteBin6Line } from "react-icons/ri";
import { apiOrderSlice, useGetOrdersByUserIdQuery } from '../../../features/user/apiOrderSlice';
import { useAppSelector } from '../../../app/hooks';
import { UserState } from '../../../features/user/user-slice';
import { Orders } from '../../../features/user/ordersStateSlice';
import { Order, OrderedOrder } from '../../types';

const ProfOrders: React.FC = () => {

  var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));
  
  // const {data:orders,isSuccess:isOrderSuccess} = useGetOrdersByUserIdQuery({id:user.id}) as {
  //   data: Order[];
  //   isSuccess: boolean;
  // };
  const { data:orders, isSuccess:isOrderSuccess }: { data:OrderedOrder[] , isSuccess: boolean } = useGetOrdersByUserIdQuery({id:user.id});


  // const [orders, setOrders] = useState<Order[]>(initialOrders);

  // const handleToggleDelivered = (id: number) => {
  //   setOrders((prevOrders) =>
  //     prevOrders.map((order) =>
  //       order.id === id ? { ...order, isDelivered: !order.isDelivered } : order
  //     )
  //   );
  // };

  return (
    <div className="flex bg-slate-100" >

      <SideBar></SideBar>
      <div className="">
        <div className="ordersheader" >
          <div className="divorderlist">
            <a className="ordersa">ALL</a>
            <a className="ordersa">Unpaid</a>
            <a className="ordersa">Processing</a>
            <a className="ordersa">ShiPped</a>
            <a className="ordersa">Completed</a>
            <div className="deleted">
              <RiDeleteBin6Line className="deleteico"></RiDeleteBin6Line>
              <a className="dela">Deleted Orders</a>
            </div>


          </div>
          <div className="ordersearcher">
            <div className="overselec">
              <select id="countries" className="orderselect bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 ">
                <option selected>Order</option>
                <option value="US">Track</option>

              </select>

            </div>
          </div>





        </div>
        <div>
          
        </div>
        <div className="orderbody p-5 overflow-y-auto grid gap-2">

          {orders?.map((order:OrderedOrder) => {
            const dateTime = new Date(order.dateCreated);
            const dateOnly = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

            return <div key={order.id} className='flex-nowrap flex py-3 px-2 bg-orange-300 hover:bg-orange-200 select-none rounded-md'>
              <div className="ordertabletd">{order.id}</div>
              <div className="ordertabletd">{order.fullName}</div>

              <div className="ordertabletd">{dateOnly.toLocaleDateString()}</div>
              
            </div>
            })}



        </div>
      </div>
    </div>


  );
};
export default ProfOrders;


