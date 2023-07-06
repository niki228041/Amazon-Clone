import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { deleteOrder } from "../features/user/ordersStateSlice";
import { apiProductSlice, useGetLinksForProductByProductsIdsQuery } from "../features/user/apiProductSlice";

interface FindById{
  id:number
}

const Orders=()=>{
    const dispatch = useDispatch();
    const orders = useAppSelector((state)=>state.orders.orders);
    var request:FindById[] = [];
    orders.forEach(order => {
      request.push({id:order.product_id});
    });

    const { data: productsImages, isSuccess: isProductsImages } = useGetLinksForProductByProductsIdsQuery(request);
    
    return <>
        <div className="flex">
        

        <div className=" justify-center w-full p-4 rounded-xl">

            <div className="flex content-center self-center text-center place-content-between">
                <span className="text-xl font-semibold leading-6 text-gray-900">Orders</span>
                <button
                   type="button"
                   className="inline-flex items-center rounded-md   cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                   Create
                 </button>
            </div>
            

            {
      orders.map((product:any) => (
        <li key={product.id} className="grid grid-cols-10 w-full gap-x-6 py-5 " >
          <div className=" col-span-1 h-20 w-full bg-contain bg-no-repeat rounded-xl hover:scale-[1.05] transition-all " style={{ backgroundImage:"url("+ (isProductsImages ? productsImages?.find((img:any)=>img.productId==product.product_id)?.image :"") +")", backgroundPosition:"center"}}/>
          <div className=" col-span-8 flex gap-x-4  w-full  ">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{product.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{product.name}</p>
            </div>
          </div>

          <div className=" col-span-1 w-full">
            <button
             type="button"
             onClick={()=>{dispatch(deleteOrder(product.id))}}
             className="mt-2 mr-1 inline-flex items-center rounded-md  cursor-pointer  bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
             Delete
              </button>
              <button
             type="button"
             className="mt-2 mr-1 inline-flex items-center rounded-md  cursor-pointer  bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
             Edit
              </button>

          </div>
    </li>
  ))}
            
        </div>

    </div>
    </>
}
    
export default Orders