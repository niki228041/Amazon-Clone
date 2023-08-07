import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { ChangeOrderCount, FindById, Order } from "../types";
import { deleteOrder, updateOrder } from "../../features/user/ordersStateSlice";
import { useGetLinksForProductByProductsIdsQuery } from "../../features/user/apiProductSlice";

const OrdersList=()=>{
    const orders = useAppSelector((state)=>state.orders.orders);
    const dispatch = useDispatch();
    const availableCounts = [1, 2, 3, 4, 5];
    var request:FindById[] = [];
    orders.forEach(order => {
        request.push({id:order.product_id});
      });

    const { data: productsImages, isSuccess: isProductsImages } = useGetLinksForProductByProductsIdsQuery(request);
    console.log(productsImages);
    const handleCountChange=(id:string,count:any)=>{
        var index = orders.findIndex(ord=>ord.id == id);
        var changeOrderCount:ChangeOrderCount = {index:index,count:Number(count.value)}; 
        console.log(changeOrderCount);
        dispatch(updateOrder(changeOrderCount));
    }



 return(
    <li className="flex flex-col col-span-10" >
          {orders.map((order:Order) => (
          <div  key={order.id} >
            <li className="grid grid-cols-10 w-full gap-x-6 py-5  " >
              <div className=" col-span-1 h-20 w-full bg-contain bg-no-repeat rounded-xl hover:scale-[1.05] transition-all " style={{ backgroundImage:"url("+ (isProductsImages ? productsImages?.find((img:any)=>img.productId==order.product_id)?.image :"") +")", backgroundPosition:"center"}}/>
              <div className=" col-span-8 flex gap-x-4  w-full  ">
                <div className="min-w-0 flex-auto">
                  <p className="text-md leading-6 text-black">{order.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-900 font-medium mb-2">({order.count}) ${(order.price*order.count).toFixed(2)}</p>

                  <select
                    name='OptionsTitle'
                    id="OptionsTitle"
                    defaultValue={order.count}
                    className='bg-yellowForInputs text-[15px] mediumFont outline-none rounded-full h-6 px-2 bg-slate-100'
                    onChange={(e)=>handleCountChange(order.id,e.currentTarget)}
                  >
                    <option value=''>-</option>
                    {availableCounts.map((count) => (
                      <option  key={count} value={count}>{count}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className=" col-span-1 w-full">
                <button
                 type="button"
                 onClick={()=>{dispatch(deleteOrder(order.id))}}
                 className="mt-2 mr-1 inline-flex items-center rounded-md  cursor-pointer  bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                 Delete
                  </button>
                  {/* <button
                 type="button"
                 className="mt-2 mr-1 inline-flex items-center rounded-md  cursor-pointer  bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                 Edit
                  </button> */}

              </div>
            </li>
          </div>
          ))}
          </li>


 )
}

export default OrdersList;

