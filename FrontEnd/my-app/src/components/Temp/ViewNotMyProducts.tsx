
import { useAppSelector } from '../../app/hooks';
import { UserState } from "../../features/user/user-slice";
import { Orders } from "../../features/user/ordersStateSlice";
import { useGetOrdersByUserIdQuery } from '../../features/user/apiOrderSlice';
import { OrderedOrder } from '../types';

const ViewMyOrders=()=> {
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


export default ViewMyOrders



