import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { deleteOrder } from "../features/user/ordersStateSlice";

const Orders=()=>{
    const dispatch = useDispatch();
    const orders = useAppSelector((state)=>state.orders.orders);
    
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
      orders.map((category:any) => (
        <li key={category.id} className="flex justify-between gap-x-6 py-5" >
      <div className="flex gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{category.name}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{category.name}</p>
        </div>
      </div>

      <div className="">
        <button
         type="button"
         onClick={()=>{dispatch(deleteOrder(category.id))}}
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