import { useAppSelector } from '../../app/hooks';
import { UserState } from "../../features/user/user-slice";
import { Orders } from "../../features/user/ordersStateSlice";
import { useGetOrdersByCompanyIdQuery, useGetOrdersByUserIdQuery } from '../../features/user/apiOrderSlice';
import { OrderForSeller, OrderedOrder } from '../types';
import { useGetCompanyByUserIdQuery } from '../../features/user/apiCompanySlice';
import { Company } from '../Admin/types';

const OrdersForSeller=()=> {
  var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));

  var {data:company}:{data:Company} = useGetCompanyByUserIdQuery({id:user.id});

  var {data,isSuccess}:{data:OrderForSeller[],isSuccess:boolean} = useGetOrdersByCompanyIdQuery({id:company?.id});

  return (
    <div className=''>
        <p className='font-medium'>Orders for Seller</p>
        <div className=''>
            {data?.length>0 ?
            <div className=''>
              {/* grid */}
              {data?.map((order: OrderForSeller, id: number) => {
                return <div className='border select-none p-1 mt-1' key={id}>
                    <span className='p-1'>
                        {id}
                    </span>
                    {order.fullName}
                    <div>
                        {order.products.map((orderedProduct)=>{
                        
                        return <>
                            <div className='my-2 bg-slate-100 hover:bg-slate-200 p-2 px-4'>
                            <p>Count: {orderedProduct.count}</p>
                            <p>Name: {orderedProduct.product.name}</p>
                            <p>Price: ${orderedProduct.product.price}</p>
                            <p>Discount: %{orderedProduct.product.discount}</p>
                            </div>
                        </>
                        })}
                    </div>

                    <div className='p-1'>
                        <button className=' bg-green-400 hover:bg-green-300 p-2 rounded-lg'>
                            Close an Order
                        </button>
                    </div>


                    </div> })}
            </div>
            :"you have 0 Orders"}
        </div>
    </div>
  )
}


export default OrdersForSeller



