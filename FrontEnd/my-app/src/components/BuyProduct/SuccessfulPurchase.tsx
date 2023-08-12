
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { UserState } from '../../features/user/user-slice';
import { Orders } from '../../features/user/ordersStateSlice';


const SuccessfulPurchase=()=>{
  const navigate = useNavigate();
  var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));
    
  return <>
    <div className="flex w-4/5 mx-auto bg-slate-50 mt-3">

        <div className=" justify-center w-full p-4 rounded-xl">

            <div className="flex content-center self-center text-center place-content-between">
                <span className="text-xl font-semibold leading-6 text-gray-900">Congratulations on your purchase!</span>
                {/* <button
                   type="button"
                   className="inline-flex items-center rounded-md   cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                   Create
                 </button> */}
            </div>
            

      <div className="mt-3 flex flex-col">
        <span className="text-sm font-semibold leading-6 text-gray-900">You will receive a letter to your email <span className=" font-bold">({user.email})</span>. You can also track your purchase in your profile.</span>
        <button onClick={()=>navigate("/products")} className=" mt-5 bg-yellow-300 rounded-xl p-1">
            Return to Main Menu
        </button>
      </div>
            
      </div>

    </div>
  </>
}
    
export default SuccessfulPurchase