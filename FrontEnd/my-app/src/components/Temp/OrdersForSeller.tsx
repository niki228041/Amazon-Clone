import { useAppSelector } from '../../app/hooks';
import { UserState } from "../../features/user/user-slice";
import { Orders } from "../../features/user/ordersStateSlice";
import { apiOrderSlice, useGetOrdersByCompanyIdWithPaginationQuery, useGetOrdersByUserIdQuery } from '../../features/user/apiOrderSlice';
import { OrderForSeller, OrderedOrder } from '../types';
import { useGetCompanyByUserIdQuery } from '../../features/user/apiCompanySlice';
import { Company } from '../Admin/types';

const OrdersForSeller=()=> {
  var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));

  var {data:company}:{data:Company} = useGetCompanyByUserIdQuery({id:user.id});
  var [closeAnOrderById,{}] = apiOrderSlice.useCloseAnOrderByIdMutation();


  var {data,isSuccess}:{data:OrderForSeller[],isSuccess:boolean} = useGetOrdersByCompanyIdWithPaginationQuery({id:company?.id});
  console.log(data);

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
                                <div className='mt-2'>
                                    {!orderedProduct.isBought  ?
                                    <button className=' bg-green-400 hover:bg-green-300 p-2 rounded-lg' onClick={()=>{closeAnOrderById({id:orderedProduct.id})}}>
                                        Close an Ordered Product
                                    </button>
                                    :
                                    <div className='text-green-500'>Product order is Already closed</div>
                                    }
                                </div>
                            </div>
                        </>
                        })}
                    </div>

                    


                    </div> })}
            </div>
            :"you have 0 Orders"}
        </div>
    </div>
  )
}


export default OrdersForSeller



